var express = require('express');
var router = express.Router();
var Search = require('google-search');
var db = require("./db");

/* GET search listing. */
router.get('/:query', function(req, res, next) {
  //query string
  let query = req.params.query;
  console.log(`Searching for ${query} pictures`);
  //let timeStamp = new Date;

  //optional parameters
  let resultsPerPage = 10;
  let page = 1 || req.query.offset * resultsPerPage;
  
  var googleSearch = new Search({
    key: process.env.API_KEY,
    cx: process.env.CX
  });

  googleSearch.build({
    q: query,
    start: page,
    num: resultsPerPage,
    searchType: "image"
  }, function(error, response) {
    res.send(parseResults(response));
  });

  //result builder function
  function parseResults(data) {
    let prettyResults = [];
    
    //adjust this to change output
    data.items.forEach(x => {
        var item = {
            title: x.title,
            imageURL: x.link,
            pageURL: x.image.contextLink
        }
        console.log(item);
        prettyResults.push(item);
    })
    return prettyResults;
  }
  
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
