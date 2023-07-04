
export class Earthhub_Base {
    constructor() {
        this.captions = [];
        this.references = [];
        this.images = [];
    }
    // Earthhub_Base class methods
    setCaption(captions) {
        if (!Array.isArray(captions)) {
            captions = [captions]
        }
        this.captions = captions
        return this
    }
}

export class Reference extends Earthhub_Base {
    constructor({ key, title, url, author, urldate, file, date, note, volume, issn, doi, pages, number, journaltitle, shortjournal, pmid, keywords }) {
        super();
        this.key = key || '';
        this.title = title || '';
        this.url = url || '';
        this.author = author || '';
        this.urldate = urldate || '';
        this.file = file || '';
        this.date = date || '';
        this.note = note || '';
        this.volume = volume || '';
        this.issn = issn || '';
        this.doi = doi || '';
        this.pages = pages || '';
        this.number = number || '';
        this.journaltitle = journaltitle || '';
        this.shortjournal = shortjournal || '';
        this.author = author || '';
        this.pmid = pmid || '';
        this.keywords = keywords || '';
    }
    // Reference class methods
    render() {

    }
}

export class Contributions extends Earthhub_Base {
    constructor() {
        super();
        this.contributors = [];
        this.relevances = [];
    }
}

export class Value extends Earthhub_Base {
    constructor({ value = null, uncertainty = null, unit = '', contributions = null, references = null } = {}, defaults = {}) {
        super();
        this.value = value !== null ? value : defaults.value;
        this.uncertainty = uncertainty !== null ? uncertainty : defaults.uncertainty;
        this.unit = unit !== '' ? unit : defaults.unit;
        this.contributions = contributions !== null ? contributions : new Contributions;
        this.references = references !== null ? references : [];
    }
}

export class Past_values extends Earthhub_Base {
    constructor({value_defaults = {}} = {}) {
        super();
        this.times = [];
        this.values = [];
        this.value_defaults = value_defaults;
    }

    set(values) {
        for (const key in values) {
            if (values.hasOwnProperty(key)) {
                const valueObject = values[key];
                const newValue = new Value(valueObject,this.value_defaults);
                this.values.push(newValue);
            }
        }
    }
}

export class Future_values extends Earthhub_Base {
    constructor() {
        super();
        this.times = [];
        this.values = [];
    }
}

export class Carbon_emissions extends Earthhub_Base {
    constructor() {
        super();
        this.past_values = new Past_values({value_defaults: {unit: 'kgCO2e'}});
    }
}

export class Ecosystem extends Earthhub_Base {
    constructor({data = null} = {}) {
        super();
        this.carbon_emissions = new Carbon_emissions;
        this.data = data !== null ? data : {observations: {path: null}}
    }

    async fetchObservations(filter = {}, locations = false) {
        console.log('fetching');
        try {
          // Load the data asynchronously
            const response = await fetch(this.data.observations.path);

            const data = await response.text();
            const lines = data.split('\n');

        
            // Determine the categories based on the first line
            const categories = lines[0].split('\t');
        
            // Create an array to store the filtered records
            const records = [];
        
            // Parse the data lines
            for (let i = 1; i < lines.length; i++) {
                const values = lines[i].split('\t');
        
                // Create an object to store the record
                const record = {};
        
                // Assign values to the corresponding categories dynamically
                for (let j = 0; j < categories.length; j++) {
                    const category = categories[j];
                    record[category] = values[j];
                }
        
                // Filter the record based on the provided filter
                let includeRecord = true;
                for (const key in filter) {
                    if (Object.prototype.hasOwnProperty.call(filter, key) && filter[key] !== undefined) {
                        const recordValue = String(record[key]).toLowerCase(); // Convert record value to lowercase
                        const filterValue = String(filter[key]).toLowerCase(); // Convert filter value to lowercase
                        if (recordValue !== filterValue) {
                            includeRecord = false;
                            break;
                        }
                    }
                }

                // Add the record to the filtered records array if it passes the filter
                if (includeRecord) {
                    console.log('includeRecord')
                    records.push(record);
                }
            }
      
            // Count the occurrences
            const occurrences = records.length;
        
            // Return the results
            return {
                occurrences,
                records
            };
        } catch (error) {
          console.error('Error loading data:', error);
          throw error;
        }
    }      
}

export class Whenua extends Earthhub_Base {
    constructor() {
        super();
        this.awa = [];
        this.carbon_emissions = new Carbon_emissions();
        this.processes = [];
        this.animal_populations = [];
        this.names = [];
        this.ecosystem = new Ecosystem();
    }
}

export class Flow extends Earthhub_Base {
    constructor() {
        super();
        this.liquid = '';
        this.past_rate_values = new Past_values;
        this.future_rate_values = new Future_values;
    }
}

export class Awa extends Earthhub_Base {
    constructor() {
        this.flow = new Flow;
        this.names = [];
        this.shapes = [];
    }
}

export class Process extends Earthhub_Base {

    constructor(name, {carbon_emissions_past = null} = {}) {
        super();
        this.name = name;
        this.carbon_emissions = new Carbon_emissions();
        this.carbon_emissions.past_values.set(carbon_emissions_past)
    }
}

export class Production extends Earthhub_Base {
    constructor() {
        super();
    }
}

export class Population extends Earthhub_Base {
    constructor() {
        this.past_values = new Past_values;
        this.future_values = new Future_values;
    }
}

export class Livestock extends Earthhub_Base {
    constructor() {
        this.population = new Population;
    }
}

export class Agriculture extends Production {
    constructor() {
        this.carbon_emissions = new Carbon_emissions;
        this.livestock = new Livestock;
    }
}

export class Organisation extends Earthhub_Base {
    constructor() {
        super();
    }
}

export class Story extends Earthhub_Base {
    constructor() {
        super();
    }
}