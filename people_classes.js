import {Whenua,Carbon_emissions,Value,Past_values,Future_values,Reference} from './definition_classes.js'

export class Otautahi extends Whenua {
    constructor() {
        super();
        this.carbon_emissions.values.set({
            '18-06-01 19-05-30': new Value({value:10,uncertainty:1}),
            '18-06-021 19-05-30': new Value({value:10,uncertainty:1,unit:'tonnes'}),
        })
    }
}

window.Otautahi = Otautahi