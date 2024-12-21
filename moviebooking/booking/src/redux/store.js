import { configureStore } from "@reduxjs/toolkit";
import loginUser, { loginActions } from "./loginSlice";
import currentMovie from "./currentMovie";
import { persistReducer, persistStore } from 'redux-persist';
import storage from '@react-native-async-storage/async-storage'
import cart from "./cart";

const config = {
    key:"root",
    storage
}

const persistedReducer = persistReducer(config, loginUser.reducer)

const store = configureStore({
    reducer: {
        login: persistedReducer,
        cmovie: currentMovie.reducer,
        cart: cart.reducer
    } 
})

export default store;
export const persistor = persistStore(store);