import { IProduct } from '@/types/globalTypes';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
interface ICart {
  products: IProduct[];
  total: number;
}
const initialState: ICart = {
  products: [],
  total: 0,
};
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IProduct>) => {
      const isExistProduct = state.products.find(
        (product) => product._id === action.payload._id
      );
      if (isExistProduct) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        isExistProduct.quantity = isExistProduct.quantity! + 1;
      } else {
        state.products.push({ ...action.payload, quantity: 1 });
      }
      state.total += action.payload.price;
    },
    removeOne: (state, action: PayloadAction<IProduct>) => {
      const isExistProduct = state.products.find(
        (product) => product._id === action.payload._id
      );
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      if (isExistProduct && isExistProduct.quantity! > 1) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        isExistProduct.quantity = isExistProduct.quantity! - 1;
      } else {
        state.products = state.products.filter(
          (product) => product._id !== action.payload._id
        );
      }
      state.total -= action.payload.price;
    },
    removeFromCart: (state, action: PayloadAction<IProduct>) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload._id
      );
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      state.total -= action.payload.price * action.payload.quantity!;
    },
  },
});

export const { addToCart, removeFromCart, removeOne } = cartSlice.actions;
export default cartSlice.reducer;
