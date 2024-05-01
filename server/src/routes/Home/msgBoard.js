const express = require('express');

const router = express.Router();
const db = require('../../config/db');

router.post('/insertInfo', (req, res) => {
    let params = req.body;
    let sql = 'insert into `msgboard`(`text`, `ctime`, `user`) values(?, ?, ?)'
    db.query(sql, [params.text, params.ctime, params.user], (err, data) => {
        if (err) return console.log(err.message);

        res.json(data);
    })
})

module.exports = router;