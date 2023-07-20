import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiInstance from "../helpers/httpClient";

export const registerAccount = createAsyncThunk(
  "register",
  async ({ lastName, firstName, password, email }) => {
    apiInstance
      .post(
        "/auth/signup",
        { lastName, firstName, password, email },
        {
          headers: { "x-gigawatts": "1.21" },
        }
      )
      .then((res) => {
        console.log("123", res);
      });
  }
);

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
