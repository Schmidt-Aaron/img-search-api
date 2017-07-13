var express = require('express');
var router = express.Router();
var db = require("./db");

router.get('/', function(req, res, next) {
  var collection = db.get().collection('history');
         
  collection.find({},{_id:0, ts:1, term:1}).limit(10).toArray(function(error, docs){
    if(error) throw error;
    res.send(docs);
  });
    
});


module.exports = router;