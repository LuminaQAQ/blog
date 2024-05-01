const express = require('express');

const router = express.Router();
const db = require('../../config/db');

router.post('/classifyList', (req, res) => {
    const sql =
        `
    SELECT ac.category, COUNT(a.id) as article_count
        FROM article_category ac
        LEFT JOIN article a ON ac.id = a.category_id
        GROUP BY ac.category;
    `

    db.query(sql, (err, data) => {
        if (err) return console.log(err.message);

        res.json(data);
    })
})

module.exports = router;