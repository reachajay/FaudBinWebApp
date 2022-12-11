import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import * as constant from '../../constant';
import axios from 'axios';
import { useEffect } from 'react';
import CommonButton from '../Common/CommonButton';
import { Alert, Backdrop, Dialog, DialogContent, DialogTitle, Snackbar } from '@mui/material';
import jwt_decode from 'jwt-decode';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from 'react-router';
import FaceIcon from '@mui/icons-material/Face';
import Face3Icon from '@mui/icons-material/Face3';
import CircularProgress from '@mui/material/CircularProgress';
import { Close } from '@mui/icons-material';
import { setOtherData } from '../../store/reducers/UserData';

const useStyles = makeStyles(() => ({
    rescheduleRoot: {
        marginTop: '4rem'
    },
    wrapperDiv: {
        padding: '4rem'
    },
    back: {
        color: '#1F646F',
        maxWidth: 'fit-content'
    },
    headerLabel: {
        marginTop: '2rem'
    },
    contentWrapper: {
        paddingTop: '4rem',
        alignItems: 'flex-start',
        justifyContent: 'space-between'
    },
    leftDiv: {
        // width: '24vw',
        // marginTop: '4rem'
    },
    rightDiv: {
        marginLeft: '1rem',
        // marginTop: '3rem',
        width: '62vw'
    },
    cardDiv: {
        background: 'rgba(189, 199, 203, 0.2)',
        border: '1px solid #B6B6B6',
        backdropFilter: 'blur(40px)',
        borderRadius: '0.8rem',
        padding: '2rem',
        width: '21rem',
        height: '8rem'
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
        marginLeft: '2rem',
        alignItems: 'flex-start'
    },
    mTop: {
        marginTop: '0.2rem'
    },

    dateWrapper: {
        background: 'rgba(189, 199, 203, 0.2)',
        border: '1px solid #B6B6B6',
        backdropFilter: 'blur(40px)',
        borderRadius: '0.8rem',
        padding: '1.5rem',
        // marginTop: '1rem'
    },
    btnDiv: {
        justifyContent: 'flex-end',
        width: '100%',
        marginTop: '2rem'
    },
    eachDate: {
        borderRadius: '20rem',
        padding: '1rem'
    },
    eachSlot: {
        padding: '0.5rem',
        borderRadius: '20rem',
        margin: '0.3rem'
    },
    slotWrapper: {
        flexWrap: 'wrap'
    },
    noDataDiv: {
        padding: '1rem',
        justifyContent: 'center'
    },
    aboutDetailWrapper: {
        background: 'rgba(95, 126, 138, 0.2)',
        border: '1px solid #B6B6B6',
        backdropFilter: 'blur(40px)',
        borderRadius: '0.8rem',
        padding: '2.5rem 2rem'
    },
    doctorDescription: {
        marginTop: '2rem'
    }
}))

const RescheduleAppointment = () => {

    const classes = useStyles();
    let token = localStorage.getItem("token");
    let nationalId = localStorage.getItem("nationalId");
    let details = jwt_decode(token);
    let profileData = details.profile;
    let otherData = useSelector(state => state.userData.otherData);
    const selectedAppt = useSelector(state => state.appointmentData.selectedAppointment);
    const doctorData = useSelector(state => state.selectedData.selectedDoctor);

    const [availableDates, setAvailableDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState(moment(selectedAppt.ScheduleDateTime).format("YYYY-MM-DD"));
    const [availableSlots, setAvailableSlots] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState(selectedAppt.ScheduleStartTime);
    const [popupMsg, setPopupMsg] = useState('');
    const [openPopup, setOpenPopup] = useState(false);
    const [dateLoader, setDateLoader] = useState(true);
    const [timeLoader, setTimeLoader] = useState(true);
    const [loader, setLoader] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // console.log(profileData);
    // console.log(otherData);
    // console.log(selectedAppt);
    // console.log(doctorData);

    useEffect(() => {
        try {
            getDate();
            fetchUserData();
        }
        catch (e) {
            console.log(e)
        }
    }, [])

    const getDate = async () => {
        const url = `${constant.BASE_URL}/appointments/dates?hospitalId=1&doctorId=${selectedAppt.DoctorID}&totalNoOfDays=15` //${selectedAppt.DoctorID}
        const headers = {
            token: token
        }

        await axios.get(url, { headers })
            .then((res) => {
                if (res.status === 200 && res.data && res.data.length > 0) {
                    setDateLoader(false);
                    setAvailableDates(res.data);
                    // console.log(res)
                    return getTime(selectedAppt.ScheduleDate)
                }
            })
            .catch((e) => {
                console.log(e)
                setDateLoader(false);
            })
    }

    const getTime = async (date) => {
        let tmpData = []
        const url = `${constant.BASE_URL}/appointments/slots?hospitalId=1&specialiseId=${selectedAppt.SpecialityId}&doctorId=${selectedAppt.DoctorID}&appointmentDate=${moment(date).format("DD-MMM-YYYY")}`
        const headers = {
            token: token
        }

        axios.get(url, { headers })
            .then((res) => {
                if (res.status === 200 && res.data && res.data.length) {
                    setTimeLoader(false);
                    res.data.map((data) => {
                        tmpData = [...tmpData, ...data.availableSlots]
                    })
                    setAvailableSlots(tmpData);
                    // console.log(res);
                }
            })
            .catch((e) => {
                console.log(e)
                setTimeLoader(false);
            })
    }

    const fetchUserData = async () => {
        const userData = `${constant.BASE_URL}/patients/${profileData.patientId}`
        const headers = {
            token: token
        }
        await axios.get(userData, { headers })
            .then((res) => {
                if (res.status === 200) {
                    dispatch(setOtherData(res.data));
                }
            })
            .catch((e) => {
                console.log(e);
            })

    }

    const rescheduleHandler = () => {
        setLoader(true);
        const url = `${constant.BASE_URL}/appointments/reschedule`
        const headers = {
            token: token
        }

        const body = {
            "patientId": profileData.patientId,
            "age": otherData.Age,
            "ageUoMID": otherData.AgeUoMID,
            "mobile": profileData.mobileNo,
            "genderID": otherData.GenderID,
            "patientName": profileData.patientName,
            "specialiseID": selectedAppt.SpecialityId,
            "scheduleDate": moment(selectedDate).format("DD-MMM-YYYY"),
            "fromslotID": selectedSlot.fromSlotId,
            "toslotID": selectedSlot.toSlotId,
            "hospitalid": 1,
            "doctorId": selectedAppt.DoctorID,
            "nationalId": nationalId,
            "previousScheduleId": selectedAppt.ScheduleID,
            "previousScheduleDate": moment(selectedAppt.ScheduleDateTime).format("DD-MMM-YYYY"),
        }

        axios.post(url, body, { headers })
            .then((res) => {
                if (res.status === 200) {
                    setLoader(false);
                    setOpenPopup(true);
                    setPopupMsg(`Appointment re-scheduled successfully with ${selectedAppt.DoctorName} on ${moment(selectedDate).format("DD MMM YYYY")} at ${selectedSlot.fromTime}`)
                    //   setScheduleAppointment(true);
                    // console.log(res);
                    navigate('/services/appointments')
                    //   setPopupMsg("Appointment re-scheduled successfully !!")
                }
            })
            .catch((e) => {
                console.log(e)
                setLoader(false);
            })
    }

    const backHandler = () => {
        navigate('/services/appointments')
    }

    setTimeout(() => {
        setOpenPopup(false)
    }, 5000)

    return (
        <div className={classes.rescheduleRoot}>
            {/* {
                !loader && */}
            {/* // <div className='dFlex' style={{ justifyContent: 'center', width: '100vw', height: '100vh', position: 'absolute', zIndex: '9' }}> */}
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loader}>
                <CircularProgress />
            </Backdrop>

            {/* } */}
            <div className={classes.wrapperDiv}>
                <div className={`${classes.back} dFlex cp`} onClick={backHandler}  >
                    <ArrowBackIosIcon />Back
                </div>
                <div className={`${classes.headerLabel} para_26_900 txtColor_light dFlex`}>Reschedule Appointment</div>
                <div className={`${classes.contentWrapper} dFlex`}>
                    <div className={classes.leftDiv}>
                        <div className={`${classes.cardDiv} dFlex`}>
                            <div className={`${classes.imgDiv} dFlex`}>
                                {
                                    selectedAppt.GenderID === 1
                                        ?
                                        <FaceIcon fontSize="large" />
                                        :
                                        <Face3Icon fontSize="large" />
                                }
                            </div>
                            <div className={`${classes.detailWrapper} dFlex`}>
                                <label>{selectedAppt.DoctorName}</label>
                                <label className={classes.mTop}>{selectedAppt.SpecialityName}</label>
                                <label className={classes.mTop}>{moment(selectedAppt.ScheduleDateTime).format("DD MMM YYYY")}</label>
                                <label className={classes.mTop}>{selectedAppt.ScheduleStartTime} - {selectedAppt.ScheduleEndTime}</label>
                            </div>
                        </div>
                    </div>

                    <div className={classes.rightDiv}>

                        <div className={classes.aboutDetailWrapper}>
                            <div className='dFlex'>
                                <div className={`${classes.imgDiv} dFlex`}>
                                    {
                                        selectedAppt.GenderID === 1
                                            ?
                                            <FaceIcon fontSize="large" />
                                            :
                                            <Face3Icon fontSize="large" />
                                    }
                                </div>
                                <div className='dFlex' style={{ marginLeft: '2rem', flexDirection: 'column', alignItems: 'flex-start' }}>
                                    <label className='para_16_700'>
                                        {selectedAppt && selectedAppt.DoctorName}
                                    </label>
                                    <label className={`${classes.mTop} para_12_Regular`}>
                                        {selectedAppt && selectedAppt.SpecialityName}
                                    </label>
                                </div>
                            </div>
                            {selectedAppt.DoctorID === doctorData.DoctorID && doctorData.LongDescription &&
                                <div className={`${classes.doctorDescription} para_12_Regular`}>
                                    {doctorData.LongDescription}
                                </div>
                            }
                        </div>

                        <div style={{ padding: '2rem 0' }} className='para_26_300 txtColor_light'>
                            Select <label className='para_26_900'>Date:</label>
                        </div>
                        <div className={classes.dateWrapper}>
                            <div style={{ marginBottom: '2rem' }}>{moment(selectedDate).format("MMM YYYY")}</div>
                            {
                                dateLoader
                                    ?
                                    <div className='dFlex' style={{ justifyContent: 'center' }}>
                                        <CircularProgress />
                                    </div>
                                    :
                                    <div className='dFlex' style={{ flexWrap: 'wrap' }}>
                                        {
                                            availableDates.map((date, index) => {
                                                return (
                                                    <div key={index} onClick={() => { setSelectedDate(date.weekdate); getTime(date.weekdate) }} className={`${classes.eachDate} para_10_Regular cp`} style={{ background: selectedDate === date.weekdate ? '#0F7986' : 'inherit', color: selectedDate === date.weekdate ? '#FFFFFF' : 'inherit' }}>
                                                        <div className='dFlex' style={{ justifyContent: 'center' }}>{moment(`${date.weekdate}`).format("ddd")}</div>
                                                        <div className='dFlex' style={{ marginTop: '1.5rem', justifyContent: 'center' }}>{moment(`${date.weekdate}`).format("DD")}</div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                            }
                        </div>

                        <div style={{ padding: '2rem 0' }} className='para_26_300 txtColor_light'>
                            Select <label className='para_26_900'>Slot:</label>
                        </div>
                        <div className={`${classes.dateWrapper} ${classes.slotWrapper} dFlex`}>

                            {
                                timeLoader
                                    ?
                                    <div className='dFlex' style={{ justifyContent: 'center' }}>
                                        <CircularProgress />
                                    </div>
                                    :
                                    availableSlots.length > 0
                                        ?
                                        availableSlots.map((slot, index) => {
                                            return (
                                                <div key={index} className={`${classes.eachSlot} para_10_Regular`} onClick={() => setSelectedSlot(slot)} style={{ background: selectedSlot && selectedSlot.fromTime === slot.fromTime ? '#0F7986' : 'transparent', color: selectedSlot && selectedSlot.fromTime === slot.fromTime ? '#FFFFFF' : 'inherit' }}>
                                                    <div className='dFlex cp' style={{ justifyContent: 'center' }}>
                                                        {slot.fromTime}
                                                    </div>
                                                </div>
                                            )
                                        })
                                        :
                                        <div className={`${classes.noDataDiv} para_16_400 txtColor_light dFlex`}>No slots available for selected date</div>
                            }
                        </div>
                        <div className={`${classes.mTop} ${classes.btnDiv} dFlex`}>
                            <CommonButton name="Reschedule" clickHandler={rescheduleHandler} filledRed={true} />
                        </div>
                    </div>
                </div>
            </div>

            {
                popupMsg &&
                <Dialog open={openPopup} onClose={() => setOpenPopup(false)}>
                    <div style={{ minHeight: '10rem' }}>
                        <DialogTitle>
                            <div className='dFlex' style={{ justifyContent: 'space-between' }}>
                                <div>Success</div>
                                <Close style={{ cursor: 'pointer' }} onClose={() => setOpenPopup(false)} />
                            </div>
                        </DialogTitle>
                        <DialogContent>
                            <div className='dFlex para_12_Regular' style={{ padding: '1rem', justifyContent: 'center' }}>{popupMsg}</div>
                        </DialogContent>
                    </div>
                </Dialog>
            }
            {/* <Snackbar open={!openPopup} autoHideDuration={1000000} onClose={() => setOpenPopup(false)} anchorOrigin={{vertical: 'bottom', horizontal: 'right'}} >
                <Alert onClose={() => setOpenPopup(false)} severity="success" sx={{ width: '100%' }}>
                    Your call is success
                </Alert>
            </Snackbar> */}
        </div>
    )
}

export default RescheduleAppointment