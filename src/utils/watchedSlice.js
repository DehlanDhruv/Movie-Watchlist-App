import { createSlice } from '@reduxjs/toolkit';

const watchedSlice = createSlice({
  name: 'watched',
  initialState: {
    watchedList: [], // Array to hold watched movies
  },
  reducers: {
    toggleWatched: (state, action) => {
      const movie = action.payload;
      const existingMovie = state.watchedList.find(item => item.imdbID === movie.imdbID);
      if (existingMovie) {
        // If the movie is already watched, remove it from the watched list
        state.watchedList = state.watchedList.filter(item => item.imdbID !== movie.imdbID);
      } else {
        // If the movie is not watched, add it to the watched list
        state.watchedList.push(movie);
      }
    },
  },
});

export const { toggleWatched } = watchedSlice.actions;
export default watchedSlice.reducer;


