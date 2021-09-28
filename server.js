const express = require('express')
const app = express()

const PORT = 3000

app.get('/', (req, res) => {
    res.send('hello, world')
})

app.listen(PORT, () => console.log('Server running at http://localhost:3000'))