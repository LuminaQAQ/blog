const express = require('express');

const router = express.Router();
const db = require('../../config/db');

router.post('/classifyArticle', (req, res) => {
    const sql =
        `
SELECT a.title, a.ctime, a.img, a.id
FROM article_category ac
JOIN article a ON ac.id = a.category_id
WHERE ac.category = ?
LIMIT ?,5;
    `;
    const classify = req.body.name || '';
    const page = req.body.page * 5 || 0;

    db.query(sql, [classify, page], (err, data) => {
        if (err) return console.log(err.message);

        res.json(data);
    })
})

module.exports = router;