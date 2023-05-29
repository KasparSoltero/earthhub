
export class Earthhub_Base {
    constructor() {
        this.captions = [];
        this.references = [];
        this.images = [];
    }
    // Earthhub_Base class methods
    setCaption(captions) {
        console.log('here')
        console.log(captions)
        if (!Array.isArray(captions)) {
            captions = [captions]
        }
        this.captions = captions
        return this
    }
}

export class Reference extends Earthhub_Base {
    constructor(key='', title = '', authors = '', year = '', journal = '', volume = '', number = '', pages = '', doi = '', url = '') {
        super();
        // Reference class attributes
        this.key = key;
        this.title = title;
        this.authors = authors;
        this.year = year;
        this.journal = journal;
        this.volume = volume;
        this.number = number;
        this.pages = pages;
        this.doi = doi;
        this.url = url;
    }
    // Reference class methods
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

export class Whenua extends Earthhub_Base {
    constructor() {
        super();
        this.awa = [];
        this.carbon_emissions = new Carbon_emissions;
        this.processes = [];
        this.animal_populations = [];
        this.names = [];
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