const express =  require('express');

const app = express()
const port = process.env.port || 8080
const authRoute = require('./routes/auth-route');
const productRoute  = require('./routes/product-route');
const orderRoute = require('./routes/order-route');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
mongoose.connect(
    "mongodb+srv://amide:root@livecode.cg0h9.mongodb.net/shopData",
    (err) => {
        if(err){
            console.log("Db not connecting")
        }else{
            console.log("Db Connected");
        }
    }
);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
app.use(cors())
app.use('/auth', authRoute);
app.use('/product', productRoute);
app.use('/order', orderRoute);
app.get('/', (req, res) => {
    res.send("No world")
})

app.listen(port, () => {
    console.log("server is connected :" , port)
})