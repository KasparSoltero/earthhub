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
        ];
        this.names = [
            new Value({value:'ōtautahi'}).setCaption('of chief Te Potiki Tautahi, adopted in 1930-1940'),
            new Value({value:'christchurch'}).setCaption('set by Canterbury Association on 1848-03-27 for Christ Church University of Oxford, abbreviates to ChCh'),
            new Value({value:'waitaha'}),
            new Value({value:'karaitiana'}).setCaption('transliteration of christian, used before 1930-1940'),
        ]
        this.animal_populations = new Value({value:[
            ['Acanthis flammea', null], ['Acanthisitta chloris', null], ['Acridotheres tristis', null], ['Aix galericulata', null], ['Alauda arvensis', null], 
            ['Alisterus scapularis', null], ['Anarhynchus frontalis', null], ['Anas chlorotis', null], ['Anas gracilis', null], ['Anas platyrhynchos', null], 
            ['Anas rhynchotis', null], ['Anas superciliosa', null], ['Anser anser', null], ['Anthornis melanura', null], ['Anthus novaeseelandiae', null], 
            ['Apteryx mantelli', null], ['Apteryx owenii', null], ['Ardea alba', null], ['Ardea modesta', null], ['Arenaria interpres', null], 
            ['Aythya australis', null], ['Aythya novaeseelandiae', null], ['Branta canadensis', null], ['Cacatua galerita', null], ['Cairina moschata', null], 
            ['Calidris canutus', null], ['Callaeas cinereus', null], ['Callipepla californica', null], ['Carduelis carduelis', null], ['Charadrius bicinctus', null], 
            ['Charadrius obscurus', null], ['Chlidonias albostriatus', null], ['Chlidonias leucopterus', null], ['Chlidonias niger', null], ['Chloris chloris', null], 
            ['Chroicocephalus bulleri', null], ['Chroicocephalus novaehollandiae', null], ['Chroicocephalus scopulinus', null], ['Chrysococcyx lucidus', null], ['Circus approximans', null], 
            ['Columba livia', null], ['Corvus frugilegus', null], ['Coturnix japonica', null], ['Coturnix ypsilophora', null], ['Cyanoramphus auriceps', null], 
            ['Cyanoramphus novaezelandiae', null], ['Cygnus atratus', null], ['Daption capense', null], ['Diomedea epomophora', null], ['Diomedea exulans', null], 
            ['Diomedea sanfordi', null], ['Egretta novaehollandiae', null], ['Egretta sacra', null], ['Elseyornis melanops', null], ['Emberiza cirlus', null], 
            ['Emberiza citrinella', null], ['Eudyptula minor', null], ['Falco novaeseelandiae', null], ['Fregetta tropica', null], ['Fringilla coelebs', null], 
            ['Fulica atra', null], ['Gallirallus australis', null], ['Gallirallus philippensis', null], ['Gallus gallus', null], ['Garrodia nereis', null], 
            ['Gerygone igata', null], ['Gymnorhina tibicen', null], ['Haematopus finschi', null], ['Haematopus unicolor', null], ['Hemiphaga novaeseelandiae', null], 
            ['Himantopus leucocephalus', null], ['Hirundo neoxena', null], ['Hydroprogne caspia', null], ['Larus dominicanus', null], ['Leucocarbo carunculatus', null], 
            ['Limosa lapponica', null], ['Macronectes giganteus', null], ['Macronectes halli', null], ['Megadyptes antipodes', null], ['Meleagris gallopavo', null], 
            ['Microcarbo melanoleucos', null], ['Mohoua albicilla', null], ['Morus serrator', null], ['Nestor meridionalis', null], ['Ninox novaeseelandiae', null], 
            ['Notiomystis cincta', null], ['Numenius madagascariensis', null], ['Pachyptila salvini', null], ['Pachyptila turtur', null], ['Pachyptila vittata', null], 
            ['Passer domesticus', null], ['Pavo cristatus', null], ['Pelagodroma marina', null], ['Pelecanoides urinatrix', null], ['Petroica australis', null], 
            ['Petroica macrocephala', null], ['Phalacrocorax carbo', null], ['Phalacrocorax punctatus', null], ['Phalacrocorax sulcirostris', null], ['Phalacrocorax varius', null], 
            ['Phasianus colchicus', null], ['Philesturnus carunculatus', null], ['Phoebetria palpebrata', null], ['Platalea regia', null], ['Platycercus eximius', null], 
            ['Poliocephalus rufopectus', null], ['Poodytes punctatus', null], ['Porphyrio hochstetteri', null], ['Porphyrio melanotus', null], ['Porzana tabuensis', null], 
            ['Procellaria aequinoctialis', null], ['Procellaria parkinsoni', null], ['Procellaria westlandica', null], ['Prosthemadera novaeseelandiae', null], ['Prunella modularis', null], 
            ['Pterodroma cookii', null], ['Pterodroma macroptera', null], ['Puffinus assimilis', null], ['Puffinus bulleri', null], ['Puffinus carneipes', null], 
            ['Puffinus gavia', null], ['Puffinus griseus', null], ['Puffinus huttoni', null], ['Puffinus tenuirostris', null], ['Rhipidura fuliginosa', null], 
            ['Serinus canaria', null], ['Stercorarius antarcticus', null], ['Stercorarius parasiticus', null], ['Stercorarius pomarinus', null], ['Sterna paradisaea', null], 
            ['Sterna striata', null], ['Streptopelia roseogrisea', null], ['Sturnus vulgaris', null], ['Tadorna variegata', null], ['Thalassarche bulleri', null], 
            ['Thalassarche cauta', null], ['Thalassarche melanophris', null], ['Thalassarche salvini', null], ['Thalassoica antarctica', null], ['Thinornis novaeseelandiae', null], 
            ['Todiramphus sanctus', null], ['Turdus merula', null], ['Turdus philomelos', null], ['Urodynamis taitensis', null], ['Vanellus miles', null], 
            ['Zosterops lateralis', null]] //source inaturalist, temporary placement
        }).setCaption('birds')
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