import axios from "axios";
import { toast } from "react-toastify";
import logger from "./logServices"

axios.interceptors.response.use(null, error => {
    
    const expectedError =
        error.response &&
        error.response.status === 403 ||
        error.response.status === 401 ||
        error.response.status === 403

        if(expectedError) {
            logger.log(error)
            toast.error("Unexpected Error Occured")
        }

    return Promise.reject(error);
})

export default {
    get: axios.get,
    put: axios.put,
    post: axios.post,
    delete: axios.delete
}
