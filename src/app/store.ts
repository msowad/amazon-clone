import { configureStore } from '@reduxjs/toolkit';
import { ordersApi } from '@/src/services/getOrders';
import cartReducer from './cart';
import colorModeReducer from './colorMode';

export const store = configureStore({
  reducer: {
    colorMode: colorModeReducer,
    cart: cartReducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([ordersApi.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
