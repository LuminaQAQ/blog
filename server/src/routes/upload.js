
const express = require('express');

const router = express.Router();
const db = require('../config/db');

const fs = require('fs');
const path = require("path");

function GetDate() {
    const date = new Date();

    return date.getFullYear() + '' + date.getMonth() + '' + date.getDate() + '' + date.getDay() + '' + date.getHours() + '' + date.getMinutes() + '' + date.getSeconds() + '' + date.getMilliseconds()

}


router.post('/userHeader', function (req, res, next) {

    fs.readFile(req.files[0].path, function (err, data) {
        if (err) {
            return res.json('Error');
        } else {

            const newFileName = GetDate() + path.parse(req.files[0].originalname).ext;
            var ufile = path.join(__dirname, '../public/image/userinfo/upload', newFileName);
            const fileNetPath = 'http://127.0.0.1:8888/image/userinfo/upload/' + newFileName;

            const updateSql = `UPDATE userinfo SET avatar = '${fileNetPath}' WHERE email = '${req.body.user}'`;

            db.query(updateSql, (err, dbData) => {
                if (err) return res.json({ status: 0, msg: 'fail' })
                
                const oldFilePath = path.join(__dirname, '../public/image/userinfo/upload', path.basename(req.body.avatar));
                fs.unlink(oldFilePath, (err) => {
                    if (err) res.json({ status: 0, msg: 'fail' });
                });

                fs.writeFile(ufile, data, function (err) {
                    if (err) res.json({ status: 0, msg: 'fail' });

                    return res.json({ status: 1, msg: 'success' });
                })
            })
        }
    });
});


router.get('/download', function (req, res, next) {
    const email = req.query.user;

    const sql = `select * from userinfo where email = ?`;

    db.query(sql, [email], (err, dbData) => {
        if (err) return res.json({ status: 0, msg: 'fail' })

        const fileName = dbData[0].avatar.split('http://127.0.0.1:8888').pop();
        const filePath = path.join(__dirname, '../', '/public', fileName);
        const fileExt = dbData[0].avatar.split('/').pop();

        const downloadFileName = dbData[0].name + path.parse(fileExt).ext;


        return res.download(filePath, downloadFileName);
    })
});

module.exports = router;