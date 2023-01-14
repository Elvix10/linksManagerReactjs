import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/axios";

export const getMyLinks = createAsyncThunk("getLinks", async () => {
  try {
    const response = await axiosInstance.get(`/links`);

    return response.data;
  } catch (error) {
    console.log(error.response.data);
  }
});

export const getMyLinksScrapped = createAsyncThunk("crawler", async () => {
  try {
    const response = await axiosInstance.get(`/crawler`);

    return response.data;
  } catch (error) {
    console.log(error.response.data);
  }
});

const linkAdapter = createEntityAdapter({});

const linksSlice = createSlice({
  name: "link",
  initialState: linkAdapter.getInitialState({
    links: [],
    linksScraped: [],
  }),

  extraReducers: {
    [getMyLinks.fulfilled]: (state, action) => {
      state.links = action.payload;
    },
    [getMyLinksScrapped.fulfilled]: (state, action) => {
      state.linksScraped = action.payload;
    },
  },
});

export default linksSlice.reducer;
