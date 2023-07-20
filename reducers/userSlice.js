import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiInstance from "../helpers/httpClient";

export const registerAccount = createAsyncThunk("register", async (values) => {
  apiInstance
    .post("/auth/signup", values, {
      headers: { "x-gigawatts": "1.21" },
    })
    .then((res) => {
      console.log(res);
    });
});

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    isLoading: false,
  },
  extraReducers: {
    [registerAccount.pending]: (state) => {
      state.isLoading = true;
    },
    [registerAccount.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    [registerAccount.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default userSlice.reducer;
