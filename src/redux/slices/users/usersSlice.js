import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { siteURL } from "../../../utils";
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  try {
    const response = await axios.get(`${siteURL}/users`);
    return response.data;
  } catch (err) {
    return err.meassage;
  }
});
const initialState = [];

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectAllUsers = (state) => state.users;
export const getUserById = (state, userId) =>
  state.users.find((user) => user.id === Number(userId));
export default usersSlice.reducer;
