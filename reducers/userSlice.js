import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiInstance from "../helpers/httpClient";
import { setDataToStorage } from "../utils/utils";

export const registerAccount = createAsyncThunk("register", async (values) => {
  try {
    const response = await apiInstance.post("/auth/signup", values);
    if (response.data) {
      setDataToStorage("user", JSON.stringify(response.data));
    }
    return response.data;
  } catch (err) {
    console.error(err);
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
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
