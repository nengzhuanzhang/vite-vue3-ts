/* eslint-disable no-debugger */
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

class HttpRequest {
  private readonly baseURL: string
  constructor() {
    this.baseURL = import.meta.env.VITE_HTTP
    console.log('baseURL', this.baseURL)
  }
  getInsideConfig() {
    const config = {
      baseURL: this.baseURL,
      timeout: 10000,
      headers: {
        //headers
      }
    }
    return config
  }

  // 拦截
  interceptors(instance: AxiosInstance, url: string | number | undefined) {
    // 请求拦截
    instance.interceptors.request.use(
      config => {
        // 添加全局的loading..
        // 请求头携带token
        return config
      },
      (error: any) => {
        return Promise.reject(error)
      }
    )
    //响应拦截
    instance.interceptors.response.use(
      res => {
        //返回数据
        const { data } = res
        console.log('返回数据处理', res)
        return data
      },
      (error: any) => {
        console.log('error==>', error)
        return Promise.reject(error)
      }
    )
  }

  request(options: AxiosRequestConfig) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)

    this.interceptors(instance, options.url)

    return instance(options)
  }
}
const http = new HttpRequest()
export default http
