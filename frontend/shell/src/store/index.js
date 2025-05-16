import { configureStore } from '@reduxjs/toolkit';
import userReducer, { logout, login } from 'auth/store/userSlice';
import cartReducer, { addToCart, removeFromCart, clearCart, decrementQuantity } from './cartSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
});

export default store;
export { logout, login, addToCart, removeFromCart, clearCart, decrementQuantity };
