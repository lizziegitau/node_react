const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');

const app = express();
const morgan = require('morgan');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('DB Connected'))
  .catch((err) => console.log(`DB connection error: ${err.message}`));

const postRoutes = require('./routes/post');

const myOwnMiddleware = (req, res, next) => {
  console.log('middleware applied');
  next();
};

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Use the new express-validator middleware
app.use(
  check(),
  (req, res, next) => {
    req.validationResult = validationResult;
    next();
  }
);

app.use(myOwnMiddleware);
app.use('/', postRoutes);

const port = 8080;

app.listen(port, () => {
  console.log(`A Node.js API is listening on port: ${port}`);
});
