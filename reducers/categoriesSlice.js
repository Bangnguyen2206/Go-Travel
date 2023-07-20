import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiInstance from "../helpers/httpClient";
import { setDataToStorage } from "../utils/utils";
import { create } from "apisauce";

const accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImVtYWlsIjoidGVzdDFAZ21haWwuY29tIiwiaWF0IjoxNjg5ODM5ODcyLCJleHAiOjE2ODk5Mjk4NzJ9.3cgF8VuHdu-rDA52Cq6udz5UZTx3-xBY6EhTwrfWhCg";

export const getCategories = createAsyncThunk("categories", async () => {
  const api = create({
    baseURL: "http://streaming.nexlesoft.com:3001/categories",
    headers: {
      Accept: "application/vnd.github.v3+json",
      Authorization: "Bearer " + accessToken,
    },
  });
  try {
    const response = await api.get("/categories");
    console.log(response);
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
