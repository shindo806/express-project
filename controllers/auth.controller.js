var db = require('../db');
var users = db.get('users');
const shortid = require('shortid');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
var db = low(adapter);

module.exports.login = function (req, res) {
    res.render('./auth/login');
};

module.exports.postLogin = function (req, res) {
    var email = req.body.email;
    var password = req.body.password;

    var userEmail = users.find({
        email: email
    }).value();
    var userName = users.find({
        name: email
    }).value();

    if (!userEmail) {

    }




    if (!userEmail && !userName) {
        res.render('./auth/login', {
            errors: errors = ['Người dùng không tồn tại'],
            values: values = req.body
        })
        console.log(userEmail.password);
    } else if (userEmail.password !== password || userName.password !== password) {
        res.render('./auth/login', {
            errors: errors = ['Mật khẩu không đúng'],
            values: values = req.body
        })

    } else if (userEmail.password === password) {
        res.cookie('userId', userEmail.id);
        res.redirect('./users');
    } else if (userName.password === password) {
        res.cookie('userId', userName.id);
        res.redirect('./users');
    }

}