import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/userSlice';
import { loginApi } from '../api/authApi';
import { Link } from 'react-router-dom'; // Импортируем Link для перехода

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = await loginApi(email, password);
    if (userData) {
      dispatch(login(userData));
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>

      {/* Добавляем ссылку на страницу регистрации */}
      <p>Don't have an account? <Link to="/auth/register">Register</Link></p>
    </div>
  );
}
