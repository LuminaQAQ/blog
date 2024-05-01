const express = require('express');

const router = express.Router();
const db = require('./db');


router.post('/personalInfo', (req, res) => {
    db.query('select * from userinfo', (err, data) => {
        if (err) return console.log(err.message);

        res.json(data);
    })
})

module.exports = router;