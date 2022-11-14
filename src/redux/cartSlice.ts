import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";
import axios from "axios";
import { toast } from "react-toastify";
import { ENDPOINT } from "../config/config";
import { DEFAULT_COUPONS } from "../config/constant";
import { RootState, useAppDispatch, useAppSelector } from './store';
import { v4 as uuidv4 } from 'uuid';

interface CartState {
    products: ProductCartInterface[];
    orderInformation: OrderInformation | null;
    isLoading: boolean;
    couponCode?: couponCode

}

type couponCode = Array<string>;



const initialState: Partial<CartState> = {
    products: [],
    orderInformation: null,
    isLoading: false,
    couponCode: DEFAULT_COUPONS
};

export const fetchCart = createAsyncThunk(
    "cart/fetchCart",
    async (payload: any, thunkAPI: any) => {
        const state = thunkAPI.getState() as RootState;
        const dispatch = thunkAPI.dispatch;
        const loading = state.cart.isLoading;
        if (loading) {
            return;
        }
        const response = await axios.get(`${ENDPOINT}/user/cart/all`);
        dispatch(setOrderInformation(null))
        return response.data?.data;
    }
);

export const addCartProduct = createAsyncThunk(
    "cart/addCartProduct",
    async (payload: any, thunkAPI: any) => {
        const state = thunkAPI.getState() as RootState;
        const dispatch = thunkAPI.dispatch;
        const { checked } = payload;

        let arr = state.cart.products || [];
        if (state.account.accessToken) {
            const response = await axios.post(`${ENDPOINT}/user/cart/add`, payload);
            arr = mapCartToProductCartInterface(response.data.data)
        } else {
            const res = await axios.get(`${ENDPOINT}/product/${payload.productId}`);
            const currentQuantity = arr.find((item: ProductCartInterface) => item.productId === payload.productId)?.quantity || 0;
            const uuid = uuidv4();
            const productCart: ProductCartInterface = {
                id:uuid,
                product: res.data.data,
                quantity: payload.quantity + currentQuantity,
                productId: payload.productId
            }
            if (currentQuantity <= 0) {
                arr = [...arr, productCart];
            } else if (productCart.quantity > 0) {
                arr = arr.map((item: ProductCartInterface) => {
                    if (item.productId === payload.productId) {
                        return productCart;
                    }
                    return item;
                })
            } else {
                arr = arr.filter((item: ProductCartInterface) => item.productId !== payload.productId);
            }
        }

        const newArr = [];

        if (checked) {
            for (let i = 0; i < arr.length; i++) {
                const item = arr[i];
                newArr.push({ ...item, checked: item.productId == payload.productId });
            }
        }

        return newArr;
    }
);

function mapCartToProductCartInterface(cart: any[]): ProductCartInterface[] {
    return cart.map((item: any) => ({ ...item, productId: item.product.id }));
}
export const deleteCart = createAsyncThunk(
    "cart/deleteCart",
    async (payload: ProductCartInterface, thunkAPI: any) => {
        const state = thunkAPI.getState() as RootState;
        const loading = state.cart.isLoading;
        if (loading) {
            return;
        }

        if (!state.account.accessToken) {
            let products = state.cart.products || [];
            //remove product from products
            products = products.filter((product) => product.productId !== payload.productId);
            return products;
        } else {
            const response = await axios.delete(`${ENDPOINT}/user/cart/${payload.id}`);
            return mapCartToProductCartInterface(response.data?.data);
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
            if (state.products) {
                const index = state.products.findIndex((product) => product.id === action.payload.id);
                if (index != undefined && index !== -1) {
                    state.products[index].checked = !state.products[index].checked;
                }
            }
        },
        setCartProductChecked: (state, action: PayloadAction<ProductCartInterface>) => {
            if (state.products) {
                const index = state.products.findIndex((product) => product.id === action.payload.id);
                if (index != undefined && index !== -1) {
                    state.products[index].checked = true;
                }
            }
        },
        setOrderInformation: (state, action: PayloadAction<OrderInformation | null>) => {
            state.orderInformation = action.payload;
        },
        setCartCouponCode: (state, action: PayloadAction<couponCode>) => {
            state.couponCode = action.payload;
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

export const { setCartProducts, setCartLoading, toggleCheckedCart, setOrderInformation, setCartCouponCode, setCartProductChecked } = authSlice.actions;
export default authSlice.reducer;
