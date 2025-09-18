import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/products/Product.Slice"
import cart from '../features/Cart/cartSlice'
import user from "../features/User/UserSlice"

export const Store = configureStore({
    reducer:{
        product:productReducer,
        user:user,
        cart:cart
    }
})