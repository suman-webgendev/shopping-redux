import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cart-slice";
import { productsApiSlice } from "./slices/product-api-slice";

const store = configureStore({
  reducer: {
    cart: cartSlice,
    [productsApiSlice.reducerPath]: productsApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApiSlice.middleware),
});

export default store;
