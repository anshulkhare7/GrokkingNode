const request = require('postman-request')

const weather_url = "http://api.weatherstack.com/current?access_key=282da485b5d6848c5a010da06f7efb3f&query="

const forecast = (latitude, longitude, callback) => {
    
    const url = weather_url + latitude + ',' + longitude

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ' It is currently ' + body.current.temperature + ' degress out. There is a ' + body.current.precip + '% chance of rain.')
        }
    })
}

module.exports = forecast