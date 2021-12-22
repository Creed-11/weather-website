const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne= document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location= search.value

    messageOne.textContent= 'Loading...'
    messageTwo.textContent=''

    fetch('/weather?address='+ encodeURIComponent(location)).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                return messageOne.textContent = data.error
            }

            messageOne.textContent= 'Weather in '+ data.location+ " is " + data.weather+ " and Temperature is " + data.temperature + " degrees."
            //messageTwo.textContent = 'Weather is ' + data.weather+ " and Temperature is " + data.Temperature + " degrees."
        })
    })
})