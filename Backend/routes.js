const router = require('express').Router();
//const validators = require('./validators');
const movieController = require('./controllers/movieController.js');

// Inserting movie to database
router.post(
    '/insert-movie',
    movieController.insert
    );
router.post(
    '/login',
    movieController.login
);
    // Fetching allmovies
router.get(
    '/get-all-movies',
    movieController.getAllMovies
    );

// Fetching Movie By ID
router.get(
    '/get-movie/:id',
    movieController.getMovieByID
    );

// Updating Movie
router.patch(
    '/update-movie/:id',
    movieController.updateMovie
    );
    
// Deleting Movie
router.delete(
    '/delete-movie/:id',
    movieController.deleteMovie
    );

module.exports = router;



