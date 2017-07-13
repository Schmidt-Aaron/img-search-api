var express = require('express');
var router = express.Router();
var Search = require('google-search');
var db = require("./db");

/* GET search listing. */
router.get('/:query', function(req, res, next) {
  // variables to be passed to db
  let query = req.params.query;
  let timeStamp = new Date().toLocaleString();

  console.log(`Searching for ${query} pictures at ${timeStamp}`);
  
  //record the search
  var collection = db.get().collection('history');
  collection.insert({
    'ts': timeStamp,
    'term': query
  });
  

  //optional parameters
  let resultsPerPage = 10;
  let page = 1 || req.query.offset * resultsPerPage + 1;
  
//assign environmental variables to our search package
  let googleSearch = new Search({
    key: process.env.API_KEY,
    cx: process.env.CX
  });

//build out our API call
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