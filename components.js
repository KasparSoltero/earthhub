import { Earthhub_Base } from './definition_classes.js'

class Example extends HTMLElement{
    constructor () {

		// Always call super first in constructor
		super();
        //In general, the constructor should be used to: 
        //  set up initial state and 
        //  default values, and to 
        //  set up event listeners and  
        //  possibly a shadow root.
	}
	/**
	 * Runs each time the element is appended to or moved in the DOM
	 */
	connectedCallback () {
		console.log('connected!', this);

		// Render HTML, event handlers etc
        this.innerHTML ='';
	}
	/**
	 * Runs when the element is removed from the DOM
	 */
	disconnectedCallback () {
		console.log('disconnected', this);
	}
}

class ReferenceObject extends HTMLElement{
    constructor () {
		super();
        this.media_ref_switch = false;
	}
    loadMedia() {
        let media = this.getAttribute('media')
        this.innerHTML="<img src="+media+" alt='missing media'>"
    }
    loadRef() {
        let ref = 'temp'
        this.innerHTML=ref
    }
	connectedCallback () {
        // path="lib/images/otakaro-bordseye.png"
        // this.innerHTML = '<reference_object></reference_object>'
        // console.log(this)
        if(this.className=='image') {
            this.loadMedia()
        }
        this.onclick=(()=>{
            this.media_ref_switch ? this.loadMedia() : this.loadRef()
            this.media_ref_switch = !this.media_ref_switch
        })
	}
	disconnectedCallback () {
	}
}

class HTML_DISPLAY extends HTMLElement{
    constructor(name) {
        super();
        this.refers_to = name
    }

    findPersonClass() {

    }

    connectedCallback () {
		console.log('connected!', this);

        // Access the 'name' attribute, set the 'person' class
        // which the html element draws from.
        const name = this.getAttribute('name');
        console.log(name); // Output: "otautahi"

        // Get all earthhub classes in window. The .html file must import the appropriate containing .js file before importing components.js
        const exportedClasses = Object.values(window).filter(
            (value) => typeof value === 'function' && value.prototype instanceof Earthhub_Base
        );

        console.log(exportedClasses); // Output: [otautahi, ...]

        // Check if 'name' attribute is in the list of exported classes
        const targetClass = exportedClasses.find(
            (classObj) => classObj.name === name
        );

        if (targetClass) {
            this.refers_to = new targetClass();
        } else {
            // Throw an error if the class is not found
            throw new Error(`Class "${name}" not found`);
        }

        console.log(this.refers_to); // Output: otautahi instance

		// Render HTML, event handlers etc
        this.innerHTML ='';
	}
    
}
class WHENUA_DISPLAY extends HTML_DISPLAY{
    constructor(name) {
        super(name);
    }
    /**
	 * Runs each time the element is appended to or moved in the DOM
	 */
    connectedCallback () {
		console.log('connected!', this);
        // console.log(this.refers_to)

        // // Access the 'name' attribute
        // const name = this.getAttribute('name');
        // console.log(name); // Output: "otautahi"

        // // Check if 'name' attribute is 'otautahi'
        // if (name === 'otautahi') {
        //     // Create an instance of otautahi and assign it to 'refers_to'
        //     this.refers_to = new otautahi();
        //     console.log(this.refers_to); // Output: otautahi instance
        // }

		// Render HTML, event handlers etc
        this.innerHTML ='';
	}
	/**
	 * Runs when the element is removed from the DOM
	 */
	disconnectedCallback () {
		console.log('disconnected', this);
	}
}

// Define the new web component
if ('customElements' in window) {
	customElements.define('example-example', Example);
    customElements.define('reference-object',ReferenceObject);
    customElements.define('html-display',HTML_DISPLAY);
    customElements.define('whenua-display',WHENUA_DISPLAY);
}
