const express = require('express');
const todoRoute = require('./routes/todo-route');
const app = express();
const port = process.env.port || 8080;
const mongoose = require('mongoose');
const bodyParser =  require('body-parser');
const cors = require('cors');
mongoose.connect(
    "mongodb+srv://amide:root@livecode.cg0h9.mongodb.net/todoDb",
    (err) => {
        if(err) {
            console.log("Db not connecting");
        }else{
            console.log("DB connected");
        }
    }
)
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
app.use(cors())
app.use('/todo', todoRoute);

app.listen(port, () => {
    console.log("server is connected : ", port);
})