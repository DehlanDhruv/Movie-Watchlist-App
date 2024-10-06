import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setWatchlistName } from '../utils/watchlistSlice';  
import { ReactComponent as Edit } from '../Assets/edit.svg';
import { ReactComponent as Tick } from '../Assets/tick.svg';
import './Watchlist.css';
import LeftPanel from './LeftPanel';
import { ReactComponent as Green } from '../Assets/happy.svg';
import { ReactComponent as Brown } from '../Assets/brown.svg';
import { toggleWatched } from '../utils/watchedSlice';

const WatchlistContainer = () => {
  const dispatch = useDispatch();

  const { defaultName: watchlistName, watchlistArray: watchlistValues } = useSelector(state => state.watchlist);
  const watchedList = useSelector(state => state.watched.watchedList);

  const [editableName, setEditableName] = useState(watchlistName);
  const [isEditing, setIsEditing] = useState(false);

  const handleNameChange = (e) => {
    setEditableName(e.target.value);
  };

  
  const handleNameSave = () => {
    dispatch(setWatchlistName(editableName));
    setIsEditing(false);
  };

  const enableEditMode = () => {
    setIsEditing(true);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleNameSave();
    }
  };

  const handleToggleWatched = useCallback((movie) => {
    dispatch(toggleWatched(movie));
  }, [dispatch]);

  const tickStyle = (isWatched) => ({
    cursor: 'pointer',
    position: 'absolute',
    top: '2px',
    left: '1px',
    height: '25px',
    width: '25px',
    background: isWatched ? 'green' : 'white',
    borderRadius: '8px',
  });

  return (
    <div>
      <LeftPanel />
      <div className='movieCardsContainer'>
        {watchlistValues.length > 0 && (
          <div className="watchlist-header">
            {isEditing ? (
              <input
                type="text"
                value={editableName}
                onChange={handleNameChange}
                onBlur={handleNameSave}
                onKeyPress={handleKeyPress}
                autoFocus
                className="playlist-name-input"
              />
            ) : (
              <div className="playlist-name-display">
                <span>{editableName}</span>
                <Edit
                  className="editSVG"
                  style={{ height: '25px', width: '25px', cursor: 'pointer', marginLeft: '4%' }}
                  onClick={enableEditMode}
                />
                <p> Watched: {watchedList.length} of {watchlistValues.length}</p>
              </div>
            )}
          </div>
        )}
        
        <div className='movies-list-watchlist'>
          {watchlistValues.length > 0 ? (
            watchlistValues.map((movie) => {
              const isWatched = watchedList.some(watchedMovie => watchedMovie.imdbID === movie.imdbID);

              return (
                <div key={movie.imdbID} className="movie-card">
                  <div className='image-container'>
                    <img src={movie.Poster} alt={`${movie.Title} Poster`} />
                    <Tick 
                      style={tickStyle(isWatched)} 
                      onClick={() => handleToggleWatched(movie)}
                    />
                  </div>
                  <div className='details'>
                    <p className="rating"> 
                      <span> 
                        {movie.imdbRating > 7.5 
                          ? <Green style={{ height: '15px', width: '15px', marginRight: '4px' }} /> 
                          : <Brown style={{ height: '15px', width: '15px', marginRight: '4px' }} />} 
                      </span>  
                      {movie.imdbRating} / 10
                    </p>
                    <p>{movie.Title}</p>
                    <p className='movieYear'>(<span>{movie.Year}</span>)</p>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No movies in the watchlist</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default WatchlistContainer;
