import axios from 'axios'

export const OK = 200
export const FORBIDDEN = 403
export const UNAUTHORIZED = 401

export const httpClient = axios.create({
  baseURL: 'http://localhost:3010',
  headers: {
    'Access-Control-Allow-Origin': '*'
  }

})
