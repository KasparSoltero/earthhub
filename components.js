import { Earthhub_Base, Value } from './definition_classes.js'

class Example extends HTMLElement{
    constructor () {

		// Always call super first in constructor
		super();
        //In general, the constructor should be used to: 
        //  set up initial state and 
        //  default values, and to 
        //  set up event listeners and  
        //  possibly a shadow root.
	}
	/**
	 * Runs each time the element is appended to or moved in the DOM
	 */
	connectedCallback () {
		console.log('connected!', this);

		// Render HTML, event handlers etc
        this.innerHTML ='';
	}
	/**
	 * Runs when the element is removed from the DOM
	 */
	disconnectedCallback () {
		console.log('disconnected', this);
	}
}

class ReferenceObject extends HTMLElement{
    constructor () {
		super();
        this.media_ref_switch = false;
	}
    loadMedia() {
        let media = this.getAttribute('media')
        this.innerHTML="<img src="+media+" alt='missing media'>"
    }
    loadRef() {
        let ref = 'temp'
        this.innerHTML=ref
    }
	connectedCallback () {
        // path="lib/images/otakaro-bordseye.png"
        // this.innerHTML = '<reference_object></reference_object>'
        // console.log(this)
        if(this.className=='image') {
            this.loadMedia()
        }
        this.onclick=(()=>{
            this.media_ref_switch ? this.loadMedia() : this.loadRef()
            this.media_ref_switch = !this.media_ref_switch
        })
	}
	disconnectedCallback () {
	}
}

class BASIC_DISPLAY extends HTMLElement{
    constructor () {
        super();
    }
    render() {
        this.innerHTML = this.getAttribute('name');
    }
    connectedCallback () {
		console.log('connected!', this);
		// Render HTML, event handlers etc
        this.render();
	}
}

class PERSON_DISPLAY extends HTMLElement{
    constructor() {
        super();
        this.refers_to = null;
    }

    findPersonClass() {
        const name = this.getAttribute('name');

        const nameParts = name.split('.');
        const className = nameParts.shift();

        // Get the class from the window object
        const targetClass = window[className];
        if (targetClass) {
            // Create an instance of the class
            const instance = new targetClass();

            let propertyValue = instance;
            for (const propertyName of nameParts) {
                // Find the property within the instance
                propertyValue = propertyValue[propertyName];
                if (!propertyValue) {
                    throw new Error(`Property "${propertyName}" not found in class "${className}"`);
                }
            }
            // Assign the final property value to 'refers_to'
            this.refers_to = propertyValue;
        } else {
            throw new Error(`Class "${className}" not found`);
        }
    }

    render() {
        this.innerHTML = this.refers_to.constructor.name;
    }

    connectedCallback () {
        // Access the 'name' attribute, set the 'person' class which the html element draws from.
        this.findPersonClass()
		// Render HTML, event handlers etc
        this.render();
	}
}
class REFERENCE_DISPLAY extends PERSON_DISPLAY{
    constructor() {
        super();
    }

    render() {
        let reference_count = this.getAttribute('index')
        const reference_for = this.refers_to;
        const reference = reference_for.references[reference_count]

        const name = reference.key;
        const year = reference.date.substring(0, 4);
        const urlyear = reference.urldate.substring(0, 4);
        const url = reference.url;
    
        const link = document.createElement('a');
        link.href = url;
        link.textContent = `${parseInt(reference_count)+1} - ${name} (${year? year: urlyear})`;
    
        this.innerHTML = '';
        this.appendChild(link);
    }
}
class SHOW_ALL_DROPDOWN extends PERSON_DISPLAY {
    constructor() {
      super();
    }
    render() {
        if (this.refers_to instanceof Value) {
            const valueDisplayElement = document.createElement('value-display');
            valueDisplayElement.setAttribute('value', this.refers_to.value);
            valueDisplayElement.setAttribute('unit', this.refers_to.unit);
            valueDisplayElement.setAttribute('references', this.refers_to.references);
            this.appendChild(valueDisplayElement);
            return; // Exit early since value-display is created
        }
        this.innerHTML = `
            <select id="attribute-dropdown">
                <option value="__placeholder">${this.refers_to.constructor.name}</option>
                ${this.generateDropdownOptions()}
            </select>
            <div id="attribute-content"></div>
        `;
    
        const dropdown = this.querySelector('#attribute-dropdown');
        const attributeContent = this.querySelector('#attribute-content');

        // Store the original text of each option as a data attribute, may change
        Array.from(dropdown.options).forEach(option => {
            option.dataset.originalText = option.textContent;
        });
    
        dropdown.addEventListener('change', () => {
            console.log('change to dropdown')
            const selectedAttribute = dropdown.value;
            if (selectedAttribute !== '__placeholder') {
                const attributeValue = this.refers_to[selectedAttribute];

                // Remove previously attached parts
                while (attributeContent.firstChild) {
                    attributeContent.firstChild.remove();
                }
      
                // attach parts 
                if (Array.isArray(attributeValue)) {
                    const arrayDisplayElement = document.createElement('array-display');
                    arrayDisplayElement.setAttribute('name', `${this.getAttribute('name')}.${selectedAttribute}`);
                    attributeContent.appendChild(arrayDisplayElement);
                }
                else if (typeof attributeValue === 'object' && attributeValue !== null) {
                    const showAllElement = document.createElement('show-all-dropdown');
                    showAllElement.setAttribute('name', `${this.getAttribute('name')}.${selectedAttribute}`);
                    attributeContent.appendChild(showAllElement);
                }
                else if ((typeof attributeValue === 'string' || typeof attributeValue === 'number') && attributeValue !== null) {
                    const basicDisplayElement = document.createElement('basic-display');
                    basicDisplayElement.setAttribute('name', attributeValue);
                    attributeContent.appendChild(basicDisplayElement);
                    console.log(basicDisplayElement);
                }
        
                // Restore the original text of all options
                Array.from(dropdown.options).forEach(option => {
                    option.textContent = option.dataset.originalText;
                });
                // Update the displayed text of the selected option to the head class for display, may change
                const selectedOption = dropdown.options[dropdown.selectedIndex];
                selectedOption.textContent = this.refers_to.constructor.name;
            }
        });
    }
    
    generateDropdownOptions() {
        const attributeList = Object.keys(this.refers_to);
        const currentAttribute = this.getAttribute('name').split('.').pop(); // Get the current attribute name
        return attributeList
        .map((attribute) => {
            const selected = attribute === currentAttribute ? 'selected' : '';
            return `<option value="${attribute}" ${selected}>${attribute}</option>`;
        })
        .join('');
    }
}
class SHOW_ALL extends PERSON_DISPLAY {
    constructor() {
      super();
    }
    render() {
        if (this.refers_to instanceof Value) {
            const valueDisplayElement = document.createElement('value-display');
            valueDisplayElement.setAttribute('value', this.refers_to.value);
            valueDisplayElement.setAttribute('unit', this.refers_to.unit);
            valueDisplayElement.setAttribute('references', this.refers_to.references);
            valueDisplayElement.setAttribute('captions', this.refers_to.captions);
            this.appendChild(valueDisplayElement);
            return; // Exit early since value-display is created
        }

        this.innerHTML = `<div id="attribute-content"></div>`;

        const attributeContent = this.querySelector('#attribute-content');
        const attributeList = Object.keys(this.refers_to);

        attributeList.forEach((attribute) => {
            const attributeValue = this.refers_to[attribute];
            const attributeElement = document.createElement('div');

            attributeElement.innerHTML = `<span class="attribute-name">${attribute}</span>: `;

            if (Array.isArray(attributeValue)) {
                const arrayDisplayElement = document.createElement('array-display');
                arrayDisplayElement.setAttribute('name', `${this.getAttribute('name')}.${attribute}`);
                attributeElement.appendChild(arrayDisplayElement);
            }
            else if (typeof attributeValue === 'object' && attributeValue !== null) {
                const showAllElement = document.createElement('show-all');
                showAllElement.setAttribute('name', `${this.getAttribute('name')}.${attribute}`);
                attributeElement.appendChild(showAllElement);
            }
            else if ((typeof attributeValue === 'string' || typeof attributeValue === 'number') && attributeValue !== null) {
                const basicDisplayElement = document.createElement('basic-display');
                basicDisplayElement.setAttribute('name', attributeValue);
                attributeElement.appendChild(basicDisplayElement);
            }

            attributeContent.appendChild(attributeElement);
        });
    }
}
class ARRAY_DISPLAY extends PERSON_DISPLAY {
    constructor() {
        super();
    }
    render() {
        this.innerHTML = `
            <div id="array-content">
                ${this.generateShowAllElements()}
            </div>
        `;
    }

    generateShowAllElements() {
        const container = document.createElement('div'); // Create a container element

        const array = this.refers_to;
        for (let i = 0; i < array.length; i++) {
            const showAllElement = document.createElement('show-all');
            const attributeName = `${this.getAttribute('name')}.${i}`; // Update the name attribute
            showAllElement.setAttribute('name', attributeName);
            
            container.appendChild(showAllElement); // Append the show-all elements to the container
        }

        return container.innerHTML; // Return the HTML content of the container
    }
}

class VALUE_DISPLAY extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
        this.render()
    }
  
    render() {
        const value = this.getAttribute('value');
        const unit = this.getAttribute('unit');
        const reference = this.getAttribute('references');
        const captions = this.getAttribute('captions');
        
        let output = `${value} (${unit}) ${captions}`;
        
        // if (reference.length>=1) {
        //     console.log('adding references')
        //     const arrayDisplayElement = document.createElement('reference-display');
        //     arrayDisplayElement.setAttribute('name', `${this.getAttribute('name')}.references}`);
        //     this.appendChild(arrayDisplayElement);
        //     console.log(arrayDisplayElement)
          
        //     // output += ` [${reference}]`;
        // }
        
        this.innerHTML = output;
      }
}

class ECOSYSTEM_DISPLAY extends PERSON_DISPLAY {
    constructor() {
        super();
        this.filter = {
            // year: [2014],
            // order: ['polypodiales'],
        };
        this.locations = false;
        this.map_bounds = {
            lat: [43.348663,43.725275], // replace with actual bounds
            lng: [172.426615, 172.825476] // replace with actual bounds
        };
        this.display_settings = {
            minimum_observations: 1,
            maximum_observations: 100,
            minimum_opacity: 0.5,
            maximum_opacity: 1,
            colour: '#94C23D'
        }
    }

    async drawData() {
        if (!this.refers_to || !this.refers_to.fetchObservations) {
            throw new Error('fetchObservations function not found in the associated class');
        }
        if (!this.refers_to.images[0]) {
            throw new Error('No background image in the associated ecosystem class');
        }
    
        try {
            const mapBounds = this.map_bounds;
    
            const mapContainer = this.querySelector('#mapContainer');
            const mapSize = {
                width: mapContainer.offsetWidth,
                height: mapContainer.offsetWidth
            };
    
            const gridSize = 100; // Define the size of the grid
    
            const latScale = d3.scaleQuantize() // Use scaleQuantize to divide the domain into discrete bins
                .domain(mapBounds.lat)
                .range(d3.range(gridSize));

            const lngScale = d3.scaleQuantize()
                .domain(mapBounds.lng)
                .range(d3.range(gridSize));
    
            const { occurrences, records } = await this.refers_to.fetchObservations(this.filter, this.locations);
    
            mapContainer.innerHTML = ''; // Clear the mapContainer element
            const svg = d3.select(mapContainer).append('svg')
                .attr('width', 'calc('+mapSize.width+'px - 10px)')
                .attr('height', 'calc('+mapSize.width+'px - 10px)')
    
            // Draw the background image
            svg.append('image')
            .attr('xlink:href', window.location.origin+'/lib/images/' + this.refers_to.images[0])
            .attr('width', 'calc('+mapSize.width+'px - 10px)')
            .attr('height', 'calc('+mapSize.width+'px - 10px)');

            // Create a 2D array to store the count of observations in each grid square
            let gridData = Array(gridSize).fill().map(() => Array(gridSize).fill(0));
    
            records.forEach(record => {
                if (record.decimalLatitude && record.decimalLongitude) {
                    const x = Math.floor(lngScale(record.decimalLongitude));
                    const y = Math.floor(latScale(-record.decimalLatitude));
                    gridData[y][x]++; // Increment the count for the grid square
                }
            });

            // Find the maximum number of observations in the grid squares
            let maxGridObservations = 0;
            for (let i = 0; i < gridSize; i++) {
                for (let j = 0; j < gridSize; j++) {
                    if (gridData[i][j] > maxGridObservations) {
                        maxGridObservations = gridData[i][j];
                    }
                }
            }

            // Check if the maximum number of observations in the grid squares is less than the maximum observations display setting
            if (maxGridObservations < this.display_settings.maximum_observations) {
                this.display_settings.maximum_observations = maxGridObservations;
            }
    
            // Retrieve display settings from the class
            const {
                minimum_observations,
                maximum_observations,
                minimum_opacity,
                maximum_opacity,
                colour
            } = this.display_settings;

            // Draw the grid squares
            for (let i = 0; i < gridSize; i++) {
                for (let j = 0; j < gridSize; j++) {
                    // Normalize the observation count to the range [0, 1]
                    let normalizedCount = (gridData[i][j] - minimum_observations) / (maximum_observations - minimum_observations);
                    // Scale the normalized count to the opacity range [minimum_opacity, maximum_opacity]
                    let opacity = normalizedCount * (maximum_opacity - minimum_opacity) + minimum_opacity;
                    // Clamp the opacity to the range [minimum_opacity, maximum_opacity]
                    opacity = Math.max(minimum_opacity, Math.min(maximum_opacity, opacity));
                    // Remove empty data points
                    if (!(gridData[i][j] > 0)) {
                        opacity = 0;
                    }

                    svg.append('rect')
                        .attr('x', j * mapSize.width / gridSize)
                        .attr('y', i * mapSize.height / gridSize)
                        .attr('width', mapSize.width / gridSize)
                        .attr('height', mapSize.height / gridSize)
                        .attr('fill', colour) // Use the provided colour
                        .attr('opacity', opacity); // Set the opacity based on the count of observations
                }
            }
        } catch (error) {
            console.error('Error loading data:', error);
            throw error;
        }   
    }
    

    render() {

        let name = this.getAttribute('name');
        let reference = this.refers_to.captions[0]

        this.innerHTML = `
                <h1>Ōtautahi's ecosystem (${name})</h1>
                <div id="dropdownContainer">
                    <button id="filterButton">
                        <i class="fas fa-filter"></i> Filter
                    </button>
                    <div id="dropdownMenu" class="dropdown-content">
                        <div class="filterItem">
                            <label for="kingdom">Kingdom:</label>
                            <input type="text" id="kingdom">
                        </div>
                        <div class="filterItem">
                            <label for="phylum">Phylum:</label>
                            <input type="text" id="phylum">
                        </div>
                        <div class="filterItem">
                            <label for="class">Class:</label>
                            <input type="text" id="class">
                        </div>
                        <div class="filterItem">
                            <label for="order">Order:</label>
                            <input type="text" id="order">
                        </div>
                        <div class="filterItem">
                            <label for="family">Family:</label>
                            <input type="text" id="family">
                        </div>
                        <div class="filterItem">
                            <label for="genus">Genus:</label>
                            <input type="text" id="genus">
                        </div>
                        <div class="filterItem">
                            <label for="species">Species:</label>
                            <input type="text" id="species">
                        </div>
                        <div class="filterItem">
                            <label for="year">Year:</label>
                            <input type="text" id="year">
                        </div>
                        <div class="filterItem">
                            <label for="month">Month:</label>
                            <input type="text" id="month">
                        </div>
                    </div>
                </div>
                <button id="fetchButton">Reload Data</button>
                <div id="mapContainer"><svg></svg></div>
                <p>Source: ${reference}</p>
        `;

        // Event listener to handle click on filter button
        const filterButton = this.querySelector('#filterButton');
        filterButton.addEventListener('click', () => {
            document.getElementById("dropdownMenu").classList.toggle("show");
        });
    
        // Event listener to handle click outside of the dropdown
        window.onclick = function(event) {
            if (!event.target.matches('#filterButton') && !event.target.matches('#dropdownMenu') && !event.target.matches('#dropdownMenu *')) {
                let dropdowns = document.getElementsByClassName("dropdown-content");
                for (let i = 0; i < dropdowns.length; i++) {
                    let openDropdown = dropdowns[i];
                    if (openDropdown.classList.contains('show')) {
                        openDropdown.classList.remove('show');
                    }
                }
            }
        }
    
        const speciesInput = document.querySelector('#species');
        const yearInput = document.querySelector('#year');
        const kingdomInput = document.querySelector('#kingdom');
        const phylumInput = document.querySelector('#phylum');
        const classInput = document.querySelector('#class');
        const orderInput = document.querySelector('#order');
        const familyInput = document.querySelector('#family');
        const genusInput = document.querySelector('#genus');
        const monthInput = document.querySelector('#month');
        const fetchButton = document.querySelector('#fetchButton');
        const mapContainer = document.querySelector('#mapContainer');

        // Add CSS styling to the mapContainer element
        mapContainer.style.width = 'calc(100% - 10px)'; // Set width to 100% of the parent element, accounting for the border
        mapContainer.style.paddingBottom = '-10px'; // Set the paddingBottom to 0 to avoid extra height
        mapContainer.style.position = 'relative';
        mapContainer.style.border = '5px solid #000'; // Add a border for visual clarity

        fetchButton.addEventListener('click', async () => {
            this.filter = {
                species: speciesInput.value || undefined,
                year: yearInput.value || undefined,
                kingdom: kingdomInput.value || undefined,
                phylum: phylumInput.value || undefined,
                class: classInput.value || undefined,
                order: orderInput.value || undefined,
                family: familyInput.value || undefined,
                genus: genusInput.value || undefined,
                month: monthInput.value || undefined
            };

            await this.drawData();
        });

        // Call drawData() function once at the beginning
        (async () => {
            try {
                await this.drawData();
            } catch (error) {
                console.error('Error loading data:', error);
            }
        })();
    }
}

class ORGANISATION_DISPLAY extends PERSON_DISPLAY {
    constructor() {
        super();
    }
    render() {
        let orgName = this.getAttribute('name');
        let missionStatement = this.refers_to.captions[0]; // mission statement from captions[0]

        this.innerHTML = `
            <div class="organization-display">
                <h1>${orgName}</h1>
                <p>${missionStatement}</p>
            </div>
        `;
    }
}

class STORY_DISPLAY extends PERSON_DISPLAY {
    constructor() {
        super();
    }
    render() {
        let storyTitle = this.getAttribute('name');
        let storyText = this.refers_to.captions[0] ? this.refers_to.captions[0] : ''; // story text from captions[0]
        let storyImages = this.refers_to.images; // array of image objects
        let references = this.refers_to.references; // array of reference objects

        this.innerHTML = `
            <div class="story-display">
                <h1>${storyTitle}</h1>
                <div class="story-images">
                    ${storyImages.map(image => `
                        <img src="${window.location.origin+'/lib/images/' + image}" alt="${'image missing'}">
                    `).join('')}
                </div>
                <p>${storyText}</p>
                ${references.map((reference,index) => `
                    <reference-display name="${storyTitle}" index="${index}"></reference-display>
                `).join('')}
            </div>
        `;
    }
}

class EarthhubBorder extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
        this.innerHTML = `
        <div class='border-left'></div>
        <div class='border-right'></div>
        `
        this.updateBorderHeight();
    
        window.addEventListener('scroll', this.updateBorderHeight.bind(this));
    }
  
    updateBorderHeight() {
      const windowHeight = window.innerHeight;
      const documentHeight = Math.max(
        document.body.scrollHeight, 
        document.documentElement.scrollHeight
      );
  
      this.style.height = documentHeight > windowHeight ? `${documentHeight}px` : '100vh';
    }
}

// Define web components for html
if ('customElements' in window) {
	customElements.define('example-example', Example)
    customElements.define('reference-object',ReferenceObject)
    customElements.define('person-display',PERSON_DISPLAY)
    customElements.define('show-all',SHOW_ALL)
    customElements.define('basic-display',BASIC_DISPLAY)
    customElements.define('array-display',ARRAY_DISPLAY)
    customElements.define('value-display', VALUE_DISPLAY)
    customElements.define('reference-display',REFERENCE_DISPLAY)
    customElements.define('show-all-dropdown',SHOW_ALL_DROPDOWN)
    customElements.define('ecosystem-display',ECOSYSTEM_DISPLAY)
    customElements.define('earthhub-border',EarthhubBorder)
    customElements.define('organisation-display',ORGANISATION_DISPLAY)
    customElements.define('story-display',STORY_DISPLAY)
}
