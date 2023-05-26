import {Whenua,Carbon_emissions,Value,Past_values,Future_values,Reference} from './definition_classes.js'

export class Otautahi extends Whenua {
    constructor() {
        super();
        console.log(this)
        this.carbon_emissions.past_values.set({ //default unit is kgCO2e
            '18-06-01 19-05-30': new Value({value:'2723016000',uncertainty:1}),
            '18-06-021 19-05-30': new Value({value:'3723016000',uncertainty:1}),
        })
    }
}

window['Otautahi'] = Otautahi;

function addPropertiesToWindow(obj, windowObj) {
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key];
            if (typeof value === 'object') {
                windowObj[key] = value;
                addPropertiesToWindow(value, windowObj[key]);
            }
        }
    }
}

const otautahiInstance = new window['Otautahi']();
addPropertiesToWindow(otautahiInstance, window['Otautahi']);