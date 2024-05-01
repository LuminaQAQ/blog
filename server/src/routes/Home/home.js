const express = require('express');

const router = express.Router();
const db = require('../../config/db');


router.post('/login', (req, res) => {
    db.query('select * from userinfo', (err, data) => {
        if (err) return console.log(err.message);

        res.json(data);
    })
})
// =======================================


router.get('/getBlogInfo', (req, res) => {
    const sql = `
    SELECT 
        u.id,
        u.name, 
        u.avatar, 
        u.brief, 
        COUNT(DISTINCT a.id) AS article_count, 
        COUNT(DISTINCT c.id) AS comment_count, 
        COUNT(DISTINCT ac.id) AS category_count
    FROM 
        userinfo u
    LEFT JOIN 
        article a ON u.id = a.author_id
    LEFT JOIN 
        comment c ON u.id = c.user_id
    LEFT JOIN 
        article_category ac ON a.id = ac.id
    WHERE 
        u.id = 1
    GROUP BY 
        u.id, u.name, u.avatar, u.brief;
    `;

    db.query(sql, (err, data) => {
        if (err) return console.log(err.message);

        res.status(200).json(data[0]);
    })
})


router.post('/classify', (req, res) => {
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