const mysql = require('mysql');


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: null,
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