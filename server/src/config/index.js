const personalInfo = require('./personalInfo')

module.exports = app => {
    app.use('/lib', personalInfo)
}