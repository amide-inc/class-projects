const router =  require('express').Router();
const Order = require('../models/order')
const authCheck = require('../middleware/check-auth');
const razorpay  =  require('razorpay');
const { route } = require('./product-route');
var instance = new razorpay({
    key_id: 'rzp_test_XeXDZ1bfrkFjXG',
    key_secret: 'ICtqt29GIFRpvRBC0W80TEx5'
})

router.post('/create', authCheck, (req, res) => {
    var options = {
        amount :req.body.amount,
        currency : "INR",
        receipt: "SHOPTOP" + new Date().getTime(),
        payment_capture: "0"
    }
    instance.orders.create(options, async (err, order) => {
        if(err) {
            res.json({success : false, error: err})
        }else {
           const myOrder = Order({
            raz_orderId : order.id,
            amount: order.amount,
            user: req.userData.userId
           })
          myOrder.save()
                 .then((result) => {
                     res.json({success : true,  data:result, message: 'Order has been created'})
                 })
                 .catch((er) => {
                     res.json({success: false, messge: "Mongo error"})
                 })
        }
    })
})

// router.post('/') //Assignmnets
module.exports =  router;