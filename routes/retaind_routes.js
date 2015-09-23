var eatAuth = require(__dirname + '/../lib/eat_auth');
var express = require('express');
var User = require(__dirname + '/../models/user');
var retaindRoute = module.exports = exports = express.Router();
var jsonParser = require('body-parser').json();
var handleError = require(__dirname + '/../lib/handle_error');
var addToDb = require(__dirname + '/../lib/add_to_db');


// Accepts a JSON object like: {pInfo: {fullName: 'Bert Mert',email: 'b.mert@pert.com',phone: '3603603600',location: 'Seattle, WA',timezone: 'PST (UTC−08:00)',currentLogin: 'the token?'}}
// Stores JSON object in an array. can access with user.pInfo[0]
retaindRoute.post('/personal', jsonParser, eatAuth, function(req, res) {
  User.findOneAndUpdate({ username: req.user.username },
  { $push: {pInfo: req.body.pInfo}},
  function(err, doc) {
    if (err) handleError(err);
  });
  return res.end();
});

retaindRoute.delete('/removeUser', jsonParser, eatAuth, function(req, res) {
  User.findOneAndRemove({ username: req.user.username});
  return res.end();
});

retaindRoute.post('/ambition', jsonParser, eatAuth, function(req, res) {
  User.findOneAndUpdate({ username: req.user.username },
  { $push: {ambitions: req.body.ambitions}},
  function(err, doc) {
    if (err) handleError(err);
  });
  return res.end();
});

retaindRoute.post('/LDR', jsonParser, eatAuth, function(req, res) {
  User.findOneAndUpdate({ username: req.user.username },
  { $push: {LDR: req.body.LDR}},
  function(err, doc) {
    if (err) handleError(err);
  });
  return res.end();
});

retaindRoute.put('/change_remindr', jsonParser, function(req, res) {
  console.log(req.body);
});

retaindRoute.get('/user_info', jsonParser, eatAuth, function(req, res) {
  User.findOne( {username: req.user.username}, function(doc) {
    res.json(doc);
  });
});