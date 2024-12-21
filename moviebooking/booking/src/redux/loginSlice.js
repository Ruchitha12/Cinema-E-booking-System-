import {createSlice} from '@reduxjs/toolkit';


const loginUser = createSlice({
    name: "loginSlice",
    initialState: {
        id: null,
        email:"",
        admin: false
    },
    reducers: {
        setAdmin(state, action) {
            state.admin = action.payload;
        },
        setEmail(state, action) {
            state.email = action.payload;
        },
        setId(state, action) {
            state.id = action.payload;
        }
    }
})

export const loginActions = loginUser.actions;

export default loginUser;