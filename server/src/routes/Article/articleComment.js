const express = require('express');

const router = express.Router();
const db = require('../../config/db');

function GetToday() {
    const date = new Date();

    function TimeFormat(time) {
        return Number(time) <= 9 ? '0' + time : time;
    }

    return date.getFullYear() + '-' + TimeFormat(date.getMonth() + 1) + '-' + TimeFormat(date.getDate())
}

router.post('/getComments', (req, res) => {
    const sql = `
    SELECT c.id, c.timeStamp, c.text, u.name, u.avatar, u.id AS u_id, COUNT(cl.id) AS like_count,
    CASE WHEN cl.user_id = ? THEN 1 ELSE 0 END AS isUserLike
    FROM comment AS c
    LEFT JOIN userinfo AS u ON c.user_id = u.id
    LEFT JOIN comment_likes cl ON c.id = cl.comment_id
    WHERE c.article_id = ? 
    GROUP BY c.id, c.timeStamp, c.text, u.name, u.avatar, u.id;`;

    const unloginSql = `
    SELECT c.id, c.timeStamp, c.text, u.name, u.avatar, COUNT(cl.id) AS like_count
    FROM comment AS c
    LEFT JOIN userinfo AS u ON c.user_id = u.id
    LEFT JOIN comment_likes cl ON c.id = cl.comment_id
    WHERE c.article_id = ?
    GROUP BY c.id, c.text;`;

    const configs = [];
    let excuteSql = ``;

    const params = req.body;
    const a_id = Number(params.a_id);
    const u_id = Number(params.u_id);

    if (typeof u_id === "undefined" || u_id == '' || isNaN(u_id)) {
        configs.push(a_id);
        excuteSql = unloginSql;
    } else {
        configs.push(u_id);
        configs.push(a_id);
        excuteSql = sql;
    }


    db.query(excuteSql, configs, (err, data) => {
        if (err) return console.log(err);

        return res.status(200).json(data);
    })
})

router.post('/likeComments', (req, res) => {
    const updSql = `INSERT INTO comment_likes (user_id, article_id, comment_id) VALUES (?, ?, ?);`;
    const delSql = `DELETE FROM comment_likes WHERE user_id = ? AND article_id = ? AND comment_id = ?;`;

    const params = req.body;
    const u_id = params.u_id;
    const a_id = params.a_id;
    const c_id = params.c_id;

    const sql = params.isLike ? updSql : delSql;

    db.query(sql, [u_id, a_id, c_id], (err, data) => {
        if (err) return console.log(err);

        return res.status(200).json({ msg: "成功!" });
    })

})

router.post('/publishComments', (req, res) => {
    const sql = `INSERT INTO comment(timeStamp, text, user_id, article_id) VALUES(?, ?, ?, ?);`;

    const params = req.body;
    const u_id = params.u_id;
    const a_id = params.a_id;
    const text = params.val;
    const time = GetToday();

    console.log([time, text, u_id, a_id]);

    db.query(sql, [time, text, u_id, a_id], (err, data) => {
        if (err) return console.log(err);

        return res.status(200).json({ msg: "成功!" });
    })

})

router.post('/getLoginInfo', (req, res) => {
    let clientToken = req.headers.authorization || '';


    jwt.verify(clientToken.replace('Bearer ', ''), 'Lumina', (error, data) => {
        const sql = `
            SELECT 
                u.id, u.name, u.email, u.phone, u.ctime, u.ltime, u.avatar, u.type, u.article, u.comment, u.classify 
            FROM userinfo AS u 
            WHERE email = ?
        `;

        db.query(sql, [data.username], (err, data) => {
            if (error) return res.json({ status: 0, data: 'token验证失败' });

            return res.status(200).json({ message: '成功!', info: data[0] })
        })
    });
});

module.exports = router;