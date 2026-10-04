const express = require('express')
const app = express()
const { obtenerJoyas } = require('./consultas')

app.listen(3000, console.log('Server ON'))

app.get('/joyas', async (req, res) => {
    const joyas = await obtenerJoyas(req.query)
    res.json(joyas)
})

