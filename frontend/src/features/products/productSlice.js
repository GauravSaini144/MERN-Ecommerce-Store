// productSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  products: [],
  productsCount: 0,
  productPerPage:0,
  filteredProductCount:0,
  error: null,

};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    allProductRequest(state) {
      state.loading = true;
    },
    allProductSuccess(state, action) {
      state.loading = false;
      state.products = action.payload.products;
      state.productsCount = action.payload.countProduct;
      state.productPerPage=action.payload.productPerPage;
      state.filteredProductCount=action.payload.filteredProductCount;
    },
    allProductFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors(state) {
      state.error = null;
    },
  },
});

export const {
  allProductRequest,
  allProductSuccess,
  allProductFail,
  clearErrors,
} = productSlice.actions;

export default productSlice.reducer;
