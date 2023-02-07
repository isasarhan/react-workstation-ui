import http from './httpServices'
import config from '../config.json'


const apiUrlUsers = `${config.apiUrl}/users`
const apiUrlAuth = `${config.apiUrl}/auth`

export const registerUser = (user) => {
    return http.post(`${apiUrlAuth}/register/`, user)
}
export const loginUser = (user) => {
    return http.post(`${apiUrlAuth}/login/`, user)
}



