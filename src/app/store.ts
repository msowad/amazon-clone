import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cart';
import colorModeReducer from './colorMode';

export const store = configureStore({
  reducer: {
    colorMode: colorModeReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
