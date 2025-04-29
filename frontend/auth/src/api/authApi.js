import axios from 'axios';

export async function loginApi(email, password) {
  try {
    const res = await axios.post('http://localhost:4000/api/login', { email, password });
    localStorage.setItem('token', res.data.token);
    return res.data;
  } catch (err) {
    alert('Login failed');
    return null;
  }
}

export async function registerApi(email, password) {
  try {
    await axios.post('http://localhost:4000/api/register', { email, password });
  } catch (err) {
    alert('Registration failed');
  }
}
