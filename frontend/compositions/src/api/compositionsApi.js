import axios from 'axios';

export async function getAllCompositions() {
  const res = await axios.get('http://localhost:4004/api/compositions');
  return res.data;
}

export async function getCompositionById(id) {
  const res = await axios.get(`http://localhost:4004/api/compositions/${id}`);
  return res.data;
}
