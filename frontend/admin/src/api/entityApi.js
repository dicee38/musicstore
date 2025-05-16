import axios from 'axios';

const API_BASE = 'http://localhost:4006/api';

export const getEntities = (entity) =>
  axios.get(`${API_BASE}/${entity}`).then((res) => res.data);

export const createEntity = (entity, data) =>
  axios.post(`${API_BASE}/${entity}`, data).then((res) => res.data);

export const updateEntity = (entity, id, data) =>
  axios.put(`${API_BASE}/${entity}/${id}`, data).then((res) => res.data);

export const deleteEntity = (entity, id) =>
  axios.delete(`${API_BASE}/${entity}/${id}`);
