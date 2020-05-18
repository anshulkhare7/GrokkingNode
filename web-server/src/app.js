const log = console.log
const express = require('express')
const path = require('path')
const publicDir = path.join(__dirname, '../public')
const app = express()

app.use(express.static(publicDir))

app.get('/weather', (req, res) => {
    res.send({
        'temperature': 32,
        'humidity': 100
    })
});

app.listen(3000, () => {
    log('Server started!');  
})