const form= document.querySelector('form')

const submitButton = form.querySelector('[type=submit]')
const values = form.querySelectorAll('[name=object]')
const targetForm = form.action
submitButton.addEventListener('click', (event)=>{
    event.preventDefault()
    
    sendRequest()

})


const sendRequest = ()=>{
    let selectedValue
    for(let i=0 ; i<values.length; i++){
        if(values[i].checked){
            selectedValue = values[i]
            break
        }
        selectedValue = undefined
    }
    const url = `${targetForm}?${selectedValue.name}=${selectedValue.value}`

    // window.open(url)
    if(selectedValue != undefined){
        let request = new XMLHttpRequest()
        request.addEventListener('load', (event)=>{
            
            console.log(event)
        })

        request.open('GET', url, true)
        request.send()
    }
    
    
}