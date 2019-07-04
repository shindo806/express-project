var db = require('../db');

module.exports.addToCart = function (req, res, next) {
    var productId = req.params.productId;
    var sessionId = req.signedCookies.sessionId;
    var count = db.get('sessions').find({
        id: sessionId
    }).get('cart.' + productId, 0);

    if (!sessionId) {
        res.redirect('/products');
        return;
    }
    db.get('sessions')
        .find({
            id: sessionId
        })
        .set('cart.' + productId, count + 1)
        .write();

    res.redirect('/products');

    next();
};


module.exports.showCart = function (req, res, next) {
    var sessionId = '2uDBp-Ypl';
    var totalItems = db.get('sessions').find({ // Số items đã được cart
        id: sessionId
    }).get('cart').map().value();

}