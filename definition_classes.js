
export class Base {
    constructor() {
        this.captions = [];
        this.references = [];
        this.images = [];
    }
    // Base class methods
}

export class Reference extends Base {
    constructor() {
        // Reference class attributes
    }
    // Reference class methods
}

export class Contributions extends Base {
    constructor() {
        this.contributors = [];
        this.relevances = [];
    }
}

export class Value extends Base {
    constructor() {
        this.value = null;
        this.uncertainty = null;
        this.unit = '';
        this.contributions = new Contributions;
    }
}

export class Past_values extends Base {
    constructor() {
        this.times = [];
        this.values = [];
    }
}

export class Future_values extends Base {
    constructor() {
        this.times = [];
        this.values = [];
    }
}

export class Carbon_emissions extends Base {
    constructor() {
        this.values = new Past_values;
    }
}

export class Whenua extends Base {
    constructor() {
        this.awa = [];
        this.carbon_emissions = new Carbon_emissions;
        this.productions = [];
        this.animal_populations = [];
    }
}

export class Flow extends Base {
    constructor() {
        this.liquid = '';
        this.past_rate_values = new Past_values;
        this.future_rate_values = new Future_values;
    }
}

export class Awa extends Base {
    constructor() {
        this.flow = new Flow;
        this.names = [];
        this.shapes = [];
    }
}

export class Production extends Base {
    constructor(name) {
        this.name = name;
        this.carbon_emissions = new Carbon_emissions;
    }
}

export class Population extends Base {
    constructor() {
        this.past_values = new Past_values;
        this.future_values = new Future_values;
    }
}

export class Livestock extends Base {
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