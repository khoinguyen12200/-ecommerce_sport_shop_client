import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

export const authSlice = createSlice({
  name: "authenticate",
  initialState,
  reducers: {
    updateToken: (state, action: PayloadAction<AuthState>) => {
      state.accessToken = action.payload.accessToken;
      state.role = action.payload.role;
      state.email = action.payload.email;
      state.id = action.payload.id;
    },
  },
});

export const { updateToken } = authSlice.actions;
export default authSlice.reducer;
