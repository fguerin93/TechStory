var myFullpage = new fullpage('#fullpage', {
    //LICENSE
    licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',

	//Navigation
	menu: '#menu',
	lockAnchors: false,
	anchors:['1', '2', '3', '4'],
	navigation: true,
	navigationPosition: 'left',
	navigationTooltips: ['AERONAUTIQUE', 'HORLOGERIE', 'LES MOYENS DE PAIEMENT', 'LA TELEPHONIE'],
	showActiveTooltip: false,
	slidesNavigation: false,
	slidesNavPosition: 'bottom',

	//Scrolling
	css3: true,
	scrollingSpeed: 700,
	autoScrolling: true,
	fitToSection: true,
	fitToSectionDelay: 1000,
	scrollBar: false,
	easing: 'easeInOutCubic',
	easingcss3: 'ease',
	loopBottom: false,
	loopTop: false,
	loopHorizontal: false,
	continuousVertical: false,
	continuousHorizontal: false,
	scrollHorizontally: false,
	interlockedSlides: false,
	dragAndMove: false,
	offsetSections: false,
	resetSliders: false,
	fadingEffect: false,
	normalScrollElements: '#element1, .element2',
	scrollOverflow: false,
	scrollOverflowReset: false,
	scrollOverflowOptions: null,
	touchSensitivity: 15,
	normalScrollElementTouchThreshold: 5,
	bigSectionsDestination: null,

	//Accessibility
	keyboardScrolling: true,
	animateAnchor: true,
	recordHistory: true,

	//Design
	controlArrows: false,
	verticalCentered: false,
	sectionsColor : ['', ''],
	paddingTop: '0',
	paddingBottom: '0',
	fixedElements: '',
	responsiveWidth: 0,
	responsiveHeight: 0,
	responsiveSlides: false,
	parallax: false,
	parallaxOptions: {type: 'reveal', percentage: 62, property: 'translate'},

	//Custom selectors
	sectionSelector: '.section',
	slideSelector: '.slide',

	lazyLoading: true,

	//events
	onLeave: function(origin, destination, direction){},
	afterLoad: function(origin, destination, direction){},
	afterRender: function(){},
	afterResize: function(width, height){},
	afterResponsive: function(isResponsive){},
	afterSlideLoad: function(section, origin, destination, direction){},
	onSlideLeave: function(section, origin, destination, direction){}
});



const dom = document.querySelector('.plane')
const dom1 = document.querySelector('.watch')
const dom2 = document.querySelector('.card')
const dom3 = document.querySelector('.phone')
const plane = new Element3d(window.innerWidth, window.innerHeight, "png", './models/airplane2/1405 Plane.obj', './models/airplane2/1405 Plane.png', 0.0300, dom)
const watch = new Element3d(window.innerWidth, window.innerHeight, "png", './models/watch/Wirst Watch.obj', './models/watch/Wirst Watch Texture.png', 0.0005, dom1)
const card = new Element3d(window.innerWidth, window.innerHeight, "mtl", './models/cb/model.obj', './models/cb/materials.mtl', 0, dom2)
const phone = new Element3d(window.innerWidth, window.innerHeight, "mtl", './models/phone/Iphone.obj', './models/phone/Iphone.mtl', 0, dom3)

window.addEventListener('resize', ()=>{
	plane.resize()
	watch.resize()
	card.resize()
	phone.resize()
})

let killTo = (toDie)=>{
    delete toDie
    const deadCanvas = dom.querySelector('canvas')
    deadCanvas.remove(deadCanvas)
    const object = new Element3d(window.innerWidth, window.innerHeight, "mtl", './models/cb/model.obj', './models/cb/materials.mtl', 0.03, dom)
    return object
}


/*const skrllr = new Skrllr('main', {

	// child container
	container: 'section',

	// easing function
	easing: 'ease',

	// transition time in ms
	transitionTime: 1000,

	// shows pagination
	pagination: false,

	// custom menu
	menu: null,

	// auto update url when switching
	updateURL: false,

	// callback functions
	beforeTransition: null,
	afterTransition: null
	
})*/