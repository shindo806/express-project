const express = require('express');
var bodyParse = require('body-parser');
const port = 3000;

var userRoutes = require('./routes/user.route');
var productRoutes = require('./routes/product.route');

const app = express();
app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('public'))
app.use(bodyParse.json()) // for parsing application/json
app.use(bodyParse.urlencoded({
    extended: true
})) // for parsing application/x-www-form-urlencoded

app.get('/', (req, res) => res.render('index.pug', {
    name: "Shindo"
}));

app.use('/users', userRoutes);

app.use('/products', productRoutes);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))