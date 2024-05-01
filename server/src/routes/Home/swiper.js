const express = require('express');

const router = express.Router();
const db = require('../../config/db');


router.post('/getSwiperInfo', (req, res) => {
    const getSql = `select * from swiper`;

    db.query(getSql, (err, data) => {
        if (err) return console.log(err.message);

        res.json(data);
    })
})

module.exports = router;