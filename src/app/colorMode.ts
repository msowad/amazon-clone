import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { COOKIES_DEFAULT_OPTIONS } from "../utils/constants";
import { RootState } from "./store";

export interface ColorModeState {
  darkMode: boolean;
}

const initialState: ColorModeState = {
  darkMode: false,
};

export const colorModeSlice = createSlice({
  name: "colorMode",
  initialState,
  reducers: {
    toggleMode: (state) => {
      state.darkMode = !state.darkMode;
      Cookies.set(
        "darkMode",
        state.darkMode ? "ON" : "OFF",
        COOKIES_DEFAULT_OPTIONS
      );
    },
    setMode: (state) => {
      state.darkMode = Cookies.get("darkMode") === "ON";
    },
  },
});

export const selectColorMode = (state: RootState) => state.colorMode.darkMode;

export const { setMode, toggleMode } = colorModeSlice.actions;

export default colorModeSlice.reducer;
