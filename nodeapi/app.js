const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express();
const morgan = require('morgan')
const expressValidator = require('express-validator')

mongoose.connect(process.env.MONGO_URI,)
.then(() => console.log('DB Connected'))
mongoose.connection.on('error', err=>{console.log(`DB connection error:${err.message}`);
})

const postRoutes = require('./routes/post')
const myOwnMiddleWare = () =>{
    console.log('middleware applied');
    next();
}
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(myOwnMiddleWare);
app.use("/",postRoutes);


const port = 8080

app.listen(port, ()=>{console.log(`A Node Js API is listening on port: ${port}`)});