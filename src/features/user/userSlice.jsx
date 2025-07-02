import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import usersData from '../../data/users.json';

// fetchUsers thunk - returns all users or one user from current store (simulate async)
export const fetchUsers = createAsyncThunk('users/fetchUsers', async (id = null, { getState }) => {
  const stateUsers = getState().users.users;
  if (id) {
    const user = stateUsers.find(u => u.id.toString() === id.toString());
    return user ? [user] : [];
  }
  return stateUsers;
});

export const addUser = createAsyncThunk('users/addUser', async (user, { getState }) => {
  const state = getState();
  const existingUsers = state.users.users;

  // Find max ID in current users
  const maxId = existingUsers.length > 0
    ? Math.max(...existingUsers.map(u => u.id || 0))
    : 0;

  return { ...user, id: maxId + 1 };
});


export const updateUser = createAsyncThunk('users/updateUser', async (user) => {
  return user;
});

export const deleteUser = createAsyncThunk('users/deleteUser', async (id) => {
  return id;
});

const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: usersData,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      // fetchUsers
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
        state.error = action.payload;
      })
      // addUser
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
        state.loading = false;
      })
      // updateUser
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(u => u.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
        state.loading = false;
      })
      // deleteUser
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(u => u.id !== action.payload);
        state.loading = false;
      });
  },
});

export default userSlice.reducer;
