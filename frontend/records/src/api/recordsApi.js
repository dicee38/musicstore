import axios from 'axios';

export async function getAllRecords() {
  const res = await axios.get('http://localhost:4002/api/records');
  return res.data;
}

export async function getRecordById(id) {
  const res = await axios.get(`http://localhost:4002/api/records/${id}`);
  return res.data;
}
