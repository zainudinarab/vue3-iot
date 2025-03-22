import axios from 'axios'

const api = axios.create({
  baseURL: 'http://iot-unipdu.test/api', // Ganti dengan URL API kamu
  headers: {
    'Content-Type': 'application/json',
  },
})

// Menambahkan token ke header setiap request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default api
