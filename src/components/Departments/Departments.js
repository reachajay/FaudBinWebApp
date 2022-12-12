import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { Backdrop, Dialog, DialogContent, DialogTitle, Grid, Rating } from '@mui/material';
import axios from 'axios';
import * as constant from '../../constant';
import { setSelectedDoctor } from '../../store/reducers/SelectedData';
import moment from 'moment/moment';
import CommonButton from '../Common/CommonButton';
import jwt_decode from 'jwt-decode';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from 'react-router';
import FaceIcon from '@mui/icons-material/Face';
import Face3Icon from '@mui/icons-material/Face3';
import CircularProgress from '@mui/material/CircularProgress';
import { Close } from '@mui/icons-material';

const useStyles = makeStyles(() => ({
  departmentRoot: {
    marginTop: '4rem',
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
  leftDiv: {
    // height: 'calc(100vh - 7rem)',
    // background: 'rgb(189,199,203)',
    position: 'relative',
    borderRadius: '0 0 0.8rem 0.8rem',
    overflowY: 'auto',
    background: 'linear-gradient(1deg, rgba(189, 199, 203, 0.5856092436974789) 0 %, rgba(95, 126, 138, 0.72) 35 %)',
    '& ::-webkit-scrollbar': {
      width: '0px'
    }
  },
  leftWrapper: {
    alignItems: 'flex-start',
    marginTop: '2rem',
    justifyContent: 'space-between',
    position: 'relative',
  },
  shadow: {
    position: 'absolute',
    bottom: '0',
    height: '4rem',
    width: '21.7rem',
    zIndex: '2',
    borderRadius: '0 0 0.8rem 0.8rem',
    background: 'linear-gradient(1deg, grey, transparent)'
  },
  rightDiv: {
    marginLeft: '1rem',
    width: '62vw'
  },
  cardDiv: {
    background: 'rgba(189, 199, 203, 0.2)',
    border: '1px solid #B6B6B6',
    backdropFilter: 'blur(40px)',
    borderRadius: '0.8rem',
    marginBottom: '1rem',
    padding: '1.5rem',
    width: '21rem',
    height: '8rem'
  },
  imgWrapper: {
    flexDirection: 'column',
    justifyContent: 'center'
  },
  imgDiv: {
    height: '5rem',
    width: '5rem',
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
  aboutDetailWrapper: {
    background: 'rgba(95, 126, 138, 0.2)',
    border: '1px solid #B6B6B6',
    backdropFilter: 'blur(40px)',
    borderRadius: '0.8rem',
    padding: '2.5rem 2rem'
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
    marginBottom: '2rem'
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
  selectedDate: {
    background: '#0F7986',
    color: '#FFFFFF',
  },
  btnDiv: {
    justifyContent: 'flex-end',
    width: '100%'
  },
  noDataDiv: {
    width: '100%',
    justifyContent: 'center',
    height: 'calc(100vh - 20rem)'
  },

  doctorDescription: {
    marginTop: '2rem'
  }
}))

const Departments = () => {

  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const department = useSelector(state => state.selectedData.selectedDept);
  const [doctorsData, setDoctorsData] = useState([]);
  const [selectDoctor, setSelectDoctor] = useState(useSelector(state => state.selectedData.selectedDoctor))
  // console.log(useSelector(state => state.selectedData.selectedDoctor));
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
  const [availableSlot, setAvailableSlot] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState();
  const [scheduleAppointment, setScheduleAppointment] = useState(false);
  const [popupMsg, setPopupMsg] = useState('');
  // let profileData = useSelector(state => state.userData.userProfile);
  // let token = useSelector(state => state.userData.token);
  let nationalId = localStorage.getItem("nationalId");
  let token = localStorage.getItem("token");
  let details = jwt_decode(token);
  let profileData = details.profile;
  let otherData = useSelector(state => state.userData.otherData);
  let selectedAppointment = useSelector(state => state.appointmentData.selectedAppointment);
  const [doctorLoader, setDoctorLoader] = useState(true);
  const [dateLoader, setDateLoader] = useState(true);
  const [timeLoader, setTimeLoader] = useState(true);
  const [loader, setLoader] = useState(false);
  // let nationalId = useSelector(state => state.userData.nationalId);
  // let fromAppointment = useSelector(state => state.appointmentData.fromAppointment);
  // var Rating = require('react-rating');

  useEffect(() => {
    window.scrollTo(0, 0)
    callApi()
  }, [])

  async function callApi() {
    try {
      await getDoctor();
    }
    catch (e) {
      console.log(e)
    }
  }

  async function getDoctor() {
    let specialiseId = department.SpecialiseID
    const url = `${constant.BASE_URL}/doctors?hospitalId=1&specialiseId=${specialiseId}`
    const headers = {
      token: token
    }

    await axios.get(url, { headers })
      .then((res) => {
        if (res.status === 200) {
          // console.log(res);
          setDoctorLoader(false);
          // dispatch(setSelectedDoctor(res.data[0]));
          setSelectDoctor(res.data[0]);
          setDoctorsData(res.data);
          return getDate(res.data[0]);
        }
      })
      .catch((e) => {
        console.log(e);
        setDoctorLoader(false);
      })
  }

  async function getDate(data) {
    dispatch(setSelectedDoctor(data));
    let docId = data.DoctorID;
    // console.log(docId)
    const url = `${constant.BASE_URL}/appointments/dates?hospitalId=1&doctorId=${docId}&totalNoOfDays=15`
    const headers = {
      token: token
    }

    await axios.get(url, { headers })
      .then((res) => {
        if (res.status === 200) {
          setDateLoader(false);
          setAvailableDates(res.data);
          setSelectedDate(res.data[0].weekdate)
          return getTime(docId, res.data[0].weekdate)
        }
      })
      .catch((e) => {
        console.log(e)
        setDateLoader(false);
      })
  }

  const getTime = (id, date) => {
    let specialiseId = department.SpecialiseID
    let tmpData = []
    const url = `${constant.BASE_URL}/appointments/slots?hospitalId=1&specialiseId=${specialiseId}&doctorId=${id}&appointmentDate=${moment(date).format("DD-MMM-YYYY")}`
    const headers = {
      token: token
    }

    axios.get(url, { headers })
      .then((res) => {
        if (res.status === 200) {
          setTimeLoader(false);
          res.data.map((data) => {
            tmpData = [...tmpData, ...data.availableSlots]
          })
          setAvailableSlot(tmpData);
          setSelectedSlot(tmpData[0]);
          // console.log(res);
        }
      })
      .catch((e) => {
        console.log(e)
        setTimeLoader(false);
      })
  }

  const bookAppointmentHandler = () => {
    setLoader(true);
    const url = `${constant.BASE_URL}/appointments/book`
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
      "specialiseID": selectDoctor.SpecialityId,
      "scheduleDate": moment(selectedDate).format("DD-MMM-YYYY"),
      "fromslotID": selectedSlot.fromSlotId,
      "toslotID": selectedSlot.toSlotId,
      "hospitalid": 1,
      "doctorId": selectDoctor.DoctorID,
      "nationalId": nationalId
    }

    axios.post(url, body, { headers })
      .then((res) => {
        if (res.status === 200) {
          setLoader(false);
          setPopupMsg(`Appointment scheduled successfully with ${selectDoctor.DoctorName} on ${moment(selectedDate).format("DD MMM YYYY")} at ${selectedSlot.fromTime}`)
          setScheduleAppointment(true);
          // navigate('/home');
        }
      })
      .catch((e) => {
        console.log(e)
        setLoader(false);
        setPopupMsg(`Your appointment is not scheduled due to some error. Please try again.`)
        setScheduleAppointment(true);
      })
    // setPopupMsg("Appointment scheduled successfully !!")
    // setScheduleAppointment(true);
  }

  const backHandler = () => {
    navigate('/home');
  }


  // setTimeout(() => {
  //   setScheduleAppointment(false);
  //   // backHandler();
  // }, 5000)

  // setTimeout(() => {
  //   navigate('/')
  // }, 10000)

  // useEffect(() => {
  //   setTimeout(() => {
  //     setScheduleAppointment(false);
  //   }, 5000)

  //   setTimeout(() => {
  //     navigate('/home')
  //   }, 10000)
  // }, [scheduleAppointment])

  // console.log(selectedSlot);
  // console.log(selectedDate)

  return (
    <div className={classes.departmentRoot}>

      {/* // loader
        //   ?
          // <div className='dFlex' style={{width: '100vw', height: '100vh', justifyContent: 'center'}}> */}
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loader}>
        <CircularProgress />
      </Backdrop>
      {/* // </div> */}
      {/* // : */}

      <div className={classes.wrapperDiv}>
        <div className={`${classes.back} dFlex cp`} onClick={backHandler}  >
          <ArrowBackIosIcon />Back
        </div>
        <div className={`${classes.headerLabel} para_26_300`} style={{ textTransform: 'capitalize' }}>{department.Specialisation}</div>
        <div className='para_26_900'>Specialities Doctor</div>
        {
          doctorsData.length > 0
            ?
            <>
              {/* <Grid container spacing={2} style={{ marginTop: '4rem' }}> */}
              < div className={`${classes.leftWrapper} dFlex`}>
                {/* <Grid item lg={3} md={3} xs={12}> */}
                {/* <Grid container spacing={2}> */}
                <div className={classes.leftDiv}>
                  {
                    doctorLoader
                      ?
                      <div className='dFlex' style={{ justifyContent: 'center' }}>
                        <CircularProgress />
                      </div>
                      :
                      <div style={{ height: '100vh', overflowY: 'auto' }}>
                        {
                          doctorsData.map((doctor, index) => {
                            return (
                              // <Grid item sm={12} key={index}>
                              <div className={`${classes.cardDiv} dFlex`} key={index} onClick={() => { setSelectDoctor(doctor); getDate(doctor.DoctorId) }} style={{ background: selectDoctor.DoctorID === doctor.DoctorID ? 'rgba(95, 126, 138, 0.4)' : 'rgba(189, 199, 203, 0.2)' }}>
                                <div className={`${classes.imgWrapper} dFlex`}>
                                  <div className={`${classes.imgDiv} dFlex`}>
                                    {
                                      doctor.GenderID === 1
                                        ?
                                        <FaceIcon fontSize="large" />
                                        :
                                        <Face3Icon fontSize="large" />
                                    }
                                  </div>
                                </div>
                                <div className={`${classes.detailWrapper} dFlex`}>
                                  <label className='para_16_700'>{doctor.DoctorName}</label>
                                  <label className={`${classes.mTop} para_12_Regular`}>{doctor.Designation}</label>
                                  {
                                    doctor.RatingDisplay === "YES" &&
                                    <Rating value={doctor.Ratings} readOnly precision={0.1} size="small" style={{ marginTop: '0.8rem' }} />
                                  }
                                  {doctor.ShortDescription && <label className={classes.mTop}>{doctor.ShortDescription}</label>}
                                </div>
                              </div>
                              // </Grid>
                            )
                          })
                        }
                        {doctorsData.length > 4 && <div className={classes.shadow} style={{ width: '100%' }} />}
                      </div>
                  }


                </div>
                {/* </Grid> */}
                {/* </Grid> */}

                {/* <Grid item lg={9} md={9} xs={12} style={{ marginLeft: '1rem' }}> */}
                <div className={classes.rightDiv}>
                  {/* <Grid container spacing={2} style={{ marginLeft: '1rem' }}> */}
                  {/* <Grid item sm={12}> */}
                  <div className={classes.aboutDetailWrapper}>
                    <div className='dFlex'>
                      <div className={`${classes.imgDiv} dFlex`}>
                        {
                          selectDoctor.GenderID === 1
                            ?
                            <FaceIcon fontSize="large" />
                            :
                            <Face3Icon fontSize="large" />
                        }
                      </div>
                      <div className='dFlex' style={{ marginLeft: '2rem', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <label className='para_16_700'>
                          {selectDoctor && selectDoctor.DoctorName}
                        </label>
                        <label className={`${classes.mTop} para_12_Regular`}>
                          {selectDoctor && selectDoctor.Designation}
                        </label>
                      </div>
                    </div>
                    {selectDoctor && selectDoctor.LongDescription &&
                      < div className={`${classes.doctorDescription} para_12_Regular`}>
                        {selectDoctor.LongDescription}
                      </div>
                    }
                    <div>

                    </div>
                  </div>
                  {/* </Grid> */}

                  {/* <Grid item sm={12}> */}
                  <div style={{ padding: '2rem 0' }} className='para_26_300 txtColor_light'>
                    Select <label className='para_26_900'>Date and Time</label>
                  </div>
                  {/* </Grid> */}

                  {/* <Grid item sm={12}> */}

                  <div>


                    <div className={`${classes.dateWrapper}`}>
                      {
                        dateLoader
                          ?
                          <div className='dFlex' style={{ justifyContent: 'center' }}>
                            <CircularProgress />
                          </div>
                          :
                          <>
                            <div style={{ marginBottom: '2rem' }}>{moment(selectedDate).format("MMM YYYY")}</div>
                            {/* <Grid container spacing={2}> */}
                            <div className='dFlex' style={{ flexWrap: 'wrap' }}>
                              {
                                availableDates.length > 0
                                  ?
                                  availableDates.map((date, index) => {
                                    return (
                                      // <Grid item sm={0.8} key={index} >
                                      <div onClick={() => { setSelectedDate(date.weekdate); getTime(selectDoctor.DoctorID, date.weekdate) }} className={`${classes.eachDate} para_10_Regular cp`} style={{ background: selectedDate === date.weekdate ? '#0F7986' : 'inherit', color: selectedDate === date.weekdate ? '#FFFFFF' : 'inherit' }}>
                                        <div className='dFlex' style={{ justifyContent: 'center' }}>{moment(`${date.weekdate}`).format("ddd")}</div>
                                        <div className='dFlex' style={{ marginTop: '1.5rem', justifyContent: 'center' }}>{moment(`${date.weekdate}`).format("DD")}</div>
                                      </div>
                                      // </Grid>
                                    )
                                  })
                                  :
                                  <div className={`${classes.noDataDiv} dFlex`}>No dates available for selected doctor</div>
                              }
                            </div>
                          </>
                      }
                    </div>
                  </div>
                  {/* </Grid> */}

                  <div className={`${classes.dateWrapper} ${classes.mTop}`}>
                    <div style={{ marginBottom: '2rem' }}>Select Slot</div>
                    {/* <Grid container spacing={1}> */}
                    {
                      timeLoader
                        ?
                        <div className='dFlex' style={{ justifyContent: 'center' }}>
                          <CircularProgress />
                        </div>
                        :
                        <div className='dFlex' style={{ flexWrap: 'wrap' }}>
                          {
                            availableSlot.length > 0
                              ?
                              availableSlot.map((slot, index) => {
                                return (
                                  <Grid item sm={0.8} key={index} >
                                    <div className={`${classes.eachSlot} para_10_Regular`} onClick={() => setSelectedSlot(slot)} style={{ background: selectedSlot && selectedSlot.fromTime === slot.fromTime ? '#0F7986' : 'inherit', color: selectedSlot && selectedSlot.fromTime === slot.fromTime ? '#FFFFFF' : 'inherit' }}>
                                      <div className='dFlex cp' style={{ justifyContent: 'center' }}>
                                        {slot.fromTime}
                                      </div>
                                    </div>
                                  </Grid>
                                )
                              })
                              :
                              <div className={`${classes.noDataDiv} dFlex`}>No slots available for selected date</div>
                          }
                        </div>
                    }
                    {/* </Grid> */}
                  </div>

                  <div className={`${classes.mTop} ${classes.btnDiv} dFlex`}>
                    <CommonButton name="Book Appointment" clickHandler={bookAppointmentHandler} filledRed={true} />
                  </div>
                  {/* </Grid> */}
                </div>
                {/* </Grid> */}
              </div>
            </>
            // {/* </Grid> */}
            :
            <div className={`${classes.noDataDiv} para_16_400 txtColor_light dFlex`}>No Data Found !!</div>
        }
      </div>

      {
        scheduleAppointment
        &&
        <Dialog open={scheduleAppointment} onClose={() => {setScheduleAppointment(false); navigate('/home')}}>
          <DialogTitle>
            <div className='dFlex' style={{ justifyContent: 'space-between' }}>
              <div>Success</div>
              <Close style={{ cursor: 'pointer' }} onClick={() => {setScheduleAppointment(false); navigate('/home')}} />
            </div>
          </DialogTitle>
          <DialogContent>
            <div className='dFlex para_12_Regular' style={{ padding: '1rem', justifyContent: 'center' }}>{popupMsg}</div>
          </DialogContent>
        </Dialog>
      }
    </div >
  )
}

export default Departments