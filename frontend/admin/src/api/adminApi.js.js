import axios from 'axios';

const API = 'http://localhost:4006/api';

export const getAll = (entity) => axios.get(`${API}/${entity}`).then(res => res.data);

export const create = (entity, data) => axios.post(`${API}/${entity}`, data).then(res => res.data);

export const update = (entity, id, data) => axios.put(`${API}/${entity}/${id}`, data).then(res => res.data);

export const remove = (entity, id) => axios.delete(`${API}/${entity}/${id}`);
