const express = require('express')
const mongoose  = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(require('cookie-parser')())
app.use(require('cors')())
app.use(require('morgan')('dev'))

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(e => console.log('Server connected to the database'))

app.get('/', (req, res) => {
    res.send('hello, world')
})

app.listen(process.env.PORT, () => console.log(`Server running at http://localhost:${process.env.PORT}`))
