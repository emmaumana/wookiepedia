import axios from 'axios'
import { store } from '../store'
// import { loadCurretUser } from './helpers'

// const currentUser = loadCurretUser()

export default axios.create({
  baseURL: 'https://swapi.dev/api/',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 5000,
})