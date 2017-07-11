var express = require('express');
var router = express.Router();
var Search = require('google-search');
var db = require("./db");

/* GET search listing. */
router.get('/:query', function(req, res, next) {
  //query string
  let query = req.params.query;
  console.log(`Searching for ${query} pictures`);
  let timeStamp = new Date().toLocaleString();

  //optional parameters
  let resultsPerPage = 10;
  let page = 1 || req.query.offset * resultsPerPage;
  
  let googleSearch = new Search({
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
        let item = {
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