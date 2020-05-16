const fs = require('fs')

const dataBuffer = fs.readFileSync('1-json.json')
const data = JSON.parse(dataBuffer.toString())
data.name = "Anshul Khare"
data.age = 39
fs.writeFileSync('1-json.json', JSON.stringify(data))