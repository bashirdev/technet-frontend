import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './features/cart/cartSlice';
import productSlice from './features/products/productSlice';
import { apiSlice } from './api/apiSlice';

import userReducer from './features/user/userSlice';
const store = configureStore({
  reducer: {
    cart: cartSlice,
    user: userReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    product: productSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
