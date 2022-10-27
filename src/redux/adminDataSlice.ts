import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface AdminDataState {
    categories: null | CategoryInterface[];
    products: null | any[];
}

const initialState: Partial<AdminDataState> = {
    categories: null,
    products: null,
};

export const adminDataSlice = createSlice({
  name: "adminData",
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<CategoryInterface []>) => {
        state.categories = action.payload;      
    },
    setProducts: (state, action: PayloadAction<any []>) => {
        state.products = action.payload;      
    }
  },
});

export const { setCategories, setProducts } = adminDataSlice.actions;
export default adminDataSlice.reducer;
