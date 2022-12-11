import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as constant from '../constant';
import { setFutureAppointmentData, setPastAppointmentData } from "../store/reducers/AppointmentData";
import { setOtherData } from "../store/reducers/UserData";

const ApiCall = () => {

    
    let data = useSelector(state => state.userData.userProfile);
    let token = useSelector(state => state.userData.token);
    let dispatch = useDispatch();
    
    const LoginApi = async() => {
        
        let response;
        // let result;
        const url = `${constant.BASE_URL}/auth/login`
        const headers = {
            "nationalId": "2316750625",
            "password": "sk@123"
        }
        await axios.post(url, headers)
        .then((res) => {
            if (res.status === 200) {
                response = res.data
            }
        })
        .catch((e) => {
            // return e
        })
        // console.log(result)
        return response
    }

    useEffect(() => {
        fetchUserData();
    }, [])
    
    const callApi = async() => {
    }
    
    const fetchUserData = async() => {
        const url = `${constant.BASE_URL}/patients/${data.patientId}`
        const headers = {
            token: token
        }

        await axios.get(url, {headers})
        .then((res) => {
            if(res.status === 200){
                console.log(res);
                dispatch(setOtherData(res.data));
                return futureAppointmentHandler();
            }
        })
        .catch((e) => {
            console.log(e)
        })
    }
    
    const futureAppointmentHandler = async() => {
        const appointmentUrl = `${constant.BASE_URL}/appointments/future`;
        const headers = {
            token: token
        }
        
        const appointmentBody = {
            "UHID": data.regCode,
            "mobile": data.mobileNo,
            "hospitalId": 1,
            "type": 1
        }
        
        await axios.post(appointmentUrl, appointmentBody, {headers})
        .then((res) => {
            if(res.status === 200){
                dispatch(setFutureAppointmentData(res.data));
                return pastAppointmentHandler();
            }
        })
        .catch((e) => {
            console.log(e)
        })
    }
    
    const pastAppointmentHandler = async() => {
        const appointmentUrl = `${constant.BASE_URL}/appointments/future`;
        const headers = {
            token: token
        }
        
        const appointmentBody = {
            "UHID": data.regCode,
            "mobile": data.mobileNo,
            "hospitalId": 1,
            "type": 1
        }
        
        await axios.post(appointmentUrl, appointmentBody, {headers})
        .then((res) => {
            if(res.status === 200){
                dispatch(setPastAppointmentData(res.data));
            }
        })
        .catch((e) => {
            console.log(e)
        })
    }
}

export default ApiCall;