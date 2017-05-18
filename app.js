`use strict`

require('dotenv').config()
const express = require('express');
const path = require('path');
// const logger = require('morgan');
const bodyParser = require('body-parser');
// const cors = require('cors')
const routes = require('./routes/');

const app = express();

// This 'if' statement prevents application log messages from
// displaying in the stdout when the tests are run
// if (process.env.NODE_ENV !== 'test') {
//   app.use(logger('dev'));
// }

// require('dotenv').config()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// *** cross domain requests *** //
// this manually handles cors
const allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
}

app.use(allowCrossDomain);
// app.use(cors())
// app.options('*', cors())

app.use('/api/v1/', routes)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if(app.get('env') === 'development' || app.get('env') === 'test') {
  app.use((err,req,res,next) => {
    console.log("error", err)
    res.status(err.status || 500)
    res.json({
      message: err.message,
      error: err
    })
  })
}

//default to production
app.use((err,req,res,next) => {
    console.log("error", err)
    res.status(err.status || 500)
    res.json({
      message: err.message,
      error: {}
    })
  })

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port} in env: ${process.env.NODE_ENV}`);
});

module.exports = app;
