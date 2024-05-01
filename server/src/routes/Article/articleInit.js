const express = require('express');

const router = express.Router();
const db = require('../../config/db');

router.post('/initArticle', (req, res) => {
    const sql = `SELECT * FROM article LIMIT ?, 5`;
    const lenSql = `SELECT count(*) FROM article`;
    const params = req.body;

    let allData = [];
    db.query(sql, [(params.index - 1) * 5 || 0], (err, data) => {
        if (err) return console.log(err.message);

        allData.push(data)
    })

    db.query(lenSql, (err, data) => {
        if (err) return console.log(err.message);

        allData.push(data[0]['count(*)']);
        res.json(allData)
    })


})

module.exports = router;