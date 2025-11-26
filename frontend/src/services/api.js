// frontend/src/services/api.js
import axios from "axios";

const API_BASE = "http://localhost:5000/api";

export const getDocuments = () =>
  axios.get(`${API_BASE}/documents`).then((res) => res.data);

export const getDocumentById = (id) =>
  axios.get(`${API_BASE}/documents/${id}`).then((res) => res.data);

export const createDocument = (title) =>
  axios.post(`${API_BASE}/documents`, { title }).then((res) => res.data);

export const updateDocument = (id, payload) =>
  axios.put(`${API_BASE}/documents/${id}`, payload).then((res) => res.data);

export const deleteDocument = (id) =>
  axios.delete(`${API_BASE}/documents/${id}`).then((res) => res.data);