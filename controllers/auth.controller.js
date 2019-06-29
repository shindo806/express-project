var db = require('../db');
var users = db.get('users');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
var db = low(adapter);
var md5 = require('md5');

module.exports.login = function (req, res) {
    res.render('./auth/login');
};

module.exports.postLogin = function (req, res) {
    var email = req.body.email;
    var password = req.body.password;
    var hashPass = md5(password);
    var userEmail = users.find({
        email: email
    }).value();
    var userName = users.find({
        name: email
    }).value();

    if (!userEmail && userName === undefined) {
        res.render('./auth/login', {
            errors: errors = ['Người dùng không tồn tại'],
            values: values = req.body
        })
        return;
    }
    if (userEmail === undefined && !userName) {
        res.render('./auth/login', {
            errors: errors = ['Người dùng không tồn tại'],
            values: values = req.body
        })
        return;
    }
    // Check login status by email or user name
    if (userName === undefined) {
        if (userEmail.password !== hashPass) {
            res.render('./auth/login', {
                errors: errors = ['Mật khẩu không đúng'],
                values: values = req.body
            })
        }
    }
    if (userEmail === undefined) {
        if (userName.password !== hashPass) {
            res.render('./auth/login', {
                errors: errors = ['Mật khẩu không đúng'],
                values: values = req.body
            })
        }
    }
    if (userName === undefined) {
        if (userEmail.password === hashPass) {
            res.cookie('userID', userEmail.id, {
                signed: true
            });
            res.redirect('/');
            return;
        }
    }
    if (userEmail === undefined) {
        if (userName.password === hashPass) {
            res.cookie('userID', userName.id, {
                signed: true
            });
            res.redirect('/');
            return;
        }
    }
}