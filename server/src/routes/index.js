const home = require('./Home/home');

const swiper = require('./Home/swiper');

const msgBoard = require('./Home/msgBoard'),
    msgBoardGetInfo = require('./Home/msgBoardGetInfo');

const article = require('./Article/article'),
    articleInit = require('./Article/articleInit'),
    articleComment = require('./Article/articleComment')

const timeAxisInfo = require('./TimeAxis/timeAxisInfo');

const login = require('./Login/login');

const admin = require('./Admin/admin');

const upload = require('./upload');

const classifyList = require('./Classify/classifyList'),
    classifyArticle = require('./Classify/classifyArticle');

const articleSearch = require("./Search/articleSearch");

module.exports = (api, app) => {
    app.use(api + '/home', home)

    app.use(api + '/swiper', swiper)

    app.use(api + '/msgBoard', msgBoard)
    app.use(api + '/msgBoard', msgBoardGetInfo)

    app.use(api + '/article', article)
    app.use(api + '/article', articleInit)
    app.use(api + '/article', articleComment)

    app.use(api + '/timeAxis', timeAxisInfo)

    app.use(api + '/logApi', login)

    app.use(api + '/admin', admin)

    app.use(api + '/files', upload)

    app.use(api + '/classify', classifyList)
    app.use(api + '/classify', classifyArticle)

    app.use(api + "/search", articleSearch)
}