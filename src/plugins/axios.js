import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://nodejs-test-api-blog.herokuapp.com/api/v1',
  timeout: 5000,
  headers: {
    'Content-type': 'application/json',
  },
})

instance.interceptors.request.use((instance) => {
  const token = localStorage.getItem('token')
  if (token) {
    instance.headers['Authorization'] = 'Bearer ' + token
  }
  return instance
})

export default instance
