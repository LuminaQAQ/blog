const express = require('express');

const router = express.Router();
const db = require('../../config/db');


router.post('/getTimeAxisInfo', (req, res) => {
    const getSql = `SELECT * FROM article LIMIT 5;`;
    db.query(getSql, (err, data) => {
        if (err) return console.log(err.message);

        res.json(data);
    })
})

module.exports = router;