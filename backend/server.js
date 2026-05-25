const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors()); // <- ESSENCIAL
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API FUNCIONANDO");
});

const oportunidades = require("./routes/oportunidades");
app.use("/oportunidades", oportunidades);

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});

