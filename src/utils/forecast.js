const request = require('request')

const forecast = (lati, longi ,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=2f8683c643bdbaeeea270f14fe43c355&query=' + lati + ',' + longi + '&units=m'
    
    request({ url, json:true }, (error, {body} = {}) => {
        if(error){
            callback('Unable to connect to service!', undefined)
        } else if(body.error) {
            callback('Please specify a valid location!', undefined)
        } else {
            callback(undefined, {
                location: body.location.name,
                weather: body.current.weather_descriptions[0],
                temperature:  body.current.temperature,
                feelslike:  body.current.feelslike
            })
        }
    })
}

module.exports = forecast