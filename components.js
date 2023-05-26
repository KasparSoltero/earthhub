// import { otautahi } from './people_classes.js'

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
        console.log(this.refers_to)

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
    customElements.define('whenua-display',WHENUA_DISPLAY)
}
