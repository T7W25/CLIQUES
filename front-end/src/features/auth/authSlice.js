import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post('/auth/user/login', credentials); // Adjust the endpoint as per your backend
      const { token, user } = response.data;

      // Save token in localStorage
      localStorage.setItem('token', token);

      return user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Invalid credentials'
      );
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('token');
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, setUser, loginSuccess } = authSlice.actions;
export default authSlice.reducer;
