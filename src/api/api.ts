import { API_HOST } from '@/constants/env'
import axios from 'axios'

export const api = axios.create({
  timeout: 5000,
  baseURL: API_HOST,
  headers: {
    'Access-Control-Allow-Credentials': true,
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})
