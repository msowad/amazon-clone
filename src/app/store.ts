import { ordersApi } from '@/src/services/orders';
import { productsApi } from '@/src/services/products';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cart';
import colorModeReducer from './colorMode';

export const store = configureStore({
  reducer: {
    colorMode: colorModeReducer,
    cart: cartReducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      ordersApi.middleware,
      productsApi.middleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
