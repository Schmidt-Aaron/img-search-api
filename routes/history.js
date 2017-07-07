var express = require('express');
var router = express.Router();
var db = require("db");

router.get('/history', function(req, res, next) {
  //figure out how to send history in the response
  //probably save history to mongo as part of the search call
});


module.exports = router;