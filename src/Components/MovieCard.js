import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addMovie } from '../utils/searchSlice';
import useMoviesResults from './customHooks/useMoviesResults';
import './MovieCard.css';
import { addToWatchlist, removeFromWatchlist } from '../utils/watchlistSlice';
import { ReactComponent as Bookmark } from '../Assets/bookmark.svg';
import { ReactComponent as Tick } from '../Assets/tick.svg';
import { ReactComponent as Green } from '../Assets/happy.svg';
import { ReactComponent as Brown } from '../Assets/brown.svg';

const MovieCard = () => {
  const [movie, setMovie] = useState('');
  const dispatch = useDispatch();

  useMoviesResults(); 
  const moviesArray = useSelector((state) => state.movies.moviesResults);
  const watchlistValues = useSelector((state) => state.watchlist.watchlistArray);

  const handleMovieChange = (e) => {
    const newMovieValue = e.target.value;
    setMovie(newMovieValue); 
    dispatch(addMovie(newMovieValue));
  };

  // Check if a movie is already in the watchlist
  const isMovieInWatchlist = (movie) => {
    return watchlistValues.some((item) => item.imdbID === movie.imdbID);
  };

  // Handle toggling the watchlist (add/remove movie)
  const handleToggleWatchlist = useCallback((movie) => {
    if (isMovieInWatchlist(movie)) {
      dispatch(removeFromWatchlist(movie));
    } else {
      dispatch(addToWatchlist(movie));
    }
  }, [dispatch, watchlistValues]);

  const iconStyle = { cursor: 'pointer', position: 'absolute' };
  const tickStyle = { ...iconStyle, top: '2px', left: '1px', height: '25px', width: '25px', background: 'white', borderRadius: '8px' };

  return (
    <div className='movieCardsContainer'>
      <div className='titleContainer'>
        <h1 className="title">Welcome to <span className="icon">Watchlists</span></h1>
        <p className="text">Browse movies, add them to watchlists, and share them with friends.</p>
        <p className="text">Just click the <Bookmark className='bookmarkSVG' /> to add a movie, the poster to see more details, and to mark the movie as watched.</p>
      </div>

      <div className='searchContainer'>
        <input
          className='searchInput'
          type='search'
          placeholder='Search Your Movie Here'
          value={movie}
          onChange={handleMovieChange} 
        />
        <button className="search-button">
          <p>Search</p>
        </button>
      </div>

      <div className='movies-list'>
        {moviesArray.length > 0 ? (
          moviesArray.map((movie) => (
            <div key={movie.imdbID} className="movie-card">
              <div className="image-container">
                <img src={movie.Poster} alt={`${movie.Title} Poster`} />
                {isMovieInWatchlist(movie) ? (
                  <Tick 
                    style={tickStyle} 
                    onClick={() => handleToggleWatchlist(movie)}
                  />
                ) : (
                  <Bookmark 
                    style={{ ...iconStyle, top: '0px', left: '0px' }} 
                    onClick={() => handleToggleWatchlist(movie)}
                  />
                )}
              </div>
              <div className="details">
                <p className="rating"> 
                  <span> 
                    {movie.imdbRating > 7.5 
                      ? <Green style={{ height: '15px', width: '15px', marginRight: '4px' }} /> 
                      : <Brown style={{ height: '15px', width: '15px', marginRight: '4px' }} />} 
                  </span>  
                  {movie.imdbRating} / 10
                </p>
                <p style={{ fontWeight: '800' }}>{movie.Title}</p>
                <p style={{ fontStyle: 'italic' }}>{movie.Genre}</p>
                <p className='movieYear'>(<span>{movie.Year}</span>)</p>
              </div>
            </div>
          ))
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default MovieCard;
