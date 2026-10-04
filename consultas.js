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

module.exports = { obtenerJoyas }

