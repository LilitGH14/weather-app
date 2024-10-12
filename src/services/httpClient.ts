import axios from 'axios'

const instance = axios.create({})
const headers = {
  'content-type': 'application/json',
  'access-control-allow-origin': '*',
}

const onFulfilled = (response: any): any => response?.data

const get = async <T>(url: string, config?: any) => {
  return await instance.get<T>(url, { ...config, ...headers }).then(onFulfilled)
}

const post = async <T, D>(
  url: string,
  data?: any,
  config?: any
): Promise<any> => {
  return await instance
    .post<T, D>(url, data, { ...config, ...headers })
    .then(onFulfilled)
}

export { get, post }
