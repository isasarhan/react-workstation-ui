import http from './httpServices'
import config from '../config.json'

const apiUrl = `${config.apiUrl}/customers/`

export const getCustomer = (id) => {
    return http.get(apiUrl + id)
}
export const getCustomers = () => {
    return http.get(apiUrl)
}
export const saveCustomer = (customer) => {
    if (customer._id) {
        let body = { ...customer }
        delete body._id
        return http.put(`${apiUrl}/${customer._id}`, body);
    }
    return http.post(apiUrl, customer)
}
export const deleteCustomer = (id) => {
    return http.delete(`${apiUrl}/${id}`)
}