const express = require('express');
const router = express.Router();
const db = require('../../config/db');

router.post('/getArticle', (req, res) => {
    const params = req.body;
    const sql = `
    SELECT a.title, a.author, a.ctime, a.info, a.img, a.read_num, c.category, u.name, u.avatar,
        (SELECT title FROM article WHERE id < a.id ORDER BY id DESC LIMIT 1) AS prev_title,
        (SELECT img FROM article WHERE id < a.id ORDER BY id DESC LIMIT 1) AS prev_img,
        (SELECT id FROM article WHERE id < a.id ORDER BY id DESC LIMIT 1) AS prev_id,
        (SELECT title FROM article WHERE id > a.id ORDER BY id ASC LIMIT 1) AS next_title,
        (SELECT img FROM article WHERE id > a.id ORDER BY id ASC LIMIT 1) AS next_img,
        (SELECT id FROM article WHERE id > a.id ORDER BY id ASC LIMIT 1) AS next_id
        FROM article AS a
        JOIN article_category AS c ON a.category_id = c.id
        JOIN userinfo AS u ON a.author_id = u.id
        WHERE a.id = ?;`;

    db.query(sql, [params.id], (err, data) => {
        if (err) return console.log(err.message);

        res.json(data)
    })
})

module.exports = router;