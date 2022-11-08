import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";
import axios from "axios";
import { toast } from "react-toastify";
import { ENDPOINT } from "../config/config";

interface CartState {
    products: ProductCartInterface[];
    isLoading: boolean;
}


const initialState: Partial<CartState> = {
    products: [],
    isLoading: false,
};

export const fetchCart = createAsyncThunk(
    "cart/fetchCart",
    async (payload: any, thunkAPI: any) => {
        const loading = thunkAPI.getState().cart.isLoading;
        if (loading) {
            return;
        }
        thunkAPI.dispatch(setCartLoading(true));
        const response = await axios.get(`${ENDPOINT}/user/cart/all`);
        return response.data?.carts;
    }
);

export const updateCart = createAsyncThunk(
    "cart/updateCart",
    async (payload: ProductCartInterface, thunkAPI: any) => {
        const loading = thunkAPI.getState().cart.isLoading;
        if (loading) {
            console.log("loading", loading);
            return;
        }
        thunkAPI.dispatch(setCartLoading(true));
        const response = await toast.promise(
            axios.put(`${ENDPOINT}/user/cart`, {
                cart: payload
            }),
            {
                pending: "Đang cập nhật giỏ hàng",
                success: "Cập nhật giỏ hàng thành công",
                error: "Cập nhật giỏ hàng thất bại",
            }
        );
        thunkAPI.dispatch(setCartLoading(false));
        return response.data?.carts;
    }
);

export const deleteCart = createAsyncThunk(
    "cart/deleteCart",
    async (payload: ProductCartInterface, thunkAPI: any) => {
        const loading = thunkAPI.getState().cart.isLoading;
        if (loading) {
            return;
        }
        thunkAPI.dispatch(setCartLoading(true));
        const response = await axios.delete(`${ENDPOINT}/user/cart/${payload.id}`);
        thunkAPI.dispatch(setCartLoading(false));
        return response.data?.carts;
    }
);



export const authSlice = createSlice({
    name: "authenticate",
    initialState,
    reducers: {
        setCartProducts: (state, action: PayloadAction<ProductCartInterface[]>) => {
            state.products = action.payload;
        },
        setCartLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        toggleCheckedCart: (state, action: PayloadAction<ProductCartInterface>) => {
            if(state.products) {
                const index = state.products.findIndex((product) => product.id === action.payload.id);
                if (index != undefined && index !== -1) {
                    state.products[index].checked = !state.products[index].checked;
                }
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCart.fulfilled, (state, action) => {
            state.products = action.payload;
            state.isLoading = false;
        });

        builder.addCase(updateCart.fulfilled, (state, action) => {
            state.products = action.payload;
            state.isLoading = false;
        })

        builder.addCase(deleteCart.fulfilled, (state, action) => {
            state.products = action.payload;
            state.isLoading = false;
        });
    }
});

export const { setCartProducts, setCartLoading, toggleCheckedCart } = authSlice.actions;
export default authSlice.reducer;
