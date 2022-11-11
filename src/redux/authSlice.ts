import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { ENDPOINT } from "../config/config";
import cartSlice, { setCartProducts } from "./cartSlice";

interface AuthState {
  accessToken: string;
  role: string;
  email: string;
  id: string;
  user?: UserInterface
}

const initialState: Partial<AuthState> = {
  accessToken: "",
  role: "",
  email: "",
  id: "",
};

export const authLogout = createAsyncThunk(
  "auth/logout",
  async (data: any, thunkAPI: any) => {
    thunkAPI.dispatch(authSlice.actions.logout());
    thunkAPI.dispatch(setCartProducts([]));
  }
)

export const reloadUserData = createAsyncThunk(
  "auth/reloadUserData",
  async (data: any, thunkAPI: any) => {
    const res = await axios.get(ENDPOINT + "/user/me");
    return res.data.data;
  }
)


export const authSlice = createSlice({
  name: "authenticate",
  initialState,
  reducers: {
    updateToken: (state, action: PayloadAction<AuthState>) => {
      state.accessToken = action.payload.accessToken;
      state.role = action.payload.role;
      state.email = action.payload.email;
      state.id = action.payload.id;
      state.user = action.payload.user;
      localStorage.setItem("accessToken", action.payload.accessToken);      
    },
    logout: (state) => {
      state.accessToken = "";
      state.role = "";
      state.email = "";
      state.id = "";
      localStorage.removeItem("accessToken");
    },
    setUser: (state, action: PayloadAction<UserInterface>) => {
      state.user = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(reloadUserData.fulfilled, (state, action) => {
      state.user = action.payload;
    })
  }
});

export const { updateToken, logout, setUser } = authSlice.actions;
export default authSlice.reducer;
