# 06 Desafío Tienda Joyas 

API REST desarrollada con Node.js y Express que permite consultar un inventario de joyas almacenado en una base de datos PostgreSQL.

## Tecnologías
- Node.js
- Express
- PostgreSQL
- pg (node-postgres)

## Base de datos
```sql
CREATE DATABASE joyas;

CREATE TABLE inventario (
    id SERIAL,
    nombre VARCHAR(50),
    categoria VARCHAR(50),
    metal VARCHAR(50),
    precio INT,
    stock INT
);
```

## Instalación
```bash
npm install
```

## Iniciar servidor
```bash
node index.js
```

## Endpoints

### GET /joyas
### GET /joyas/filtros
### GET /joyas/:id

