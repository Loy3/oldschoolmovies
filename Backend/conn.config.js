const mysql = require('mysql');
const conn = mysql.createConnection({

    host: 'localhost',
    password: '', 
    user:'root', 
    database: 'oldschool'
});

conn.connect((err) => {
    if(err) throw err;
    console.log('Database connected!!');
});

module.exports = { conn };

