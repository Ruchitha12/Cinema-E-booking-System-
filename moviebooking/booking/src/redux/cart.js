import {createSlice} from '@reduxjs/toolkit';


const cart = createSlice({
    name: "cart",
    initialState: {
        movie:"",
        date:"",
        time:"",
        adults:0,
        children:0,
        senior:0
    },
    reducers: {
        setTickets(state, action) {
            state.movie = action.payload.movie;
            state.date = action.payload.date;
            state.time = action.payload.time;
            state.adults = action.payload.adults;
            state.children = action.payload.children;
            state.senior = action.payload.senior;
        }
    }
})

export const cartActions = cart.actions;

export default cart;