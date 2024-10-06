import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice';
import searchReducer from './searchSlice';
import moviesReducer from './movieSlice';
import watchlistReducer from './watchlistSlice';
import watchedReducer from './watchedSlice'

const appStore = configureStore({
    reducer: {
        user : userReducer , 
        search : searchReducer,
        movies : moviesReducer,
        watchlist:watchlistReducer,
        watched:watchedReducer,
    }, 
},
);

export default appStore;

