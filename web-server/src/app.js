const express = require('express')
const path = require('path')
const hbs = require('hbs')

const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const log = console.log

const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const webapp = express()

webapp.set('view engine', 'hbs')
webapp.set('views', viewsPath)
webapp.use(express.static(publicDir))
hbs.registerPartials(partialsPath)

webapp.get('', (req, res) => {
    res.render('index', {
        title: "Home",
        headerText: "Weather App"
    })
})

webapp.get('/about', (req, res) => {
    res.render('about', {
        title: "About",
        headerText: "About Me"
    })
})

webapp.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        headerText: "FAQ"
    })
})

webapp.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            'error' : 'Please provide address'
        })
    }
    log('Address: ', req.query.address)
    geocode(req.query.address, (err, {latitude, longitude, location} = {}) => {
        if (err) {
            return res.send({ err })
        }        

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })                
           }
           log('Weather data: ', forecastData)

            res.send({                
                forecast: forecastData,
                location,
                address: req.query.address
            })            
        })
    })        
});

webapp.get('*', (req, res)=>{
    res.render('404',{
        title: "Page not found"
    })
});

webapp.listen(3000, () => {
    log('Server started!');  
})