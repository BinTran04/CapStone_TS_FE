import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { authService } from "../../services/authService";
import type { LoginPayload, LoginResponse } from "../../types/authTypes";

interface AuthState {
  currentUser: LoginResponse | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  currentUser: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string)
    : null,
  isLoading: false,
  error: null,
};

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (payload: LoginPayload, { rejectWithValue }) => {
    try {
      const response = await authService.login(payload);
      const data = response.data;
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("user", JSON.stringify(data));

      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Đăng nhập thất bại");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.currentUser = null;
      state.error = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        loginThunk.fulfilled,
        (state, action: PayloadAction<LoginResponse>) => {
          state.isLoading = false;
          state.currentUser = action.payload;
        }
      )
      .addCase(loginThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
