import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllPosts = createAsyncThunk("getAllPosts", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    rejectWithValue(error);
  }
});

const postSlice = createSlice({
  name: "posts",
  initialState: {
    loading: false,
    error: null,
    posts: [],
    totalPosts: 0,
  },
  reducers: {
    clearPosts: (state, action) => {
      state.posts = [];
      state.totalPosts = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
        state.totalPosts = action.payload.length;
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearPosts } = postSlice.actions;

export default postSlice.reducer;
