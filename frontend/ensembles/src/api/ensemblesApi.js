import axios from 'axios';

export async function getAllEnsembles() {
  const res = await axios.get('http://localhost:4003/api/ensembles');
  return res.data;
}

export async function getEnsembleById(id) {
  const res = await axios.get(`http://localhost:4003/api/ensembles/${id}`);
  return res.data;
}
