var db = require('../db');
var users = db.get('users').value();
const shortid = require('shortid');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
var db = low(adapter);



module.exports.index = function (req, res) {
    res.render("users/users.pug", {
        users: users
    })
};

module.exports.search = function (req, res) {
    var q = req.query.q.toLowerCase();
    var matchedUsers = users.filter(function (user) {
        if (user.name.toLowerCase().indexOf(q) !== -1) {
            return user.name;
        }
    });
    res.render('users/users.pug', {
        users: matchedUsers
    });
};

module.exports.create = function (req, res) {
    console.log(req.cookies);
    res.render('./users/create.pug'); // have to use ./ to access sub folder
};

module.exports.id = function (req, res) {
    var id = req.params.id;
    var user = db.get('users').find({
        id: id
    }).value();
    res.render('./users/view.pug', {
        user: user
    })
};

module.exports.postCreate = function (req, res) {
    req.body.id = shortid.generate();
    db.get('users').push(req.body).write();
    res.redirect('/users');
};

module.exports.delete = function (req, res) {
    var id = req.params.id;
    db.get('users').remove({
        id: id
    }).write();
    res.redirect('/users');
}