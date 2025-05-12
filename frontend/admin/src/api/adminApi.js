import axios from 'axios';

export async function fetchEntities(entityName) {
  const res = await axios.get(`http://localhost:4006/api/${entityName}`);
  return res.data;
}
