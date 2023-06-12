import {Story,Whenua,Organisation,Process,Carbon_emissions,Value,Past_values,Future_values,Reference} from './definition_classes.js'

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
        ];
        this.names = [
            new Value({value:'ōtautahi'}).setCaption('of chief Te Potiki Tautahi, adopted in 1930-1940'),
            new Value({value:'christchurch'}).setCaption('set by Canterbury Association on 1848-03-27 for Christ Church University of Oxford, abbreviates to ChCh'),
            new Value({value:'waitaha'}),
            new Value({value:'karaitiana'}).setCaption('transliteration of christian, used before 1930-1940'),
        ]
        this.ecosystem.data = {observations: {path: 'lib/data/otautahi_observations.txt'}}
        this.ecosystem.images = ['otautahi-ecosystem-background.png']
        this.ecosystem.captions = ['Data sourced from New Zealand Garden Bird Survey, iNaturalist Research-grade Observations, and eBird Observation Dataset: https://doi.org/10.15468/dl.95yhwr']
    }
}

export class Earthhub extends Organisation {
    constructor() {
        super();
        this.captions = ["We seek a just and immediate systemic change to the city of Ōtautahi, to recognise rangitiratanga and fulfill te Tiriti o Waitangi, and to abolish the heirarchies of ability, age, class, faith, gender, race, and sexuality. We advocate the tikanga māori led ceasing of all extractive dependancies of the city, and the restoration of all rākau, manu, and ika species native to Ōtautahi. We practice this change through social and physical media, collaboration, agitation, and direct action"]
    }
}

export class Native_Trees extends Story {
    constructor() {
        super();
        this.images = ['story-native-trees-0.png','story-native-trees-1.png']
        this.captions = ['Data was sourced from iNaturalist Research-Grade observations, and stylised for visual clarity. The 60 most commonly observed tree species in each location are included, where a tree was defined as any plant that can grow over 3 m.']
        this.references = [
            new Reference({
                key: 'barnagaud_habitat_2014',
                title: 'Habitat filtering by landscape and local forest composition in native and exotic New Zealand birds',
                volume: '95',
                issn: '0012-9658',
                doi: '10.1890/13-0791.1',
                pages: '78-87',
                number: '1',
                journaltitle: 'Ecology',
                shortjournal: 'Ecology',
                author: 'Barnagaud, Jean-Yves and Barbaro, Luc and Papaïx, Julien and Deconchat, Marc and Brockerhoff, Eckehard G.',
                date: '2014-01',
                pmid: '24649648',
                keywords: 'aotearoa, New Zealand, Birds, bird, Animals, ecosystem dynamics, Demography, Ecosystem, Introduced Species, Trees'
              }),
              new Reference({
                key: 'black_how_2017',
                title: 'How much of the red zone needs to go green to support native birds?',
                url: 'https://www.stuff.co.nz/the-press/business/the-rebuild/90670748/how-much-of-the-red-zone-needs-to-go-green-to-support-native-birds',
                author: 'Black, Amanda',
                urldate: '2023-05-30',
                date: '2017-03-21',
                langid: 'english',
                note: 'Section: the-press'
              }),
              new Reference({
                key: 'malcolm_kaitiakitanga_2023',
                title: 'Kaitiakitanga with Tame Malcolm',
                url: 'https://www.sciencelearn.org.nz/resources/3150-kaitiakitanga-with-tame-malcolm',
                author: 'Malcolm, Tame',
                urldate: '2023-06-12',
                langid: 'english',
              }),
        ]
    }
}

window['Otautahi'] = Otautahi;
window['Earthhub'] = Earthhub;
window['Native_Trees'] = Native_Trees;

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
const earthhubInstance = new Earthhub();
addPropertiesToWindow(earthhubInstance, Earthhub);
const nativeTreesInstance = new Native_Trees();
addPropertiesToWindow(nativeTreesInstance, Native_Trees);