import axios from 'axios'
const baseURL = 'http://nexifytw.mynetgear.com:45000/api/Record'

export const apiHelper = axios.create({ baseURL })
