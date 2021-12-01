import { ordersApi } from '@/src/services/orders';
import { productsApi } from '@/src/services/products';
import { usersApi } from '@/src/services/users';
import { configureStore } from '@reduxjs/toolkit';
import { sellApi } from '../services/sell';
import cartReducer from './cart';
import colorModeReducer from './colorMode';

export const store = configureStore({
  reducer: {
    colorMode: colorModeReducer,
    cart: cartReducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [sellApi.reducerPath]: sellApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      ordersApi.middleware,
      productsApi.middleware,
      usersApi.middleware,
      sellApi.middleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
