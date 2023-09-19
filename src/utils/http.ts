import axios, { AxiosInstance } from 'axios'
import { ElLoading } from 'element-plus'

interface option {
    method: 'get' | 'post' | 'put' | 'delete',
    url: string,
    data?: any,
    params?: any
}

class Http {
    http: AxiosInstance

    constructor() {
        this.http = axios.create({
            baseURL: 'http://shiyansong.cn:8888/api/private/v1',
            timeout: 5000
        })
    }

    requested() {
        this.http.interceptors.request.use(function (config) {

            let token = localStorage.getItem('token')
            if (token) {
                config.headers.Authorization = token
            }
            ElLoading.service({ fullscreen: true })
            return config
        }, function (error) {
            return Promise.reject(error)
        })
    }

    reponsed() {
        this.http.interceptors.response.use(function (response) {
            const loadingInstance = ElLoading.service({ fullscreen: true })
            // Loading should be closed asynchronously
            loadingInstance.close()
            return response
        }, function (error) {
            return Promise.reject(error)
        })
    }

    interceptorsed() {
        this.requested()
        this.reponsed()
    }

    async request(option: option) {
        let data = await this.http({ method: option.method, url: option.url, data: option.data, params: option.params })
        return data
    }
}

export default new Http()