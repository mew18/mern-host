var express = require('express');
var app = express()
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var Product = require('./model/product')
var WishList = require('./model/wishlist');

const PORT=process.env.PORT || 42069


mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/swag-shop',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
// var db = mongoose.connect('mongodb://localhost/swag-shop')


//Allow all requests from all domains & localhost
app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET");
    next();
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/product', (req, res) => {
    var product = new Product(); // or may be add req.body in func

    product.title = req.body.title;
    product.price = req.body.price;

    product.save(function (err, savedProduct) {
        if (err) {
            res.status(500).send({ error: "Could not save Product" });
        }
        else {
            res.status(200).send(savedProduct);
        }
    })
    // product.likes=0   

});

app.get('/product', (req, res) => {

    Product.find({}, function (err, products) {
        // this is a sync aka on a diffrent thread
        if (err) {
            res.status(500).send({ error: "Could not fetch product" });
        }
        else {
            res.status(200).send(products);
        }
    });

});

// underthis as well you moron
app.get('/wishlist', (req, res) => {
    WishList.find({}).populate({ path: 'products', model: 'Product' }).exec(function (err, wishLists) {
        if (err) {
            res.status(500).send({ error: "i need your clothes your boots and your motorcycle" });
        }
        else {
            res.status(200).send(wishLists);
        }
    })
    // function (err, wishLists) {
    // res.send(wishLists);
    // })
});

app.post('/wishlist', (req, res) => {
    var wishList = new WishList();
    wishList.title = req.body.title;

    wishList.save(function (err, newWishList) {
        if (err) {
            res.status(500).send({ error: "Could not create wish list asshole" });
        }
        else {
            res.send(newWishList);
        }

    })
});

// understand this mororn :-----------

app.put('/wishlist/product/add', (req, res) => {
    Product.findOne({ _id: req.body.productId }, function (err, product) {
        if (err) {
            res.status(500).send({ error: "fuck you asshole" });
        }
        else {
            WishList.update({ _id: req.body.wishListId }, {
                $addToSet:
                    { products: product._id }
            }, function (err, wishList) {
                if (err) {
                    res.status(500).send({ error: "fuck you asshole" });
                }
                else {
                    res.status(200).send(wishList);
                }
            })
        }
    })

});

if(process.env.NODE_ENV == 'production')

app.listen(PORT, () => {
    console.log(`Swag Shop API started on port : ` + PORT);
});

