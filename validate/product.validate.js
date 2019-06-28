module.exports.postCreate = function (req, res, next) {
    var errors = [];
    if (!req.body.name) {
        errors.push('Products name is required');
    }
    if (errors.length) {
        res.render('./products/createproduct', {
            errors: errors
        })
        return
    }
    next();
};