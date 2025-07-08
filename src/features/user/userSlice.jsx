import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = 'http://localhost:3001/users';

// Fetch all users (GET /users)
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const res = await axios.get(API);
  return res.data; // JSON Server returns an array of users directly
});

// Add a new user (POST /users)
export const addUser = createAsyncThunk('users/addUser', async (user) => {
  const userToPost = { ...user };
  if (userToPost.id == null) {
    delete userToPost.id; // Remove id if null or undefined
  }
  const res = await axios.post(API, userToPost);
  return res.data;
});

// Update an existing user (PUT /users/:id)
export const updateUser = createAsyncThunk('users/updateUser', async (user) => {
  const res = await axios.put(`${API}/${user.id}`, user);
  return res.data;
});

// Delete a user (DELETE /users/:id)
export const deleteUser = createAsyncThunk('users/deleteUser', async (id) => {
  await axios.delete(`${API}/${id}`);
  return id;
});

const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      // Fetch users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Add user
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })

      // Update user
      .addCase(updateUser.fulfilled, (state, action) => {
        const idx = state.users.findIndex(u => u.id === action.payload.id);
        if (idx !== -1) {
          state.users[idx] = action.payload;
        }
      })

      // Delete user
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(u => u.id !== action.payload);
      });
  },
});

export default userSlice.reducer;
