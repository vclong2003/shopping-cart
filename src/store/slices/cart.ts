import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ICartItem } from "../../interfaces";

interface ICartState {
  cart: ICartItem[];
  loading: boolean;
  error: string | null;
}

const name = "cart";
const initialState: ICartState = {
  cart: [],
  loading: false,
  error: null,
};

const cart = createSlice({
  name,
  initialState,
  reducers: {
    addCartItem: (state, action: PayloadAction<ICartItem>) => {
      const newCartItem = action.payload;
      const {
        quantity: newItemQuantity,
        product: { productId: newProductId },
      } = newCartItem;

      const existingCartItemIndex = state.cart.findIndex(
        (cartItem) => cartItem.product.productId === newProductId,
      );

      // Item already exists in cart
      if (existingCartItemIndex !== -1) {
        state.cart[existingCartItemIndex].quantity += newItemQuantity;
        return;
      }

      state.cart.push(newCartItem);
    },
    changeItemQuantity: (state, action: PayloadAction<ICartItem>) => {
      const {
        product: { productId },
        quantity: newQuantity,
      } = action.payload;

      const existingCartItemIndex = state.cart.findIndex(
        (cartItem) => cartItem.product.productId === productId,
      );

      if (existingCartItemIndex === -1) return;

      state.cart[existingCartItemIndex].quantity = newQuantity;
    },

    removeItemFromCart: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.filter(
        (cart) => cart.product.productId !== action.payload,
      );
    },
  },
});

export const { addCartItem, changeItemQuantity, removeItemFromCart } =
  cart.actions;
export default cart;
