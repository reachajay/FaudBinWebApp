import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { useSelector } from 'react-redux';
import { CircularProgress, Grid } from '@mui/material';
import AppointmentCard from '../Common/AppointmentCard';
import jwt_decode from "jwt-decode";
import axios from "axios";
import * as constant from '../../constant';

const useStyles = makeStyles(() => ({
    noDataDiv: {
        width: '100%',
        justifyContent: 'center',
        marginTop: '1rem',
        height: '50vh'
    }
}))

const FutureAppointment = () => {
    const classes = useStyles();
    // const futureAppointment = useSelector(state => state.appointmentData.futureAppointment);
    const [futureAppointment, setFutureAppointment] = useState([]);
    const [loader, setLoader] = useState(false);
    let token = localStorage.getItem("token");
    let details = jwt_decode(token);
    let data = details.profile;

    useEffect(() => {
        window.scrollTo(0, 0);
        getFutureData();
    }, []);

    const getFutureData = () => {
        const futureApptUrl = `${constant.BASE_URL}/appointments/future`;
        const headers = {
            token: token
        }
        const futureApptBody = {
            "UHID": data.regCode,
            "mobile": data.mobileNo,
            "hospitalId": 1,
            "type": 1
        }
        setLoader(true);
        axios.post(futureApptUrl, futureApptBody, { headers })
            .then((res) => {
                if (res.status === 200) {
                    setLoader(false);
                    // console.log(res);
                    // dispatch(setFutureAppointmentData(res.data));
                    setFutureAppointment(res.data);
                }
            })
            .catch((e) => {
                console.log(e)
                setLoader(false);
            })
    }

    return (
        loader
            ?
            <div className='dFlex' style={{ justifyContent: 'center' }}>
                <CircularProgress />
            </div>
            :
            futureAppointment && futureAppointment.length > 0
                ?
                <Grid container spacing={2}>
                    {
                        futureAppointment.map((appointment, index) => {
                            return (
                                <Grid item lg={4} md={4} sm={6} xs={12} key={index}>
                                    <AppointmentCard data={appointment} appointmentCode={1} refresh={getFutureData} />
                                </Grid>
                            )
                        })
                    }

                </Grid>
                :
                <div className={`${classes.noDataDiv} para_16_400 dFlex`}>
                    No records found !!
                </div>
    )
}

export default FutureAppointment