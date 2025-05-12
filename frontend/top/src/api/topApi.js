import axios from 'axios';

export async function getTopSales() {
  const res = await axios.get('http://localhost:4005/api/top');
  return res.data;
}
