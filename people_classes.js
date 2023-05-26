import {Whenua,Process,Carbon_emissions,Value,Past_values,Future_values,Reference} from './definition_classes.js'

export class Otautahi extends Whenua {
    constructor() {
        super();
        this.carbon_emissions.past_values.set({ //default unit is kgCO2e
            '18-06-01 19-05-30': new Value({value:'2723016000',references: [new Reference('aecom_emissions_2020')]}),
            '16-06-01 17-05-30': new Value({value:'2665643000',references: [new Reference('aecom_emissions_2020')]}),
        });
        this.processes = [
            new Process('transportation',{carbon_emissions_past: {
                '18-06-01 19-05-30': new Value({value:'1470159000', references: [new Reference('aecom_emissions_2020')]}),
                '18-06-01 19-05-30': new Value({value:'1470159000', references: [new Reference('aecom_emissions_2020')]}),
            }}),
            new Process('stationary_energy',{carbon_emissions_past: {
                '18-06-01 19-05-30': new Value({value:'517077000', references: [new Reference('aecom_emissions_2020')]}),
                '18-06-01 19-05-30': new Value({value:'517077000', references: [new Reference('aecom_emissions_2020')]}),
            }}),
            new Process('agriculture',{carbon_emissions_past: {
                '18-06-01 19-05-30': new Value({value:'417545000', references: [new Reference('aecom_emissions_2020')]}),
                '18-06-01 19-05-30': new Value({value:'417545000', references: [new Reference('aecom_emissions_2020')]}),
            }}),
            new Process('industrial_processes_and_product_use',{carbon_emissions_past: {
                '18-06-01 19-05-30': new Value({value:'115381000', references: [new Reference('aecom_emissions_2020')]}),
                '18-06-01 19-05-30': new Value({value:'115381000', references: [new Reference('aecom_emissions_2020')]}),
            }}),
        ]
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

const otautahiInstance = new Otautahi();
addPropertiesToWindow(otautahiInstance, Otautahi);