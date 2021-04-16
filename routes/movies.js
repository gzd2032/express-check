var express = require('express');
var router = express.Router();
const moviesList = require('../mock-data/movies.json')

/* GET users listing. */
//    /movies?title=paris    <-  req.query 

router.get('/', function(req, res, next) {
  const titleText = req.query.title;

  if (titleText) {
    //do something
    const titleSearch = moviesList.filter(function(movie){
      const movieTitle = movie.title.toLowerCase();
      return movieTitle.includes(titleText.toLowerCase());
    })
    res.json(titleSearch)
  }
  res.send(moviesList);
});


router.get('/:movieId', (req, res) => {
  const movieId = parseInt(req.params.movieId);
  const foundMovie = moviesList.find( (movie) => {
      return movie.id === movieId;
  });
  res.json(foundMovie);
});

router.post('/', (req, res)=>{
  //get the data
  //add it to the moviesList
const newMovie = req.body
moviesList.push(newMovie)
res.send(moviesList);

})

module.exports = router;
