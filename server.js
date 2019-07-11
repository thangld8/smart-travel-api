const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const bodyParser = require('body-parser');

//db
const models = require("./public/models/index");
//port
const port = process.env.PORT || 3001;
const routes = require('./public/routes/index');
// Init model
const options = {
  inflate: true,
  limit: '100kb',
  type: 'application/octet-stream'
};
const app = express();
require('dotenv').config();
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.raw(options));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
       
app.use(passport.initialize());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

models.sequelize.authenticate().then(() => {
  console.log("Connected MySql Database");
}).catch(err => {
  console.log("Something went wrong:", err);
})
//initializes the passport configuration.
require('./passport-config')(passport);
//router
app.use('/', require('./public/routes/auth'));
app.use('/api', passport.authenticate('jwt', {session: false}), require('./public/routes/index'));
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const expressSv = app.listen(port);
console.log(`Server running at http://localhost:${port}/`);


module.exports = app;
