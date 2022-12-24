const express = require('express')
const app = express()
const mongoose = require('mongoose')
const route = require('./route/route')

app.use(express.json())

mongoose.connect('mongodb+srv://ShadaabIqbal:SHYihabvgthRfy3z@mycluster.cuj3crc.mongodb.net/Project-4', { useNewUrlParser: true }, mongoose.set('strictQuery', false))
    .then(() => { console.log('mongoDB is connected') })
    .catch((error) => { console.log(error) })

app.use('/', route)

app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
})