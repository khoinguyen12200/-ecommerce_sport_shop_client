import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";
import axios from "axios";
import { toast } from "react-toastify";
import { ENDPOINT } from "../config/config";
import { RootState, useAppDispatch, useAppSelector } from './store';

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
        const state = thunkAPI.getState() as RootState;
        const loading = state.cart.isLoading;
        if (loading) {
            return;
        }
        thunkAPI.dispatch(setCartLoading(true));
        const response = await axios.get(`${ENDPOINT}/user/cart/all`);
        return response.data?.carts;
    }
);

export const addCartProduct = createAsyncThunk(
    "cart/addCartProduct",
    async (payload: any, thunkAPI: any) => {
        const state = thunkAPI.getState() as RootState;
        const loading = state.cart.isLoading;
        if (loading) {
            return;
        }
        console.log("addCartProduct", payload);
        const response = await axios.post(`${ENDPOINT}/user/cart/add`, payload);
        return mapCartToProductCartInterface(response.data);
    }
);

function mapCartToProductCartInterface(cart:  any[]): ProductCartInterface[] {
    return cart.map((item:any) => ({...item, productId: item.product.id}));
}
export const deleteCart = createAsyncThunk(
    "cart/deleteCart",
    async (payload: ProductCartInterface, thunkAPI: any) => {
        const state = thunkAPI.getState() as RootState;
        const loading = state.cart.isLoading;
        if (loading) {
            return;
        }

        if(!state.account.accessToken) {
            let products = state.cart.products || [];
            //remove product from products
            products = products.filter((product) => product.productId !== payload.productId);
            return products;
        } else {
            thunkAPI.dispatch(setCartLoading(true));
            const response = await axios.delete(`${ENDPOINT}/user/cart/${payload.id}`);
            thunkAPI.dispatch(setCartLoading(false));
            return mapCartToProductCartInterface(response.data?.carts);
        }
   
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

        builder.addCase(addCartProduct.fulfilled, (state, action) => {
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
