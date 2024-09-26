
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  product: {},
  error: null,
};

const productDetailSlice = createSlice({
  name: 'productDetail',
  initialState,
  reducers: {
    ProductDetailRequest(state) {
    state.loading = true;
      state={...state}
    },
    ProductDetailSuccess(state, action) {
      state.loading = false;
      state.product = action.payload.product;
    },
    ProductDetailFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors(state) {
      state.error = null;
      state={...state}
    },
  },
});

export const {
  ProductDetailRequest,
  ProductDetailSuccess,
  ProductDetailFail,
  clearErrors,
} = productDetailSlice.actions;

export default productDetailSlice.reducer;
