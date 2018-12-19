const form= document.querySelector('form')

const message = document.querySelector('.message')
const submitButton = form.querySelector('[type=submit]')
const values = form.querySelectorAll('[name=object]')
const targetForm = form.action
//check if user as already vote
let lastVote = window.localStorage.getItem('vote')
if(lastVote != null){
    lastVote = JSON.parse(lastVote)
}


const date = new Date()
const day = date.getDate()
const dayWeek = date.getDay()

let clickToPush = false

let selectedValue

submitButton.addEventListener('click', (event)=>{
    event.preventDefault()

    for(let i=0 ; i<values.length; i++){
        if(values[i].checked){
            selectedValue = values[i]
    
            break
        }
        selectedValue = undefined
    }
    if(selectedValue != undefined){
        if(!clickToPush){
            checkVote()
        }else{
            alreadyVote()
        }
    }

})

//send request to the .php file 
const sendRequest = ()=>{

    if(selectedValue != undefined){
        const url = `${targetForm}?${selectedValue.name}=${selectedValue.value}`
        let request = new XMLHttpRequest()

        request.open('GET', url, true)
        request.send()
        message.title= 'Envoyé'
        message.classList.add('checked')
    }
    
    
}
//check if user can vote or not, user can vote only once a week
const checkVote = ()=>{

    let toStorage = {
        date : day,
        day : dayWeek
    }

    if(lastVote === null){

        toStorage = JSON.stringify(toStorage)
        window.localStorage.setItem('vote', toStorage)
        sendRequest()
        clickToPush = true
        
    }else if( lastVote != null){

        if((lastVote.date+(6 - lastVote.day +1)) >= day && lastVote.date> day){
            toStorage = JSON.stringify(toStorage)
            window.localStorage.setItem('vote', toStorage)
            sendRequest()
            clickToPush = true
        }else{
            alreadyVote()
        }
        
    }else{
        alreadyVote()
    }
}


//if user already vote
const alreadyVote = ()=>{
    message.title="Vous l'avez déjà envoyé"
    message.classList.add('checked')
}