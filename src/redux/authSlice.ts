import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import cartSlice, { setCartProducts } from "./cartSlice";

interface AuthState {
  accessToken: string;
  role: string;
  email: string;
  id: string;
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

export const authSlice = createSlice({
  name: "authenticate",
  initialState,
  reducers: {
    updateToken: (state, action: PayloadAction<AuthState>) => {
      state.accessToken = action.payload.accessToken;
      state.role = action.payload.role;
      state.email = action.payload.email;
      state.id = action.payload.id;
      //save accessToken to localStorage
      localStorage.setItem("accessToken", action.payload.accessToken);      
    },
    logout: (state) => {
      state.accessToken = "";
      state.role = "";
      state.email = "";
      state.id = "";
      //remove accessToken from localStorage
      localStorage.removeItem("accessToken");
    },
  },
});

export const { updateToken, logout } = authSlice.actions;
export default authSlice.reducer;
