const express = require('express')
const path = require('path')
const log = console.log

const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates')

const webapp = express()

// Handlebar settings
webapp.set('view engine', 'hbs')
webapp.set('views', viewsPath)
webapp.use(express.static(publicDir))

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
    res.send({
        'temperature': 32,
        'humidity': 100
    })
});

webapp.listen(3000, () => {
    log('Server started!');  
})