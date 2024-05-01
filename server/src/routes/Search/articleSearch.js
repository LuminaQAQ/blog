const express = require('express');

const router = express.Router();
const db = require('../../config/db');

router.post('/searchArticle', (req, res) => {
    const sql = `SELECT title, info, img, id FROM article WHERE title LIKE ?`;
    const keywords = '%' + req.body.keywords + '%';


    db.query(sql, [keywords], (err, data) => {
        if (err) return console.log(err.message);

        res.json(data)
    })


})

module.exports = router;