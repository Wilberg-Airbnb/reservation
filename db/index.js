const mysql = require('mysql');


const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: '3306',
    user: 'root',
    password: process.env.DB_PASS || null,
    database: 'airbrbRes'
});

connection.connect((err) => {
    if (err) {
        console.error('database failed', err)
    } else {
        console.log('database success!')
    }
})

module.exports = connection;