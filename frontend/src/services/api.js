import axios from 'axios';

const API = axios.create({
  baseURL: 'https://taskmatetodo.onrender.com' // Replace with your real Render URL
});

export default API;
