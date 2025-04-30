import axios from 'axios';

export async function fetchEntities(entityName) {
  const res = await axios.get(`http://localhost:4000/api/${entityName}`);
  return res.data;
}
