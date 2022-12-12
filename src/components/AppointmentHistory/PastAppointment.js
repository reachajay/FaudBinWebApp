import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress, Grid } from '@mui/material';
import AppointmentCard from '../Common/AppointmentCard';
import { setPastAppointmentData } from '../../store/reducers/AppointmentData';
import axios from 'axios';
import * as constant from '../../constant';
import jwt_decode from 'jwt-decode';

const useStyles = makeStyles(() => ({
    noDataDiv: {
        width: '100%',
        justifyContent: 'center',
        marginTop: '1rem',
        height: 'calc(100vh - 28rem)'
    }
}))

const PastAppointment = () => {

    const classes = useStyles();
    const pastAppointment = useSelector(state => state.appointmentData.pastAppointment);
    let token = localStorage.getItem("token");
    let details = jwt_decode(token);
    let data = details.profile;
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        window.scrollTo(0, 0);
        const pastApptUrl = `${constant.BASE_URL}/appointments/past`;
        const headers = {
            token: token
        }

        const pastApptBody = {
            "UHID": data.regCode,
            "mobile": data.mobileNo,
            "hospitalId": 1,
            "type": 2
        }
        setLoader(true);
        axios.post(pastApptUrl, pastApptBody, { headers })
            .then((res) => {
                if (res.status === 200) {
                    setLoader(false);
                    // console.log(res);
                    dispatch(setPastAppointmentData(res.data));
                    // setFutureAppointment(res.data);
                }
            })
            .catch((e) => {
                console.log(e);
                setLoader(false);
            })
    }, []);

    return (
        loader
            ?
            <div className='dFlex' style={{ justifyContent: 'center' }}>
                <CircularProgress />
            </div>
            :
            pastAppointment && pastAppointment.length > 0
                ?
                <Grid container spacing={2}>
                    {
                        pastAppointment.map((appointment, index) => {
                            return (
                                <Grid item lg={4} md={4} sm={6} xs={12} key={index}>
                                    <AppointmentCard data={appointment} appointmentCode={2} />
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

export default PastAppointment