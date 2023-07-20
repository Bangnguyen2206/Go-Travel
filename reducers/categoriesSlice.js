import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiInstance from "../helpers/httpClient";
import { setDataToStorage } from "../utils/utils";
import { create } from "apisauce";

const accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImVtYWlsIjoidGVzdDFAZ21haWwuY29tIiwiaWF0IjoxNjg5ODQwNjAwLCJleHAiOjE2ODk5MzA2MDB9.pWQQXwJoyAKI7XCqpPW6yGUIn5ztAMxBWyAAs0OlSCc";

export const getCategories = createAsyncThunk("categories", async () => {
  const api = create({
    baseURL: "http://streaming.nexlesoft.com:3001",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  try {
    const response = await api.get("/categories");
    return response.data;
  } catch (err) {
    console.error(err);
  }
});

export const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categories: {},
    isLoading: false,
  },
  extraReducers: {
    [getCategories.pending]: (state) => {
      state.isLoading = true;
    },
    [getCategories.fulfilled]: (state, action) => {
      state.categories = action.payload;
      state.isLoading = false;
    },
    [getCategories.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default categoriesSlice.reducer;
