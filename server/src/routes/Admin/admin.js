const express = require('express');
const fs = require('fs');
const path = require("path");

const router = express.Router();
const db = require('../../config/db');

const jwt = require('jsonwebtoken');
const { expressjwt: expressjwt } = require("express-jwt");
const API = ["/api/admin/login"];
router.use(expressjwt({ secret: 'Lumina', algorithms: ["HS256"] }).unless({ path: API }));
let tokenStr = '';

function verifyCode() {
    const option = [];

    for (let i = 0; i < 4; i++) {
        const rotate = parseInt(Math.random() * 100 - 50);
        const color = "hsb(" + Math.random() + ", 1, 1)";
        const num = parseInt(Math.random() * 10);

        option.push({ i, rotate, color, num })
    }

    return option;
}

function verifyToken(req, res, next) {
    const auth = req.headers.authorization;
    if (auth) {
        const token = auth.split(' ')[1];
        const secretKey = 'Lumina';

        jwt.verify(token, secretKey, (err, data) => {
            if (err) res.status(403).json({ error: '无效的 token' });

            req.username = data.username;
            next();
        });
    } else {
        res.status(401).json({ error: '未提供 token' });
    }
}

function getToday() {
    const date = new Date();

    function TimeFormat(time) {
        return Number(time) <= 9 ? '0' + time : time;
    }

    return date.getFullYear() + '-' + TimeFormat(date.getMonth() + 1) + '-' + TimeFormat(date.getDate())
}

function GetDate() {
    const date = new Date();

    return date.getFullYear() + '' + date.getMonth() + '' + date.getDate() + '' + date.getDay() + '' + date.getHours() + '' + date.getMinutes() + '' + date.getSeconds() + '' + date.getMilliseconds()

}

// -------  -------
// #region
router.post('/getBlogInfo', verifyToken, (req, res) => {
    const sql = `
    SELECT 
	    (SELECT COUNT(*) FROM article) AS article_count,
	    (SELECT COUNT(*) FROM userinfo) AS userinfo_count,
	    (SELECT COUNT(*) FROM comment) AS comment_count;`
        ;

    db.query(sql, (err, data) => {
        if (err) return res.status(500).json({ error: '无法获取管理员信息' });

        return res.status(200).json(data[0])
    })
});
// #endregion
// ------- end -------

// ------- 登陆及验证 -------
// #region
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const sql = `SELECT * FROM admin WHERE email = ? AND password = ?;`;

    db.query(sql, [username, password], (err, data) => {
        if (err) return res.status(500).json({ error: '无法验证管理员登录' });

        if (data.length > 0) {
            tokenStr = 'Bearer ' + jwt.sign({ username }, 'Lumina', { expiresIn: '48h' });

            res.status(200).json({ token: tokenStr, username: data[0].username });
        } else {
            res.status(401).json({ msg: "用户名或密码错误!" });
        }
    });
});


router.post('/getLoginInfo', verifyToken, (req, res) => {
    const sql = `SELECT username FROM admin WHERE email = ?;`;

    db.query(sql, [req.username], (err, data) => {
        if (err) return res.status(500).json({ error: '无法获取管理员信息' });

        return res.status(200).json({ info: data[0] })
    })
});
// #endregion
// ------- end -------

// ------- 用户管理 -------
// #region
router.get('/getUserInfoList', verifyToken, (req, res) => {
    const { index, size } = req.query;

    const sql = `
        SELECT *
        FROM userinfo
        LIMIT ?, ?;
    `;

    db.query(sql, [Number(index), Number(size)], (err, data) => {
        if (err) return res.status(500).json({ error: '无法获取用户列表' });

        return res.status(200).json(data)
    })
});

router.post('/updUser', verifyToken, (req, res) => {
    const email = req.body.email;
    const { name, brief, phone, pwd } = req.body.info;

    const sql = `
        UPDATE userinfo 
        SET pwd = ?, name = ?, brief = ?, phone = ? 
        WHERE email = ?;
    `;

    db.query(sql, [pwd, name, brief, phone, email], (err, data) => {
        if (err) return res.status(500).json({ error: '无法获取用户列表' });

        return res.status(200).json("修改成功!");
    })
});

router.post('/insertUser', verifyToken, (req, res) => {
    const { name, email, phone, pwd } = req.body.info;
    const time = getToday();

    const sql = `
        INSERT INTO userinfo (name, pwd, email, phone, ctime) 
        VALUES (?, ?, ?, ?, ?);
    `;

    db.query(sql, [name, pwd, email, phone, time], (err, data) => {
        if (err) return res.status(500).json({ error: '无法获取用户列表' });

        return res.status(200).json("添加成功!");
    })
});

router.post('/delUser', verifyToken, (req, res) => {
    const { email } = req.body;

    const sql = `
        DELETE FROM userinfo WHERE email = ?;
    `;

    db.query(sql, [email], (err, data) => {
        if (err) return res.status(500).json({ error: '无法获取用户列表' });

        return res.status(200).json("删除成功!");
    })
});
// #endregion
// ------- end -------

// ------- 文章管理 -------
// #region
router.get('/getArticleInfoList', verifyToken, (req, res) => {
    const { index, size } = req.query;

    const sql = `
        SELECT *, (SELECT COUNT(*) FROM article) AS article_count
        FROM article
        ORDER BY id
        LIMIT ?, ?;
    `;

    db.query(sql, [Number(index), Number(size)], (err, data) => {
        if (err) return res.status(500).json({ error: '无法获取用户列表' });

        return res.status(200).json(data)
    })
});

router.post('/delArticle', verifyToken, (req, res) => {
    const { id } = req.body;

    const sql = `
        DELETE FROM article WHERE id = ?;
    `;

    db.query(sql, [id], (err, data) => {
        if (err) return res.status(500).json({ error: '无法获取文章列表' });

        return res.status(200).json("删除成功!");
    })
});
// #endregion
// ------- end -------

// ------- 评论管理 -------
// #region
router.get('/getCommentInfoList', verifyToken, (req, res) => {
    const { index, size } = req.query;

    const sql = `
        SELECT c.*, (SELECT COUNT(*) FROM comment) AS comment_count, a.title
        FROM comment AS c
		LEFT JOIN article AS a ON a.id = c.article_id
        ORDER BY c.id
        LIMIT ?, ?;
    `;

    db.query(sql, [Number(index), Number(size)], (err, data) => {
        if (err) return res.status(500).json({ error: '无法获取用户列表' });

        return res.status(200).json(data)
    })
});


router.post('/updComment', verifyToken, (req, res) => {
    const { text, id } = req.body.info;

    const sql = `
        UPDATE comment 
        SET text = ?
        WHERE id = ?;
    `;

    db.query(sql, [text, id], (err, data) => {
        if (err) return res.status(500).json({ error: '无法获取评论列表' });

        return res.status(200).json("修改成功!");
    })
});

router.post('/delComment', verifyToken, (req, res) => {
    const { id } = req.body;

    const sql = `
        DELETE FROM comment WHERE id = ?;
    `;

    db.query(sql, [id], (err, data) => {
        if (err) return res.status(500).json({ error: '无法获取用户列表' });

        return res.status(200).json("删除成功!");
    })
});
// #endregion
// ------- end -------

// ------- 留言板管理 -------
// #region
router.get('/getMsgBoardInfoList', verifyToken, (req, res) => {
    const { index, size } = req.query;

    const sql = `
        SELECT *, (SELECT COUNT(*) FROM msgboard) AS msgboard_count
        FROM msgboard
        ORDER BY id
        LIMIT ?, ?;
    `;

    db.query(sql, [Number(index), Number(size)], (err, data) => {
        if (err) return res.status(500).json({ error: '无法获取留言列表' });

        return res.status(200).json(data)
    })
});


router.post('/insertMsgBoard', verifyToken, (req, res) => {
    const { text } = req.body.info;
    const { name } = req.body;

    const time = getToday();

    const sql = `
        INSERT INTO msgboard (user, text, ctime) 
        VALUES (?, ?, ?);
    `;

    db.query(sql, [name, text, time], (err, data) => {
        if (err) return res.status(500).json({ error: '无法获取用户列表' });

        return res.status(200).json("添加成功!");
    })
});


router.post('/updMsgBoard', verifyToken, (req, res) => {
    const { text, id } = req.body.info;

    const sql = `
        UPDATE MsgBoard 
        SET text = ?
        WHERE id = ?;
    `;

    db.query(sql, [text, id], (err, data) => {
        if (err) return res.status(500).json({ error: '无法获取评论列表' });

        return res.status(200).json("修改成功!");
    })
});

router.post('/delMsgBoard', verifyToken, (req, res) => {
    const { id } = req.body;

    const sql = `
        DELETE FROM msgboard WHERE id = ?;
    `;

    db.query(sql, [id], (err, data) => {
        if (err) return res.status(500).json({ error: '无法获取用户列表' });

        return res.status(200).json("删除成功!");
    })
});
// #endregion
// ------- end -------


// ------- 轮播管理 -------
// #region
router.get('/getSwiperInfoList', verifyToken, (req, res) => {
    const { index, size } = req.query;

    const sql = `
        SELECT *, (SELECT COUNT(*) FROM swiper) AS swiper_count
        FROM swiper
        ORDER BY id
        LIMIT ?, ?;
    `;

    db.query(sql, [Number(index), Number(size)], (err, data) => {
        if (err) return res.status(500).json({ error: '无法获取轮播列表' });

        return res.status(200).json(data)
    })
});

router.post('/updSwiper', verifyToken, function (req, res, next) {
    fs.readFile(req.files[0].path, function (err, data) {
        if (err) {
            return res.json('Error');
        } else {
            const { id, banner } = req.body;

            const newFileName = GetDate() + path.parse(req.files[0].originalname).ext;
            var ufile = path.join(__dirname, '../../public/image/Home/banner/', newFileName);
            const fileNetPath = 'http://127.0.0.1:8888/image/Home/banner/' + newFileName;

            const updateSql = `UPDATE swiper SET name = ? WHERE id = ?`;

            db.query(updateSql, [fileNetPath, id], (err, dbData) => {
                if (err) return res.json({ status: 0, msg: 'fail' })


                const oldFilePath = path.join(__dirname, '../../public/image/Home/banner/', path.basename(banner));

                fs.unlink(oldFilePath, (err) => {
                    if (err) return res.json({ status: 0, msg: 'fail' });
                });

                fs.writeFile(ufile, data, function (err) {
                    if (err) return res.json({ status: 0, msg: 'fail' });

                    return res.json({ status: 1, msg: 'success' });
                })
            })
        }
    });
});

router.post('/insertSwiper', verifyToken, function (req, res, next) {
    fs.readFile(req.files[0].path, function (err, data) {
        if (err) {
            return res.json('Error');
        } else {
            const newFileName = GetDate() + path.parse(req.files[0].originalname).ext;
            var ufile = path.join(__dirname, '../../public/image/Home/banner/', newFileName);
            const fileNetPath = 'http://127.0.0.1:8888/image/Home/banner/' + newFileName;

            const updateSql = `INSERT INTO swiper(name) VALUES(?)`;

            db.query(updateSql, [fileNetPath], (err, dbData) => {
                if (err) return res.json({ status: 0, msg: 'fail' });


                fs.writeFile(ufile, data, function (err) {
                    if (err) return res.json({ status: 0, msg: 'fail' });

                    return res.json({ status: 1, msg: 'success' });
                })
            })
        }
    });
});

router.post('/delSwiper', verifyToken, (req, res) => {
    const { id } = req.body;

    const sql = `
        DELETE FROM swiper WHERE id = ?;
    `;

    db.query(sql, [id], (err, data) => {
        if (err) return res.status(500).json({ error: '无法获取用户列表' });

        return res.status(200).json("删除成功!");
    })
});
// #endregion
// ------- end -------

// ------- 文章发布 -------
// #region
router.get('/getCategories', verifyToken, (req, res) => {
    const sql = `
        SELECT * FROM article_category
    `;

    db.query(sql, (err, data) => {
        if (err) return res.status(500).json({ error: '无法获取分类列表' });

        return res.status(200).json(data);
    })
});

router.post('/articlePublic', verifyToken, (req, res) => {

    fs.readFile(req.files[0].path, function (err, data) {
        if (err) {
            return res.json('Error');
        } else {
            const { title, author, author_id, content, category } = req.body;
            const ctime = getToday();


            const newFileName = GetDate() + path.parse(req.files[0].originalname).ext;
            var ufile = path.join(__dirname, '../../public/image/article/', newFileName);
            const fileNetPath = 'http://127.0.0.1:8888/image/article/' + newFileName;

            const sql = `
                INSERT INTO article(title, author, info, ctime, img, category_id, author_id) 
                VALUES(?, ?, ?, ?, ?, ?, ?)
            `;

            db.query(sql, [title, author, content, ctime, fileNetPath, category, author_id], (err, dbData) => {
                if (err) return res.json({ status: 0, msg: 'fail' })

                fs.writeFile(ufile, data, function (err) {
                    if (err) return res.json({ status: 0, msg: 'fail' });

                    return res.json({ status: 1, msg: 'success' });
                })
            })
        }
    });
});
// #endregion
// ------- end -------

module.exports = router;