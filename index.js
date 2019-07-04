require('dotenv').config();


const express = require('express');
var bodyParse = require('body-parser');
const port = 3000;
var cookieParser = require('cookie-parser')


var userRoutes = require('./routes/user.route');
var productRoutes = require('./routes/product.route');
var authRoute = require('./routes/auth.route');
var cartRoute = require('./routes/cart.route');

var sessionMiddleware = require('./middlewares/session.middleware');


const app = express();
app.set('view engine', 'pug');
app.set('views', './views');
app.use(cookieParser(process.env.SESSION_SECRET));

app.use(express.static('public'));
app.use(bodyParse.json()) // for parsing application/json
app.use(bodyParse.urlencoded({
    extended: true
})) // for parsing application/x-www-form-urlencoded
app.use(sessionMiddleware);

app.get('/', function (req, res) {
    res.render('index.pug');
});

app.use('/users', userRoutes);

app.use('/products', productRoutes);

app.use('/auth', authRoute);

app.use('/cart/', cartRoute);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))