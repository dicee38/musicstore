import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: null,
  role: null,
  token: localStorage.getItem('token') || null,
  isAuth: !!localStorage.getItem('token'),
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.token = action.payload.token;
      state.isAuth = true;
      localStorage.setItem('token', action.payload.token);
    },
    logout: (state) => {
      localStorage.removeItem('token');
      state.email = null;
      state.role = null;
      state.token = null;
      state.isAuth = false;
    }
  }
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
