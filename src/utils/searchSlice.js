import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice(
    {
        name: 'search',
        initialState : {
            list:''
        },
        reducers:{
            addMovie:(state , action) =>{
                state.list = (action.payload) ;
            },
            removeMovie:(state , action) =>{
                return null ;
                 
            }
        }
    }
)
export const {addMovie , removeMovie} = searchSlice.actions;
export default searchSlice.reducer;


