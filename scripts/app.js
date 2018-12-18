/*
* FULLPAGE JS SETTINGS
*/

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
	resetSliders: true,
	fadingEffect: false,
	normalScrollElements: '',
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
	fixedElements: '.techstory-popup',
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
	onSlideLeave: function(section, origin, destination, direction){},
});


/*
* THREE JS SETTINGS AND IMPORTS
*/

const dom = document.querySelector('.plane')
const dom1 = document.querySelector('.watch')
const dom2 = document.querySelector('.card')
const dom3 = document.querySelector('.phone')

const windowPercent = 60
let canvasWidth = window.innerWidth /100*windowPercent
let canvasHeight = window.innerHeight/100*windowPercent

const plane = new Element3d(canvasWidth, canvasHeight,windowPercent, "png", './models/airplane2/1405 Plane.obj', './models/airplane2/1405 Plane.png', 0.0330, dom,180)
const watch = new Element3d(canvasWidth, canvasHeight,windowPercent, "png", './models/watch/Wirst Watch.obj', './models/watch/Wirst Watch Texture.png', 0.00069, dom1,180)
const card = new Element3d(canvasWidth, canvasHeight,windowPercent, "mtl", './models/cb/model.obj', './models/cb/materials.mtl', 0, dom2, 270, {z:-4.5})
const phone = new Element3d(canvasWidth, canvasHeight,windowPercent, "mtl", './models/phone/mobile-phone.obj', './models/phone/mobile-phone.mtl', 0, dom3,180, {z:-30}, {y:-15})

window.addEventListener('resize', ()=>{
	plane.resize()
	watch.resize()
	card.resize()
	phone.resize()
})


/*
* BUTTON ACTIONS
*/

const popup = {}

popup.$techstoryButton = document.querySelectorAll('.techstory-button')
popup.$techstoryPopup = document.querySelector('.techstory-popup')
popup.$techstoryButtonClose = popup.$techstoryPopup.querySelector('.techstory-popup-button-close')

for(let i = 0; i < popup.$techstoryButton.length; i++){
	popup.$techstoryButton[i].addEventListener('click', () => {
		console.log('bouh')
		/*popup.$techstoryPopup.style.display = 'block'*/
		popup.$techstoryPopup.classList.add('display')
	})
}

popup.$techstoryButtonClose.addEventListener('click', () => {
	popup.$techstoryPopup.classList.remove('display')
})


/*
* INTRO
*/

//DOM ELEMENTS

const $loadingContainer = document.querySelector('.loading-container')
const $sentenceContainer = $loadingContainer.querySelector('.sentence-container')
const $sentences = $sentenceContainer.querySelectorAll('.sentence')

const $iconsContainer = $loadingContainer.querySelectorAll('.icon-container')
const $loadingIcons = $loadingContainer.querySelectorAll('.icon')

const $skipButton = $loadingContainer.querySelector('.skip-button')
const $loadBar = $loadingContainer.querySelector('.load-bar')

const $titleContainer = $loadingContainer.querySelector('.title-container')
const $titleLetters = $titleContainer.querySelectorAll('svg')

const $startButton = $titleContainer.querySelector('.start-button')


window.setTimeout(function()
{
    $sentences[0].classList.add('isVisible')
},500)

window.setTimeout(function()
{
    $sentences[0].classList.remove('isVisible')
    $sentences[1].classList.add('isVisible')
},3000)

window.setTimeout(function()
{
    $sentences[1].classList.remove('isVisible')
    $sentences[2].classList.add('isVisible')
},5500)

window.setTimeout(function()
{
    $sentences[2].classList.remove('isVisible')
    $skipButton.style.display='none'
},8000)

window.setTimeout(function()
{
    $titleContainer.classList.add('isVisible')
    $titleLetters[5].classList.add('launch-anim')
    $titleLetters[6].classList.add('launch-anim')
},9000)


for(let i = 0; i<$loadingIcons.length;i++)
{
    $loadingIcons[i].addEventListener('mouseleave', (_event) =>
    {
        const bounding = $loadingIcons[i].getBoundingClientRect()
        let translateX = (_event.clientX - bounding.left - bounding.width/2)/3
        let translateY = (_event.clientY - bounding.top - bounding.height/2)/3
        $iconsContainer[i].style.transform=`translate(${translateX}px,${translateY}px)`
    })
}

const hideLoading = () => {
	$loadingContainer.style.display = 'none'
}


$skipButton.addEventListener('click',() => {
	hideLoading()
})

$startButton.addEventListener('click', () => {
	hideLoading()
})