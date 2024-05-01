const mysql = require('mysql');

const db = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "",
    database: "blog_project"
});

db.connect((err) => {
    if (err) return err.message;

    console.log('db ok!');
})

module.exports = db;