import ts from 'typescript';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ENDPOINT } from '../config/config';
import axios from 'axios';

export interface publicDataSlice {
    categories: CategoryInterface[];
}

const initialState: publicDataSlice = {
    categories: [],
};

export const getCategoriesData = createAsyncThunk(
    'publicData/getCategoriesData',
    async () => {
        console.log('asdfasdfasdfa')
        const res = await axios.get(ENDPOINT + '/categories');
        console.log('res', res);
        return res?.data?.data;
    }
);

export const fetchCategories = createAsyncThunk(
    "publicData/fetchCategories",
    async () => {
        const res = await axios.get(ENDPOINT + '/category');
        return res?.data?.data;
    }
);



export const publicDataSlice = createSlice({
    name: 'publicData',
    initialState,
    reducers: {
        setCategories: (state, action: PayloadAction<CategoryInterface[]>) => {
            state.categories = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCategoriesData.fulfilled, (state, action) => {
            state.categories = action.payload;
        });
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            state.categories = action.payload;
        }
        );
    }
});

export const { setCategories } = publicDataSlice.actions;
export default publicDataSlice.reducer;
