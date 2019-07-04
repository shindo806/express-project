var shortid = require('shortid');

var db = require('../db');
var products = db.get('products').value();

// Pagination
module.exports.index = function (req, res) {
    const perPage = 8;
    var page = parseInt(req.query.page) || 1;
    var prevPage = (page - 1);
    var cont1Page = page + 1;
    var cont2Page = page + 2;
    var nextPage = page + 3;
    const maxPage = Math.ceil(products.length / perPage);
    // var start = (page - 1) * perPage;
    // var end = page * perPage;
    res.render('products/products.pug', {
        // products: db.get('products').value().slice(start, end)
        products: db.get('products').drop((page - 1) * perPage).take(perPage).value(),
        page: page,
        prevPage: prevPage,
        cont1Page: cont1Page,
        cont2Page: cont2Page,
        nextPage: nextPage,
        maxPage: maxPage
    });
};
// Create a new product
module.exports.create = function (req, res) {
    res.render('./products/createproduct.pug')
};
module.exports.postCreate = function (req, res) {
    req.body.id = shortid.generate();
    db.get('products').push(req.body).write();
    res.redirect('/products');
};
// Search product
module.exports.search = function (req, res) {
    var q = req.query.q.toLowerCase();
    var matchedProducts = products.filter(function (product) {
        if (product.name.toLowerCase().indexOf(q) !== -1) {
            return product;
        } else if (product.name.toLowerCase().indexOf(q) === -1) {
            return products;
        }
    });

    res.render('./products/search.pug', {
        matchedProducts: matchedProducts
    })
};

module.exports.id = function (req, res) {
    var id = parseInt(req.params.id);
    var matchedId = db.get('products').find({
        id: id
    }).value();
    res.render('./products/viewproduct.pug', {
        product: matchedId
    })
};


module.exports.delete = function (req, res) {
    var id = parseInt(req.params.id);
    db.get('products').remove({
        id: id
    }).write();
    res.redirect('/products');
}