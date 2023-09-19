import http from './http'

http.interceptorsed()

interface logins {
    username: string
    password: string
}
export const loginApi = (data: logins) => http.request({ method: 'post', url: '/login', data })

export const rightsApi = () => http.request({ method: 'get', url: `/menus` })

interface categories {
    query?: string
    pagenum: number
    pagesize: number
}
export const categoriesApi = (params: categories) => http.request({ method: 'get', url: `/goods`, params })