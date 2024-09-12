import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cart-slice";

const store = configureStore({
  reducer: {
    cart: cartSlice,
  },
});

export default store;
