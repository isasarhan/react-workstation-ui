import http from './httpServices'
import config from '../config.json'


const apiUrl = `${config.apiUrl}/balances`

export const getBalances = () => {
    return http.get(`${apiUrl}`)
}

export const saveBalance = (balance) => {
    if (balance._id) {
        let body = { ...balance }
        delete body._id
        return http.put(`${apiUrl}/${balance._id}`, body)
    }
    console.log(balance);
    return http.post(`${apiUrl}/`, balance)
}
