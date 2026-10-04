const express = require('express')
const app = express()
const { obtenerJoyas, obtenerJoyaPorId, filtrarJoyas } = require('./consultas')

app.listen(3000, console.log('Server ON'))

// Middleware logger
app.use((req, res, next) => {
    const fecha = new Date().toLocaleString()
    console.log(`[${fecha}] ${req.method} ${req.url}`)
    next()
})

app.get('/joyas', async (req, res) => {
    try {
        const joyas = await obtenerJoyas(req.query)
        res.json(joyas)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

app.get('/joyas/filtros', async (req, res) => {
    try {
        const joyas = await filtrarJoyas(req.query)
        res.json(joyas)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

app.get('/joyas/:id', async (req, res) => {
    try {
        const { id } = req.params
        const joya = await obtenerJoyaPorId(id)
        res.json(joya)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})


