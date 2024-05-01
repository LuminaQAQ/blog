const express = require('express');
const router = express.Router();
const db = require('../../config/db');


const jwt = require('jsonwebtoken');
const { expressjwt: expressjwt } = require("express-jwt");
const loginAPI = ["/api/logApi/login", "/api/logApi/register", "/api/logApi/forgetVerify"];
router.use(expressjwt({ secret: 'Lumina', algorithms: ["HS256"] }).unless({ path: loginAPI }));
let tokenStr = '';

function GetToday() {
    const date = new Date();

    function TimeFormat(time) {
        return Number(time) <= 9 ? '0' + time : time;
    }

    return date.getFullYear() + '-' + TimeFormat(date.getMonth() + 1) + '-' + TimeFormat(date.getDate())
}

// #region 验证
const emailVerifySql = 'select * from userinfo where email = ?';
const phoneVerifySql = 'select * from userinfo where phone = ?';

function RegisterVerify(sql, paramsArr, msg) {
    let p = new Promise((resolve, reject) => {
        db.query(sql, paramsArr, (err, data) => {
            if (err) reject({ status: 0, msg: 'fail' });

            if (data.length !== 0) reject(msg)

            resolve({ status: 1, msg: 'success' });
        })
    });

    return p;
}

function ForgetVerify(sql, paramsArr, msg) {
    let p = new Promise((resolve, reject) => {
        db.query(sql, paramsArr, (err, data) => {
            if (err) reject({ status: 0, msg: 'fail' });

            if (data.length == 0) reject(msg)

            resolve({ status: 1, msg: 'success' });
        })
    });

    return p;
}
// #endregion


// #region 登陆
router.post('/login', (req, res) => {
    const params = req.body.values;
    const sql = `select name, email, avatar, type, brief from userinfo where email = ? and pwd = ?`;


    db.query(sql, [params.loginEmail, params.password], (err, data) => {
        if (err) return res.json({ status: 0, msg: 'db-fail' });
        if (data.length == 0) return res.json({ message: '未注册' });

        const loginTime = 'UPDATE userinfo SET ltime = ?';
        db.query(loginTime, [GetToday()], (err, data) => {
            if (err) return res.json({ status: 0, msg: 'fail' });

            tokenStr = 'Bearer ' + jwt.sign({ username: params.loginEmail }, 'Lumina', { expiresIn: '48h' });
            return res.json({
                status: 1,
                message: '登录成功',
                token: tokenStr,
                info: data
            })
        });
    });
});


router.post('/getLoginInfo', (req, res) => {
    let clientToken = req.headers.authorization || '';


    jwt.verify(clientToken.replace('Bearer ', ''), 'Lumina', (error, data) => {
        if (error) return res.json({ status: 0, info: 'token验证失败' });
        const sql = `
            SELECT 
                u.id, u.name, u.email, u.phone, u.ctime, u.ltime, u.avatar, u.type, u.brief
            FROM userinfo AS u 
            WHERE email = ?
        `;

        db.query(sql, [data.username], (err, deepData) => {
            if (err) return res.json({ status: 0, info: 'token验证失败' });

            return res.status(200).json({ message: '成功!', info: deepData[0] })
        })
    });
});


router.all('/verify', (req, res) => {
    let clientToken = req.body.headers.JWT_TOKEN || '';

    jwt.verify(clientToken.replace('Bearer ', ''), 'Lumina', (error, data) => {
        if (error) return res.json({ status: 0, data: 'token验证失败' });
        else return res.json({ status: 1, message: '成功!' })
    });
})
// #endregion


// #region 注册

router.post('/register', (req, res) => {
    const params = req.body.values;

    // #region 正则
    const emailReg = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
    const phoneReg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
    const psdReg = /^[a-zA-Z]\w{5,17}$/;
    const usernameReg = /[A-Za-z0-9_\-\u4e00-\u9fa5]+/;

    for (
        let i = 0, arr, paramsArr;
        arr = [emailReg, phoneReg, psdReg, usernameReg][i],
        paramsArr = [params.registerEmail, params.registerPhone, params.registerPsd, params.registerUsername][i++];
    ) {

        if (!arr.test(paramsArr)) return res.json({ msg: '注册信息格式不合法' });
    }
    // #endregion

    // #region 是否被注册
    Promise
        .all([
            RegisterVerify(emailVerifySql, [params.registerEmail], { status: 0, msg: '邮箱已被使用' }),
            RegisterVerify(phoneVerifySql, [params.registerPhone], { status: 0, msg: '手机号已被使用' })
        ]).then(result => {
            const insertSql = 'INSERT INTO userinfo(`name`, pwd, email, phone, ctime) VALUES(?, ?, ?, ?, ?)';

            db.query(insertSql, [params.registerUsername, params.registerPsd, params.registerEmail, params.registerPhone, GetToday()], (err, data) => {
                if (err) return res.json({ status: 0, msg: err.message });

                return res.json({
                    status: 1,
                    message: '注册成功',
                })
            });
        })
        .catch((err) => {
            // console.log(err);
            res.json(err);
        })


    // #endregion
});
// #endregion


// #region 忘记密码
router.post('/forgetVerify', (req, res) => {
    const params = req.body.values;

    Promise
        .all([
            ForgetVerify(emailVerifySql, [params.forgetEmail], { status: 0, msg: '邮箱不存在' }),
            ForgetVerify(phoneVerifySql, [params.forgetPhone], { status: 0, msg: '手机号不存在' })
        ])
        .then(result => {
            if ((params.newPsd && params.comfirmPsd) && params.newPsd == params.comfirmPsd) {
                const sql = 'UPDATE userinfo SET pwd = ? WHERE email = ? AND phone = ?';

                db.query(sql, [params.newPsd, params.forgetEmail, params.forgetPhone], (err, data) => {
                    if (err) return res.json({ status: 0, msg: err });

                    return res.json({
                        status: 1,
                        message: '修改成功',
                    })
                })

            } else {
                return res.json({
                    status: 1,
                    message: '验证成功',
                })
            }
        })
        .catch((err) => {
            return res.json(err);
        })
});

// #endregion

router.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        return res.json({
            status: 401,
            message: '无效的token'
        })
    }

    res.json({
        status: 500,
        message: '未知的错误'
    })

    next();
})




module.exports = router;