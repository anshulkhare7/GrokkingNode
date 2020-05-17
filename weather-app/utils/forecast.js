const request = require('postman-request')

const weather_url = "http://api.weatherstack.com/current?access_key=282da485b5d6848c5a010da06f7efb3f&query="

const forecast = (latitude, longitude, callback) => {
    
    const url = weather_url + latitude + ',' + longitude

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, response.body.current.weather_descriptions[0] + ' It is currently ' + response.body.current.temperature + ' degress out. There is a ' + response.body.current.precip + '% chance of rain.')
        }
    })
}

module.exports = forecast