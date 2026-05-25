const express = require("express");
const router = express.Router();
const db = require("../db");


// ======================
// CREATE (POST)
// ======================
router.post("/", (req, res) => {
    const { titulo, descricao, empresa, categoria } = req.body;

    const sql = `
        INSERT INTO oportunidades (titulo, descricao, empresa, categoria)
        VALUES (?, ?, ?, ?)
    `;

    db.query(sql, [titulo, descricao, empresa, categoria], (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: "Criado com sucesso",
            id: result.insertId
        });
    });
});


// ======================
// READ (GET)
// ======================
router.get("/", (req, res) => {
    db.query("SELECT * FROM oportunidades", (err, results) => {
        if (err) {
            return res.status(500).json(err);
        }

        res.json(results);
    });
});


// ======================
// DELETE
// ======================
router.delete("/:id", (req, res) => {
    const { id } = req.params;

    db.query(
        "DELETE FROM oportunidades WHERE id = ?",
        [id],
        (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }

            res.json({ message: "Removido com sucesso" });
        }
    );
});


// ======================
// UPDATE
// ======================
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { titulo, descricao, empresa, categoria } = req.body;

    const sql = `
        UPDATE oportunidades
        SET titulo = ?, descricao = ?, empresa = ?, categoria = ?
        WHERE id = ?
    `;

    db.query(sql, [titulo, descricao, empresa, categoria, id], (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        res.json({ message: "Atualizado com sucesso" });
    });
});


module.exports = router;
