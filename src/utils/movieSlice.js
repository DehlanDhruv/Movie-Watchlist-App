import {createSlice} from '@reduxjs/toolkit';

const movieSlice = createSlice({
    name :'movies',
    initialState:{
        moviesResults : [],
    },
    reducers:{
        addMoviesResults:(state  , action )=>{
            state.moviesResults = action.payload
        },
    }
})

export const {addMoviesResults} = movieSlice.actions;
export default movieSlice.reducer;

