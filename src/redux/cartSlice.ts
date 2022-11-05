import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

//global
interface CartState {
    products: ProductCartInterface[];
}


const initialState: Partial<CartState> = {
    products: []
};

export const authSlice = createSlice({
    name: "authenticate",
    initialState,
    reducers: {
        addProductToCart: (state, action: PayloadAction<ProductCartInterface>) => {
            if(!state.products) {
                state.products = [];
            }
            const index = state.products.findIndex((product) => product.productId === action.payload.productId && product.size === action.payload.size);
            if (index !== -1) {
                state.products[index].quantity += action.payload.quantity;
            }
            else {
                state.products.push(action.payload);
            }
        },
        removeProductFromCart: (state, action: PayloadAction<ProductCartInterface>) => {
            if(!state.products) {
                state.products = [];
            }
            const index = state.products.findIndex((product) => product.productId === action.payload.productId && product.size === action.payload.size);
            if (index !== -1) {
                state.products.splice(index, 1);
            }
        },
        updateProductQuantity: (state, action: PayloadAction<ProductCartInterface>) => {
            if(!state.products) {
                state.products = [];
            }
            const index = state.products.findIndex((product) => product.productId === action.payload.productId && product.size === action.payload.size);
            if (index !== -1) {
                state.products[index].quantity = action.payload.quantity;
            }
        }

    },
});

export const { addProductToCart, removeProductFromCart, updateProductQuantity } = authSlice.actions;
export default authSlice.reducer;
