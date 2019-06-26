const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const Topics = require('./public/models/Topics');
const sort = require('./public/utils/sort');
const {Node, LinkedList} = require('./public/utils/linkedList');

//socket & peer
const PeerServer = require('peer').PeerServer;
const io = require('socket.io');

//port
const port = process.env.PORT || 3001;
const peerPort = 9000;
const peerChatPath = '/chat';
const dbPort = process.env.DB_PORT || 27017;
const dbUrl = process.env.DB_URL || "localhost";
const dbCollection = process.env.DB_COLLECTION || "auth-test";
const routes = require('./public/routes/index')
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
mongoose.set('useCreateIndex', true);

//fixes an issue with a depricated default in Mongoose.js
mongoose.connect(`mongodb://${dbUrl}/${dbCollection}`, {useNewUrlParser: true})
    .then(data => console.log('Connected Successfully to MongoDB'))
    .catch(err => console.error(err));
       
app.use(passport.initialize());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
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
const ioConec = io.listen(expressSv)
console.log('connected socketIO!');

const peerServer = new PeerServer({port: peerPort, path: peerChatPath});

peerServer.on('connection', function (id) {
  io.emit(Topics.USER_CONNECTED, id);
  console.log('User connected with #', id);
});

peerServer.on('disconnect', function (id) {
  io.emit(Topics.USER_DISCONNECTED, id);
  console.log('With #', id, 'user disconnected.');
});

//test

const uArray = [1, 2, 3, 5, 1, 5, 9, 1, 2, 8]
sort.computeArray(uArray)

//find missing number
const arrayOfIntegers = [2, 5, 1, 4, 9, 6, 3, 7];
const upperBound = 9;
const lowerBound = 1;

sort.findMissingArray(arrayOfIntegers, upperBound, lowerBound)
sort.removeDup(uArray)
sort.checkThis();
let list = new LinkedList();
list.insertAtBeginning(10);
// list.insertAtBeginning(9)
// list.insertAtEnd(13);
// list.insertAtPos(100, 2);

module.exports = app;
