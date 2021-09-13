const router = require('express').Router();
const Product = require('../models/product')
router.get('/', (req, res) => {
    Product.find({})
        .exec()
        .then(result => {
            res.json({ success: true, data: result })
        })
        .catch(err => {
            res.json({ success: false, message: "MOngo error" })
        });
});


router.get('/:id', (req, res) => {
    const id = req.params.id
    Product.findById(id)
        .exec()
        .then(result => {
            res.json({ success: true, data: result })
        })
        .catch(err => {
            res.json({ success: false, message: "MOngo error" })
        });
});

router.post('/', (req, res) => {
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        thumbnail: req.body.imageUrl,
        mrp: req.body.mrp,
        description: req.body.description,
    })

    product.save()
           .then((_) => {
             res.json({success: true, message: "product has been added"})  
           }).catch((err) => {
            res.json({success: false, message: "error"})  
           })
});
module.exports = router;