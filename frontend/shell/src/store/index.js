// shell/src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer, { logout, login } from 'auth/store/userSlice'; // 👈 импорт из REMOTE auth

const store = configureStore({
  reducer: {
    user: userReducer
  },
});

export default store;
export { logout, login  };