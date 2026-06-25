// eslint-disable-next-line react-refresh/only-export-components
import axios from 'axios'
const URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'
export const api = axios.create({
  baseURL: URL,
})
