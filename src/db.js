require('dotenv').config()
const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: process.env.NODE_HOST,
    user: process.env.NODE_USER,
    password: process.env.NODE_PASS,
    database: process.env.NODE_DB
})

connection.connect((error) => {
    if (error) throw error;
    console.log("Conectado ao banco de dados")
})

module.exports = connection