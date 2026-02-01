import axios from 'axios';

// Automatically points to your backend URL
const API_URL = 'https://hrms-lite-api-yi1s.onrender.com'; 

export const api = axios.create({
  baseURL: API_URL,
});
