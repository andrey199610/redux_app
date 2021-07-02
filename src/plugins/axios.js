import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://nodejs-test-api-blog.herokuapp.com/api/v1',
  timeout: 5000,
  headers: {
    'Content-type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  },
})

export default instance
