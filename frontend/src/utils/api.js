import axios from "axios"

const token = localStorage.getItem('token') 

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : ''
  },
  withCredentials: true
})

export default API