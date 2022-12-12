import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import moment from 'moment';
import CommonButton from './CommonButton';
import axios from 'axios';
import * as constant from '../../constant';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { setDeptData } from '../../store/reducers/SelectedData';
import { setFromAppointment, setSelectedAppointment } from '../../store/reducers/AppointmentData';
import { Backdrop, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import jwt_decode from 'jwt-decode';
import FaceIcon from '@mui/icons-material/Face';
import Face3Icon from '@mui/icons-material/Face3';
import CircularProgress from '@mui/material/CircularProgress';
import { Close } from '@mui/icons-material';

const useStyles = makeStyles(() => ({
    appointmentCardWrapper: {
        borderRadius: '0.8rem',
        '&:hover': {
            boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
        }
    },
    cardDiv: {
        background: 'rgba(189, 199, 203, 0.2)',
        border: '1px solid #B6B6B6',
        backdropFilter: 'blur(40px)',
        borderRadius: '0.8rem',
        padding: '1.5rem 1rem'
    },
    imgDiv: {
        height: '6rem',
        width: '6rem',
        borderRadius: '50%',
        background: 'white',
        justifyContent: 'center',
        color: '#1F646F'
    },
    detailWrapper: {
        flexDirection: 'column',
        marginLeft: '1rem',
        alignItems: 'flex-start',
        overflow: 'hidden'
    },

    nameLabel: {
        textTransform: 'capitalize',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        width: '100%',
        color: '#4A4A4A'
    },

    mTop: {
        marginTop: '0.2rem'
    }
}))

const AppointmentCard = (props) => {

    const classes = useStyles();
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [openPopup, setOpenPopup] = useState(false);
    const [cancelRemarks, setCancelRemarks] = useState('');
    const [cancelPopup, setCancelPopup] = useState(false);
    const [loader, setLoader] = useState(false);
    const [popupMsg, setPopupMsg] = useState('');

    const rescheduleHandler = () => {
        dispatch(setDeptData(props.data));
        dispatch(setSelectedAppointment(props.data));
        // dispatch(setFromAppointment(true));
        // navigate('/department');
        navigate('/reschedule');
    }

    const cancelHandler = () => {
        setOpenPopup(false);
        setLoader(true);
        const url = `${constant.BASE_URL}/appointments/cancel`
        const headers = {
            token: token
        }

        const body = {
            "scheduleID": props.data.ScheduleID,
            "hostpitalId": 1,
            "cancelRemarks": "Cancel appointment"
        }

        axios.post(url, body, { headers })
            .then((res) => {
                if (res.status === 200) {
                    setLoader(false);
                    setPopupMsg(`Your appointment with ${props.data.DoctorName} at ${props.data.ScheduleStartTime} on ${moment(props.data.ScheduleDateTime).format("DD MMM YYYY")} is cancelled successfully`)
                    // console.log(res);
                    setCancelPopup(true);
                    setCancelRemarks('')
                    setCancelPopup(true);
                }
            })
            .catch((e) => {
                console.log(e);
                setLoader(false);
                setPopupMsg("Your operation is not completed. Some error occured. Please try again");
                setCancelPopup(true);
            })
    }

    // setTimeout(() => {
    //     setCancelPopup(false);
    // }, 5000)

    // console.log(props)

    return (
        <div className={classes.appointmentCardWrapper}>
            {/* {
                loader && 
                <div style={{width: '100vw', height: '100vh', justifyContent: 'center'}} className='dFlex'> */}
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loader}>

                <CircularProgress />
            </Backdrop>
            {/* </div>
            } */}
            <div className={`${classes.cardDiv} dFlex`}>
                <div className={`${classes.imgDiv} dFlex`}>
                    {
                        props.data.GenderID === 1
                            ?
                            <FaceIcon fontSize="large" />
                            :
                            <Face3Icon fontSize="large" />
                    }
                </div>
                <div className={`${classes.detailWrapper} dFlex`}>
                    <div className={`${classes.nameLabel} para_10_Medium`}>{props && props.data && props.data.DoctorName && props.data.DoctorName.toLowerCase()}</div>
                    <div className={`${classes.mTop} txtColor_light`}>{props.data.SpecialityName}</div>
                    <div className={`${classes.mTop}`}>{moment(props.data.ScheduleDateTime).format("DD MMM YYYY")}</div>
                    <div className={`${classes.mTop}`}>{props.data.ScheduleStartTime} - {props.data.ScheduleEndTime}</div>
                    {props.appointmentCode === 1 ?
                        <div className={`${classes.mTop} dFlex`}>
                            <div>
                                <CommonButton name="Reschedule" clickHandler={rescheduleHandler} filledGreen={true} />
                            </div>
                            <div style={{ marginLeft: '1rem' }}>
                                <CommonButton name="Cancel" clickHandler={() => setOpenPopup(true)} filledRed={true} />
                            </div>
                        </div>
                        :
                        <div className={`${classes.mTop}`}>{props.data.VisitStatus === "NO" ? "Not Visited" : "Visit Successful"}</div>
                    }
                </div>
            </div>
            {
                openPopup &&
                <Dialog open={openPopup} onClose={() => setOpenPopup(false)}>
                    {/* <DialogTitle>
                        <div className='dFlex' style={{justifyContent: 'space-between'}}>
                        <div>Cancel Appointment</div>
                        <Close style={{cursor: 'pointer'}} onClick={() => setOpenPopup(false)} />
                        </div>
                    </DialogTitle> */}
                    <DialogContent className='para_12_Regular txtColor_light'>
                        <p>Do you want to cancel the appointment?</p>
                        {/* <TextField value={cancelRemarks} onChange={(e) => setCancelRemarks(e.target.value)} style={{ width: '100%' }} /> */}
                    </DialogContent>
                    <DialogActions style={{ borderTop: '1px solid #1F646F' }}>
                        <div className='dFlex' style={{ justifyContent: 'space-between', width: '100%' }}>
                            <div style={{ marginTop: '1rem' }}>
                                <CommonButton name="Confirm Cancel" clickHandler={cancelHandler} filledGreen={true} />
                            </div>
                            <div style={{ marginLeft: '1rem', marginTop: '1rem' }}>
                                <CommonButton name="Cancel" clickHandler={() => setOpenPopup(false)} filledRed={true} />
                            </div>
                        </div>
                    </DialogActions>
                </Dialog>
            }

            {
                cancelPopup &&
                <Dialog open={cancelPopup} onClose={() => {setCancelPopup(false); props.refresh()}}>
                    <DialogTitle>
                        <div className='dFlex' style={{ justifyContent: 'space-between' }}>
                            <div>Success</div>
                            <Close style={{ cursor: 'pointer' }} onClick={() => {setCancelPopup(false); props.refresh()}} />
                        </div>
                    </DialogTitle>
                    <DialogContent>
                        <div className='dFlex para_12_Regular' style={{ padding: '1rem', justifyContent: 'center' }}>{popupMsg}</div>
                    </DialogContent>
                </Dialog>
            }
        </div>
    )
}

export default AppointmentCard