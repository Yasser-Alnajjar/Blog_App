import {
  createAsyncThunk,
  createSlice,
  createSelector,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";
import { sub } from "date-fns";
import { siteURL } from "../../../utils";
import toast from "react-hot-toast";
const postAdapter = createEntityAdapter({
  sortComparer: (a, z) => z.date.localeCompare(a.date),
});
const initialState = postAdapter.getInitialState({
  status: "idle",
  error: null,
});
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  try {
    const response = await axios.get(`${siteURL}/posts`);
    return response.data;
  } catch (error) {
    return error.message;
  }
});
export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post(`${siteURL}/posts`, payload);
      thunkAPI.dispatch(toast.success("Post Added"));
      return response.data;
    } catch (error) {
      // thunkAPI.dispatch(toast.error(error.message));
      return error.message;
    }
  }
);
export const updatePost = createAsyncThunk(
  "post/updatePost",
  async (payload, thunkAPI) => {
    const { id } = payload;
    try {
      const response = await axios.put(`${siteURL}/posts/${id}`, payload);
      return response.data;
    } catch (error) {
      thunkAPI.dispatch(toast.error(error.message));
      return error.message;
    }
  }
);
export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (payload, thunkAPI) => {
    const { id } = payload;
    try {
      const response = await axios.delete(`${siteURL}/posts/${id}`);
      if (response?.status === 200) return payload;
      thunkAPI.dispatch(toast.success(response?.statusText));
      return `${response?.status} : ${response?.statusText}`;
    } catch (err) {
      thunkAPI.dispatch(toast.error(err.message));
      return err.message;
    }
  }
);
const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.entities[postId];
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        let min = 1;
        const loadedPosts = action.payload.map((post) => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString();
          post.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            sad: 0,
            executed: 0,
          };
          return post;
        });
        /* normal Case
          state.posts = state.posts.concat(loadedPosts); 
        */
        // Adaptor Case
        postAdapter.upsertMany(state, loadedPosts);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        action.payload.date = new Date().toISOString();
        action.payload.reactions = {
          thumbsUp: 0,
          wow: 0,
          heart: 0,
          sad: 0,
          executed: 0,
        };
        /* normal Case
          state.posts.push(action.payload);
        */
        // Adaptor Case
        postAdapter.addOne(state, action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("Update Could not Complete");
          console.log(action.payload);
          return;
        }
        action.payload.date = new Date().toISOString();
        /* normal Case
          const { id } = action.payload;
          const posts = state.posts.filter((post) => post.id !== id);
          state.posts = [...posts, action.payload];
        */
        // Adaptor Case
        postAdapter.upsertOne(state, action.payload);
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          toast.error("Delete Could not Complete");
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        /* Normal Case
        const posts = state.posts.filter((post) => post.id !== id);
        state.posts = posts;
        */
        //  Adapter Case
        postAdapter.removeOne(state, id);
      });
  },
});

export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;
export const getCount = (state) => state.posts.count;
/* Normal Case
export const selectAllPosts = (state) => state.posts.posts;
export const getPostById = (state, postId) =>
  state.posts.posts.find((post) => {
      return post.id === +postId;
})
*/
// Adapter Case
export const {
  selectAll: selectAllPosts,
  selectById: getPostById,
  selectIds: selectPostIds,
} = postAdapter.getSelectors((state) => state.posts);

export const selectPostByUser = createSelector(
  [selectAllPosts, (state, userId) => userId],
  (posts, userId) => posts.filter((post) => post.userId === Number(userId))
);
export const { reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;
