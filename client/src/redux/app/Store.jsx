import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "../features/CartSlice";

//create store
export const store = configureStore({
    reducer: {
        allCart: CartSlice
    }
})