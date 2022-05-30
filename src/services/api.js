import axios from 'axios'

export default axios.create({
  baseURL: 'https://swapi.dev/api/',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  timeout: 5000
})
