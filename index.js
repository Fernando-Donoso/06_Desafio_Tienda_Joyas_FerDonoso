const express = require('express')
const app = express()
const { obtenerJoyas, obtenerJoyaPorId, filtrarJoyas } = require('./consultas')


app.listen(3000, console.log('Server ON'))

app.get('/joyas', async (req, res) => {
    const joyas = await obtenerJoyas(req.query)
    res.json(joyas)
})



app.get('/joyas/filtros', async (req, res) => {
    const joyas = await filtrarJoyas(req.query)
    res.json(joyas)
})


