console.log("Javvascipt script running")



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne= document.querySelector('#message-1')
const messageTwo= document.querySelector('#message-2')




weatherForm.addEventListener('submit',(e)=>//what happens when click on submit
{   e.preventDefault()
    messageOne.textContent="Loading...."
        messageTwo.textContent=""
    const location = search.value
    fetch('/weather?adress='+location).then((response)=>{
        
        response.json().then((data) =>{
            if(data.error)
            {
                messageOne.textContent=data.error
                
            }
            else {  
                messageOne.textContent=data.forecast
                messageTwo.textContent=data.location

                console.log(data.forecast)
                console.log(data.location)
                console.log(data.adress)
            }
        })
    })
})