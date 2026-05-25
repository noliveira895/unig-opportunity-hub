const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "dev",
    password: "Dev@1234",
    database: "unig_hub"
});

connection.connect((err) => {
    if (err) {
        console.log("Erro ao conectar:", err);
    } else {
        console.log("Conectado ao MySQL!");
    }
});

module.exports = connection;
