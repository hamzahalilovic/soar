import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { User } from "../../types/User";

interface UserState {
  user: User | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: UserState = {
  user: null,
  status: "idle",
  error: null,
};

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const response = await axios.get("http://localhost:5001/user");
  return response.data;
});

export const updateUser = createAsyncThunk(
    "user/updateUser",
    async (updatedData: Partial<User>) => {
      const response = await axios.put("http://localhost:5001/user", updatedData);
      return response.data.user;
    }
  );

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch user.";
      })
      .addCase(updateUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = { ...state.user, ...action.payload };
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to update user.";
      });
  },
});

export default userSlice.reducer;
