import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { Product } from "@/src/types/Product";
import { RootState } from "./store";
import { COOKIES_DEFAULT_OPTIONS, MAX_SNACK } from "@/src/utils/constants";

export type CartItem = Product & { quantity: number };
export type ShippingDetails = {
  name: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
};

export type PaymentMethod = "stripe" | "cod";

interface CartState {
  cartItems: CartItem[];
  shippingDetails: ShippingDetails;
  paymentMethod: PaymentMethod;
}

const initialState: CartState = {
  cartItems: [],
  shippingDetails: {
    name: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  },
  paymentMethod: "stripe",
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const product = action.payload;
      const productExists = state.cartItems.find(
        (p: Product) => p._id === product._id
      );
      if (productExists) {
        if (productExists.countInStock > 0) {
          productExists.countInStock--;
          productExists.quantity++;
          state.cartItems = state.cartItems.map((p: CartItem) =>
            p._id === product._id ? productExists : p
          );
        }
      } else {
        if (product.countInStock > 0) {
          product.countInStock--;
          product.quantity = 1;
          state.cartItems.push(product);
        }
      }
      Cookies.set(
        "cartItems",
        JSON.stringify(state.cartItems),
        COOKIES_DEFAULT_OPTIONS
      );
    },
    setCartFromCookies: (state) => {
      if (Cookies.get("cartItems")) {
        state.cartItems = JSON.parse(Cookies.get("cartItems")!);
      }
      if (Cookies.get("shippingDetails")) {
        state.shippingDetails = JSON.parse(Cookies.get("shippingDetails")!);
      }
    },
    removeFromCart: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const productIndex = state.cartItems.findIndex(
        (p: Product) => p._id === product._id
      );
      state.cartItems[productIndex].countInStock +=
        state.cartItems[productIndex].quantity;
      state.cartItems.splice(productIndex, 1);
      Cookies.set(
        "cartItems",
        JSON.stringify(state.cartItems),
        COOKIES_DEFAULT_OPTIONS
      );
      const lastCartItems = Cookies.get("lastCartItems")
        ? JSON.parse(Cookies.get("lastCartItems")!)
        : [];
      Cookies.set(
        "lastCartItems",
        JSON.stringify([product, ...lastCartItems.slice(0, MAX_SNACK - 1)]),
        COOKIES_DEFAULT_OPTIONS
      );
    },
    updateQuantity: (
      state,
      action: PayloadAction<{
        productId: string;
        quantity: number;
      }>
    ) => {
      const { productId, quantity } = action.payload;
      const productIndex = state.cartItems.findIndex(
        (p: Product) => p._id === productId
      );
      const quantityDiff = quantity - state.cartItems[productIndex].quantity;
      state.cartItems[productIndex].quantity = quantity;
      state.cartItems[productIndex].countInStock -= quantityDiff;
      Cookies.set(
        "cartItems",
        JSON.stringify(state.cartItems),
        COOKIES_DEFAULT_OPTIONS
      );
    },
    undoRemoveFromCart: (state, action: PayloadAction<string>) => {
      if (Cookies.get("lastCartItems")) {
        const lastCartItems = JSON.parse(Cookies.get("lastCartItems")!);
        const product = lastCartItems.find(
          (p: Product) => p._id === action.payload
        );
        if (product) {
          const productIndex = state.cartItems.findIndex(
            (p: Product) => p._id === product._id
          );
          if (productIndex === -1) {
            state.cartItems.push(product);
          } else {
            state.cartItems[productIndex].countInStock--;
            state.cartItems[productIndex].quantity++;
          }
          Cookies.set(
            "cartItems",
            JSON.stringify(state.cartItems),
            COOKIES_DEFAULT_OPTIONS
          );
        }
      }
    },
    updateShippingDetails: (state, action: PayloadAction<ShippingDetails>) => {
      const { name, address, city, postalCode, country } = action.payload;
      if (name && address && city && postalCode && country) {
        Cookies.set(
          "shippingDetails",
          JSON.stringify(action.payload),
          COOKIES_DEFAULT_OPTIONS
        );
        state.shippingDetails = action.payload;
      }
    },
    updatePaymentMethod: (state, action: PayloadAction<PaymentMethod>) => {
      Cookies.set("paymentMethod", action.payload, COOKIES_DEFAULT_OPTIONS);
      state.paymentMethod = action.payload;
    },
    resetCart: (state) => {
      state.cartItems = [];
      Cookies.remove("cartItems");
      Cookies.remove("lastCartItems");
    },
  },
});

export const selectCartLength = (state: RootState) =>
  state.cart.cartItems.length;

export const selectCartItems = (state: RootState) => state.cart.cartItems;

export const selectShippingDetails = (state: RootState) =>
  state.cart.shippingDetails;

export const selectTotalPrice = (state: RootState) =>
  state.cart.cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

export const {
  addToCart,
  setCartFromCookies,
  removeFromCart,
  updateQuantity,
  undoRemoveFromCart,
  updateShippingDetails,
  updatePaymentMethod,
  resetCart,
} = cartSlice.actions;

export default cartSlice.reducer;
