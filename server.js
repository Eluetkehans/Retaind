
var express = require('express');
var app = express();
var mongoose = require('mongoose');

var jsonParser = require('body-parser').json();


mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/db');
var port = process.env.PORT || 3000; //set to 3000 for now.
process.env.APP_SECRET = process.env.APP_SECRET || 'setupanappsecretplease';

//TODO: make signin-routes a real boy
// var signInRouter = require(__dirname + '/routes/signin_routes');
// app.use(signInRouter); //universal for now

var usersRouter = require(__dirname + '/routes/users_routes');
app.use('/api', usersRouter);

app.listen(port, function() {
  console.log('server up on port: ' + port);
});
