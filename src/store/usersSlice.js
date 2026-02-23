import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchUsers as fetchUsersApi } from "../api/usersApi.js";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, thunkAPI) => {
    try {
      const data = await fetchUsersApi();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Failed to fetch users");
    }
  }
);

const initialState = {
  items: [],
  loading: false,
  error: "",
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.items.unshift(action.payload);
    },

    updateUser: (state, action) => {
      const { id, updates } = action.payload;
      const index = state.items.findIndex((u) => String(u.id) === String(id));

      if (index !== -1) {
        state.items[index] = {
          ...state.items[index],
          ...updates,
          company: {
            ...(state.items[index].company || {}),
            ...(updates.company || {}),
          },
          address: {
            ...(state.items[index].address || {}),
            ...(updates.address || {}),
          },
        };
      }
    },

    deleteUser: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((u) => String(u.id) !== String(id));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { addUser, updateUser, deleteUser } = usersSlice.actions;
export default usersSlice.reducer;