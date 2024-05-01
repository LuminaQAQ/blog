const express = require('express');

const router = express.Router();
const db = require('../../config/db');

router.get('/getMsgBoard', (req, res) => {
    db.query('select * from msgboard', (err, data) => {
        if (err) return console.log(err.message);

        res.json(data);
    })
})

module.exports = router;