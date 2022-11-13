import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { ENDPOINT } from "../config/config";

interface AdminDataState {
  categories: null | CategoryInterface[];
  products: null | any[];
}

const initialState: Partial<AdminDataState> = {
  categories: null,
  products: null,
};

export const fetchProducts = createAsyncThunk(
  "adminData/fetchProducts",
  async () => {
    const res = await axios.get(ENDPOINT + '/admin/product');
    return res?.data?.products;
  }
);

export const fetchCategories = createAsyncThunk(
  "adminData/fetchCategories",
  async () => {
    const res = await axios.get(ENDPOINT + '/admin/category');
    return res?.data?.data;
  }
);


export const adminDataSlice = createSlice({
  name: "adminData",
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<CategoryInterface[]>) => {
      state.categories = action.payload;
    },

    setProducts: (state, action: PayloadAction<any[]>) => {
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
  }
});

export const { setCategories, setProducts } = adminDataSlice.actions;
export default adminDataSlice.reducer;
