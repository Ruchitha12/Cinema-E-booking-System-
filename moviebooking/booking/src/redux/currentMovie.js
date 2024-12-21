import {createSlice} from '@reduxjs/toolkit';


const currentMovie = createSlice({
    name: "cmovie",
    initialState: {
        id:""
    },
    reducers: {
        setID(state, action) {
            state.id = action.payload;
        }
    }
})

export const cActions = currentMovie.actions;

export default currentMovie;