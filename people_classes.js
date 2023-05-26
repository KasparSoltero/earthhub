import {Whenua,Carbon_emissions,Value,Past_values,Future_values,Reference} from './definition_classes.js'

export class otautahi extends Whenua {
    constructor() {
        this.carbon_emissions.values.times = [new Value()]
    }
}
