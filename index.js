const express = require('express')
const app = express()
const port = 3000
app.get('/', (request, response) => {
    response.send('Hello from Express!')
})
app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port} click link \x1b[36m http://localhost:3000 \x1b[0m `)
})