const { Pool } = require('pg')

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'admin',
    database: 'joyas',
    port: 5432,
    allowExitOnIdle: true
})

const obtenerJoyas = async ({ limits = 10, page = 1, order_by = 'id_ASC' } = {}) => {
    
    // Separar columna y dirección del order_by
    const [columna, direccion] = order_by.split('_')
    
    // Calcular el offset para la paginación
    const offset = (page - 1) * limits

    const consulta = `
        SELECT * FROM inventario 
        ORDER BY ${columna} ${direccion} 
        LIMIT $1 
        OFFSET $2
    `
    const { rows: joyas } = await pool.query(consulta, [limits, offset])

    const joyasHATEOAS = joyas.map(joya => ({
        ...joya,
        href: `http://localhost:3000/joyas/${joya.id}`
    }))

    return {
        total: joyas.length,
        joyas: joyasHATEOAS
    }
}

const filtrarJoyas = async ({ precio_max, precio_min, categoria, metal }) => {
    
    let consulta = 'SELECT * FROM inventario WHERE true'
    const valores = []
    let i = 1

    if (precio_max) {
        consulta += ` AND precio <= $${i}`
        valores.push(precio_max)
        i++
    }

    if (precio_min) {
        consulta += ` AND precio >= $${i}`
        valores.push(precio_min)
        i++
    }

    if (categoria) {
        consulta += ` AND categoria = $${i}`
        valores.push(categoria)
        i++
    }

    if (metal) {
        consulta += ` AND metal = $${i}`
        valores.push(metal)
        i++
    }

    const { rows: joyas } = await pool.query(consulta, valores)
    return joyas
}


const obtenerJoyaPorId = async (id) => {
    const { rows: joyas } = await pool.query(
        'SELECT * FROM inventario WHERE id = $1', 
        [id]
    )
    return joyas[0]
}

module.exports = { obtenerJoyas, obtenerJoyaPorId, filtrarJoyas }




