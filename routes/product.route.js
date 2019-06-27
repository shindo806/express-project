var express = require('express');
var router = express.Router();

var controller = require('../controllers/product.controller');


router.get('/', controller.index);

router.get('/create', controller.create);

router.get('/search', controller.search);

router.get('/view/:id', controller.id);

router.post('/create', controller.postCreate);

router.get('/delete/:id', controller.delete);

module.exports = router;