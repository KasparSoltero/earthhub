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

class REFERENCE_DISPLAY extends HTMLElement{
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
      }
    
    render() {
        this.innerHTML = 'testing'
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

        console.log(this.refers_to); // Output: associated instance for testing
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

// Define web components for html
if ('customElements' in window) {
	customElements.define('example-example', Example);
    customElements.define('reference-object',ReferenceObject);
    customElements.define('person-display',PERSON_DISPLAY);
    customElements.define('show-all',SHOW_ALL);
    customElements.define('basic-display',BASIC_DISPLAY);
    customElements.define('array-display',ARRAY_DISPLAY);
    customElements.define('value-display', VALUE_DISPLAY);
    customElements.define('reference-display',REFERENCE_DISPLAY);
    customElements.define('show-all-dropdown',SHOW_ALL_DROPDOWN);
}
