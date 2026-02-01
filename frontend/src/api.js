import axios from 'axios';

// Automatically points to your backend URL
const API_URL = 'http://localhost:8000'; 

export const api = axios.create({
  baseURL: API_URL,
});
