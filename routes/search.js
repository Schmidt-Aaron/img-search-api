var express = require('express');
var router = express.Router();
var Search = require('google-search');
var db = require("db");

/* GET search listing. */
router.get('/api/:query', function(req, res, next) {
  //query string
  let query = req.params.query;
  
  //optional parameters
  let page = req.query.offset;
  
  
  res.send('respond with a resource');
});

module.exports = router;

/* EXAMPLE CALL
var googleSearch = new GoogleSearch({
  key: 'YOUR_API_KEY',
  cx: 'YOUR_CX'
});
 
 
googleSearch.build({
  q: "",
  start: 5,
  fileType: "pdf",
  gl: "tr", //geolocation, 
  lr: "lang_tr",
  num: 10, // Number of search results to return between 1 and 10, inclusive 
  siteSearch: "http://kitaplar.ankara.edu.tr/" // Restricts results to URLs from a specified site 
}, function(error, response) {
  console.log(response);
});
*/
