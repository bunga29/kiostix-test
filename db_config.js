const mysql = require('mysql');

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "tes_kiostix"
});

db.connect(function(error){
    if(error){
        console.error(error);
    } else {
        console.info("Connected to Database");
    }
});

module.exports = db;