import {Whenua,Carbon_emissions,Value,Past_values,Future_values,Reference} from './definition_classes.js'

export class Otautahi extends Whenua {
    constructor() {
        super();
        this.carbon_emissions.values.times = [new Value()];
    }
}

window.Otautahi = Otautahi