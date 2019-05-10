import axios from 'axios'
import camelcaseKeys from 'camelcase-keys'
const apiBaseUrl = 'https://punainentupademo.mycashflow.fi/api/v1'
const apiAuth = {
  username: 'atte.gartman@gmail.com',
  password: 'd73a9e6d78c3fdd13f48a85ebb0de9e751e47c5c',
}
const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
  timeout: 2000,
  auth: apiAuth,
})

const logServerError = (err: Error) => {
  console.error(err)
}

export const getAllProducts = async () => {
  return axiosInstance
    .get('/products')
    .then(response => {
      return camelcaseKeys(response.data.data)  
    })
    .catch(logServerError)
}
