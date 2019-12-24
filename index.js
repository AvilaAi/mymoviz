var express = require('express');
var router = express.Router();
var request = require('request');
require('./models/db.js');
const movieModel = require('./models/movies.js');

/* GET home page. */
router.get('/', function(req, res, nest) {
	var list = 'back ok';
	res.json(list);

	console.log(list);
});

router.get('/movies', function(req, res, next) {
	request(
		'https://api.themoviedb.org/3/discover/movie?page=1&include_video=false&include_adult=false&sort_by=popularity.desc&language=en-US&api_key=0d20376e5fcb12032f94df7d96b52332',
		function(error, response, body) {
			body = JSON.parse(body);
			res.json({
				result: body.results,
			});
		}
	);
});

router.get('/mymovies', function(req, res, next) {
	movieModel.find(function(err, movies) {
		res.json({
			result: movies,
		});
	});
});

router.post('/mymovies', function(req, res, next) {
	var newMovie = new movieModel({
		poster_path: req.body.img,
		overview: req.body.desc,
		title: req.body.name,
		idMovieDB: req.body.id,
	});

	newMovie.save(function(error, movie) {
		res.json({
			result: movie,
		});
	});
});

router.delete('/mymovies/:id', function(req, res, next) {
	movieModel.deleteOne({ idMovieDB: req.params.id }, function(err) {
		res.json({
			result: 'true',
		});
	});
});

module.exports = router;
