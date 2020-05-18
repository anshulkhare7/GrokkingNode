const log = console.log
const express = require('express')
const path = require('path')
const publicDir = path.join(__dirname, '../public')
const webapp = express()

webapp.set('view engine', 'hbs')
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