const log = console.log

const request = require('postman-request');

const url = "http://api.weatherstack.com/current?access_key=282da485b5d6848c5a010da06f7efb3f&query=bengaluru"

request(url, (err, response, body) => {
    const data = JSON.parse(body)
    log(data.current)
})