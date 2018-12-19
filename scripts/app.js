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
	scrollHorizontally: true,
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
const card = new Element3d(canvasWidth, canvasHeight,windowPercent, "mtl", './models/cb/model.obj', './models/cb/materials.mtl', 0, dom2, 270, {z:-4.5}, {x:0.2})
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

popup.$aboutButton = document.querySelectorAll('.about-button')
popup.$aboutPopup = document.querySelector('.about-popup')
popup.$aboutButtonClose = popup.$aboutPopup.querySelector('.about-popup-button-close')

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

for(let i = 0; i < popup.$aboutButton.length; i++){
	popup.$aboutButton[i].addEventListener('click', () => {
		console.log('bouh')
		/*popup.$aboutPopup.style.display = 'block'*/
		popup.$aboutPopup.classList.add('display')
	})
}

popup.$aboutButtonClose.addEventListener('click', () => {
	popup.$aboutPopup.classList.remove('display')
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
},5000)

window.setTimeout(function()
{
    $sentences[1].classList.remove('isVisible')
    $sentences[2].classList.add('isVisible')
},9500)

window.setTimeout(function()
{
    $sentences[2].classList.remove('isVisible')
    $skipButton.style.display='none'
},14000)

window.setTimeout(function()
{
    $titleContainer.classList.add('isVisible')
    $titleLetters[5].classList.add('launch-anim')
    $titleLetters[6].classList.add('launch-anim')
},15000)


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
	$loadingContainer.classList.remove('display')
}


$skipButton.addEventListener('click',() => {
	hideLoading()
})

$startButton.addEventListener('click', () => {
	hideLoading()
})



/*
* SCROLL HORIZONTAL ON SLIDES
*/
const $slideScroll = document.querySelectorAll('.scroll-horiz')

for (let i = 0; i < $slideScroll.length; i++){
	$slideScroll[i].addEventListener('mousewheel', () => {
		fullpage_api.moveSlideRight();
	})
}


/*
* POPUP LSV
*/
const $lsvPopup = document.querySelectorAll('.techno-lsv-popup')
const $lsvButton = document.querySelectorAll('.discover-button')

for (let i = 0; i < $lsvPopup.length; i++){
	$lsvButton[i].addEventListener('click', () => {
		$lsvPopup[i].classList.add('display')
	})
}
// Dom elements for TIMELINE

const $timelineContainer = document.querySelector('.timeline-container')
const $timelineBar = $timelineContainer.querySelector('.timeline-bar')
const $timePoints = $timelineBar.querySelectorAll('.time-point')
const $actualDate = $timelineContainer.querySelector('.end-date')

let dateTable = []
let actualDate = 2018
let timelineWidth = $timelineBar.offsetWidth
let technoTypes = ['plane','watch','payment','phone']
let technoType = ''
const temoin = []
for(let k=1; k<17; k++)
{
	temoin.push(false)
}
let temoins = ''

//resize
const resize = () =>
{
	timelineWidth = $timelineBar.offsetWidth
}
window.addEventListener('resize',resize)
resize()

// change the date table with new date
const changeDateTable = () =>
{
	dateTable = []
	for(let date=2018; date>actualDate-1; date--)
	{
		dateTable.push(date)
	}
}

const addTimePoint = () =>
{

	//add new point
	if (temoins==false)
	{
		const $newTimePoint = document.createElement('div')
		$newTimePoint.classList.add('time-point', `date-${actualDate}`)
		$newTimePoint.dataset.date=`${actualDate}`
		$newTimePoint.style.right='0'
		$timelineBar.appendChild($newTimePoint)
		//add little icon
		const $pointIcon = document.createElement('i')
		let iconHTML = ''
		switch (technoType)
		{
			case 'plane':
			iconHTML='<i class="fas fa-plane"></i>'
			break;
			case 'watch':
			iconHTML='<i class="fas fa-clock"></i>'
			break;
			case 'payment':
			iconHTML='<i class="fas fa-credit-card"></i>'
			break;
			case 'phone':
			iconHTML='<i class="fas fa-mobile-alt"></i>'
			break;
		}


		$pointIcon.innerHTML=`<span style="color:white;position:absolute; transform:translate(-8px,-20px)">${iconHTML}</i></span>`
		$newTimePoint.appendChild($pointIcon)
	}

	const $timePoints = $timelineBar.querySelectorAll('.time-point')
	
	for(let i=1; i<$timePoints.length-1; i++)
	{
		let pointDate = Number($timePoints[i].dataset.date)
		$timePoints[i].style.transform=`translate(${calculateTranslateX(pointDate)}px, -2vh)`
	}
}

const calculateTranslateX = (pointDate) =>
{
	let translateX = -(timelineWidth*(pointDate-actualDate)/(dateTable.length))
	return translateX
}


const loop = () =>
{
	window.requestAnimationFrame(loop)
	for(let i=1; i<5; i++)
	{
		if ((document.body.classList.contains(`fp-viewing-1-${i}`))||(document.body.classList.contains(`fp-viewing-2-${i}`))||(document.body.classList.contains(`fp-viewing-3-${i}`))||
		(document.body.classList.contains(`fp-viewing-4-${i}`)))
		{
			$timelineContainer.classList.add('isVisible')
		}
		if ((document.body.classList.contains(`fp-viewing-1-0`))||(document.body.classList.contains(`fp-viewing-2-0`))||(document.body.classList.contains(`fp-viewing-3-0`))
		||(document.body.classList.contains(`fp-viewing-4-0`)))
		{
			$timelineContainer.classList.remove('isVisible')
		}
	}
}
loop()



// Selectionne le noeud dont les mutations seront observées
//var targetNode = document.getElementById('some-id');

// Options de l'observateur (quelles sont les mutations à observer)
var config = { attributes: true };

// Fonction callback à éxécuter quand une mutation est observée
const callback = (mutationsList) =>
{
    for(const mutation of mutationsList) {
		if (mutation.type == 'attributes') {
			switch (true)
			{
				//aviation
				case document.body.classList.contains('fp-viewing-1-1'):
				actualDate = 1939
				technoType = technoTypes[0]
				temoins=temoin[1]
				temoin[1]=true
				break;
				case document.body.classList.contains('fp-viewing-1-2'):
				actualDate = 1915
				technoType = technoTypes[0]
				temoins=temoin[2]
				temoin[2]=true
				break;
				case document.body.classList.contains('fp-viewing-1-3'):
				actualDate = 1890
				technoType = technoTypes[0]
				temoins=temoin[3]
				temoin[3]=true
				break;
				case document.body.classList.contains('fp-viewing-1-4'):
				actualDate = 1405
				technoType = technoTypes[0]
				temoins=temoin[4]
				temoin[4]=true
				break;
				//watch
				case document.body.classList.contains('fp-viewing-2-1'):
				actualDate = 1955
				technoType = technoTypes[1]
				temoins=temoin[5]
				temoin[5]=true
				break;
				case document.body.classList.contains('fp-viewing-2-2'):
				actualDate = 1278
				technoType = technoTypes[1]
				temoins=temoin[6]
				temoin[6]=true
				break;
				case document.body.classList.contains('fp-viewing-2-3'):
				actualDate = -1350
				technoType = technoTypes[1]
				temoins=temoin[7]
				temoin[7]=true
				break;
				case document.body.classList.contains('fp-viewing-2-4'):
				actualDate = -1500
				technoType = technoTypes[1]
				temoins=temoin[8]
				temoin[8]=true
				break;
				//payment
				case document.body.classList.contains('fp-viewing-3-1'):
				actualDate = 1974
				technoType = technoTypes[2]
				temoins=temoin[9]
				temoin[9]=true
				break;
				case document.body.classList.contains('fp-viewing-3-2'):
				actualDate = 1550
				technoType = technoTypes[2]
				temoins=temoin[10]
				temoin[10]=true
				break;
				case document.body.classList.contains('fp-viewing-3-3'):
				actualDate = 700
				technoType = technoTypes[2]
				temoins=temoin[11]
				temoin[11]=true
				break;
				case document.body.classList.contains('fp-viewing-3-4'):
				actualDate = -700
				technoType = technoTypes[2]
				temoins=temoin[12]
				temoin[12]=true
				break;
				//phone
				case document.body.classList.contains('fp-viewing-4-1'):
				actualDate = 2007
				technoType = technoTypes[3]
				temoins=temoin[13]
				temoin[13]=true
				break;
				case document.body.classList.contains('fp-viewing-4-2'):
				actualDate = 1915
				technoType = technoTypes[3]
				temoins=temoin[14]
				temoin[14]=true
				break;
				case document.body.classList.contains('fp-viewing-4-3'):
				actualDate = 1880
				technoType = technoTypes[3]
				temoins=temoin[15]
				temoin[15]=true
				break;
				case document.body.classList.contains('fp-viewing-4-4'):
				actualDate = 1876
				technoType = technoTypes[3]
				temoins=temoin[16]
				temoin[16]=true
				break;
			}
			$actualDate.textContent=`${actualDate}`
			changeDateTable()
			addTimePoint()
        }
    }
}

// Créé une instance de l'observateur lié à la fonction de callback
var observer = new MutationObserver(callback);

// Commence à observer le noeud cible pour les mutations précédemment configurées
observer.observe(document.body, config);
