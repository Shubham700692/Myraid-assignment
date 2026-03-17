import axios from "axios"

const API = axios.create({
  baseURL:import.meta.env.VITE_API_URL,
  
   method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : ''
  },
  credentials: 'include' 
})

export default API