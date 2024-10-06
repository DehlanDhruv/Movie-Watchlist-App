import { createSlice } from '@reduxjs/toolkit';

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState: {
    defaultName: 'My Watchlist',
    watchlistArray: [],
  },
  reducers: {
    addToWatchlist: (state, action) => {
      // Add the movie to the watchlist if it doesn't already exist
      const movie = action.payload;
      const existingMovie = state.watchlistArray.find(item => item.imdbID === movie.imdbID);
      if (!existingMovie) {
        state.watchlistArray.push(movie);
      }
    },
    removeFromWatchlist: (state, action) => {
      // Remove the movie from the watchlist based on imdbID
      const movieId = action.payload.imdbID; 
      state.watchlistArray = state.watchlistArray.filter(item => item.imdbID !== movieId);
    },
    setWatchlistName: (state, action) => {
      // Update the wlaylist name
      state.list = action.payload; 
    },
  },
});

export const { addToWatchlist, removeFromWatchlist, setWatchlistName } = watchlistSlice.actions;
export default watchlistSlice.reducer;


