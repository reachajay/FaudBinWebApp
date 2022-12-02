import axios from "axios";
import * as constant from '../constant';

export const loginApi = () => {
    const url = `${constant.BASE_URL}/auth/login`
    const headers = {
        "nationalId": "",
        "password": ""
    }
    axios.post(url, headers)
    .then((res) =>{
        if(res.status === true){
            return res
        }
    })
    .catch((e) => {
        return e
    })
}
