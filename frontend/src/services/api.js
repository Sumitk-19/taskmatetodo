import axios from 'axios';

const API = axios.create({
  baseURL: 'https://taskmate-backend.onrender.com/api' // Replace with your actual Render backend URL
});

export default API;
