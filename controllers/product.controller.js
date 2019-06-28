var bodyParse = require('body-parser');
var shortid = require('shortid');


var db = require('../db');
var products = db.get('products').value();

module.exports.index = function (req, res) {
    res.render('products/products.pug', {
        products: products
    });
};

module.exports.create = function (req, res) {
    res.render('./products/createproduct.pug')
};

module.exports.search = function (req, res) {
    var q = req.query.q.toLowerCase();
    var matchedProducts = products.filter(function (product) {
        if (product.name.toLowerCase().indexOf(q) !== -1) {
            return product.name;
        } else if (q === -1) {
            matchedProducts = products
        }
    });
    res.render('./products/search.pug', {
        product: matchedProducts
    })
};

module.exports.id = function (req, res) {
    var id = req.params.id;
    var matchedId = db.get('products').find({
        id: id
    }).value();
    res.render('./products/viewproduct.pug', {
        product: matchedId
    })
};

module.exports.postCreate = function (req, res) {
    req.body.id = shortid.generate();
    db.get('products').push(req.body).write();
    res.redirect('/products');
};

module.exports.delete = function (req, res) {
    var id = req.params.id;
    db.get('products').remove({
        id: id
    }).write();
    res.redirect('/products');
}