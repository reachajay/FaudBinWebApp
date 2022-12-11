import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CommonButton from '../Common/CommonButton';
import { makeStyles } from '@mui/styles';
import Img from '../../Images/HospitalImage.jpg';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// import VaccinesIcon from '@mui/icons-material/Vaccines';
// import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
// import SettingsInputSvideoIcon from '@mui/icons-material/SettingsInputSvideo';
// import TagFacesIcon from '@mui/icons-material/TagFaces';
// import GrassIcon from '@mui/icons-material/Grass';
// import PsychologyIcon from '@mui/icons-material/Psychology';
// import FindInPageIcon from '@mui/icons-material/FindInPage';
// import HistoryIcon from '@mui/icons-material/History';
// import ScienceIcon from '@mui/icons-material/Science';
// import FilterBAndWIcon from '@mui/icons-material/FilterBAndW';
// import ArticleIcon from '@mui/icons-material/Article';
// import SickIcon from '@mui/icons-material/Sick';
// import BloodtypeIcon from '@mui/icons-material/Bloodtype';
// import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';
// import Brain from '../../Images/Brain.png';
// import Drugs from '../../Images/Drugs.png';
// import Hair from '../../Images/Hair.png';
// import Heart from '../../Images/Heart.png';
// import Lungs from '../../Images/Lungs.png';
// import Teeth from '../../Images/Teeth.png';
import Appointment from '../../Images/Appointment.png';
// import FindDoctor from '../../Images/FindDoctor.png';
import Lab from '../../Images/Lab.png';
import Radiology from '../../Images/Radiology.png';
import Prescription from '../../Images/Prescription.png';
import Thermometer from '../../Images/Thermometer.png';
import SectionCard from '../Common/SectionCard';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import HomePic from '../../Images/LandingHome.png';
// import  * as api  from '../../apis/api';
import axios from "axios";
import * as constant from '../../constant';
import { useDispatch, useSelector } from 'react-redux';
import { setDeptData } from '../../store/reducers/SelectedData';
import { useNavigate } from 'react-router';
import jwt_decode from "jwt-decode";
import { setOtherData, setUserProfile } from '../../store/reducers/UserData';
import { setFutureAppointmentData, setPastAppointmentData } from '../../store/reducers/AppointmentData';
import CircularProgress from '@mui/material/CircularProgress';
import FaceIcon from '@mui/icons-material/Face';
import Face3Icon from '@mui/icons-material/Face3';
import moment from 'moment';
import Slider from 'react-slick'
import Carousel from 'react-material-ui-carousel'


const useStyles = makeStyles(() => ({
    leftContent: {
        // padding: '4rem',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'column',
    },
    header: {
        color: '#4A4A4A'
    },
    specialityWrapper: {
        padding: '4rem 2rem',
        marginTop: '4rem',
        background: 'rgba(255,255,255, 0.3)',
        backdropFilter: 'blur(3px)',
        borderBottom: '1px solid grey'
    },
    glassSection: {
        background: 'rgba(109, 165, 174, 0.2)',
        backdropFilter: 'blur(20px)',
        borderRadius: '0.4rem',
        padding: '4rem 2rem',
        border: '1px solid #B6B6B6'
    },
    backGlass: {
        position: 'absolute',
        bottom: '-1rem',
        width: 'calc(100% - 6rem)',
        right: '1rem'
    },
    bottomRibbon: {
        background: '#525252',
        justifyContent: 'center',
        padding: '1rem',
        color: '#A8A8A8'
    },
    contactWrapperDiv: {
        padding: '2rem',
        background: '#2A3A40',
        color: 'white'
    },
    eachContactWrapper: {
        alignItems: 'flex-start',
        color: '#E0E0E0'
    },
    showMoreWrapper: {
        background: 'rgba(0, 0, 0, 0.2)',
        flexDirection: 'column',
        padding: '2rem',
        borderRadius: '0.4rem',
        height: '8rem',
        justifyContent: 'center'
    },
    noAppointmentDiv: {
        width: '100%',
        justifyContent: 'center',
        marginTop: '1rem'
    },
    imgDiv: {
        height: '5rem',
        width: '5rem',
        borderRadius: '50%',
        background: 'white',
        justifyContent: 'center',
        color: '#1F646F'
    },
}));

let services = [
    // {
    //     name: 'Find My Doctor',
    //     icon: FindDoctor
    // },
    {
        name: 'Appointment History',
        icon: Appointment,
        nav: '/appointments'
    },
    {
        name: 'Lab Result',
        icon: Lab,
        nav: '/lab-result'
    },
    {
        name: 'Radiologist',
        icon: Radiology,
        nav: '/rediology'
    },
    {
        name: 'Prescription',
        icon: Prescription,
        nav: '/prescription'
    },
    {
        name: 'Sick Leave',
        icon: Thermometer,
        nav: '/leaves'
    },
]

const LandingMain = () => {

    const classes = useStyles();
    const [viewMoreSpeciality, setViewMoreSpeciality] = useState(false);
    const [viewMoreService, setViewMoreService] = useState(false);
    const [specialities, setSpecialities] = useState([]);
    const [futureAppointment, setFutureAppointment] = useState([]);
    const [deptLoader, setDeptLoader] = useState(false);
    const [apptFutureLoader, setApptFutureLoader] = useState(false);
    const [apptPastLoader, setApptPastLoader] = useState(false);
    const [patientLoader, setPatientLoader] = useState(false);
    // let data = useSelector(state => state.userData.userProfile);
    let token = localStorage.getItem("token");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    let details = jwt_decode(token);
    let data = details.profile;

    useEffect(() => {
        const deptUrl = `${constant.BASE_URL}/departments`;
        const futureApptUrl = `${constant.BASE_URL}/appointments/future`;
        const pastApptUrl = `${constant.BASE_URL}/appointments/past`;
        const userData = `${constant.BASE_URL}/patients/${data.patientId}`

        setPatientLoader(true);
        setDeptLoader(true);
        setApptFutureLoader(true);
        setApptPastLoader(true);

        const headers = {
            token: token
        }

        //Below api call is for fetching user profile data

        axios.get(userData, { headers })
            .then((res) => {
                if (res.status === 200) {
                    setPatientLoader(false);
                    dispatch(setOtherData(res.data));
                }
            })
            .catch((e) => {
                console.log(e);
                setPatientLoader(false);
            })

        //Below api call is for getting list of departments
        axios.get(deptUrl, { headers })
            .then((res) => {
                setDeptLoader(false);
                setSpecialities(res.data)
            })
            .catch((e) => {
                console.log(e)
                setDeptLoader(false);
            })

        //Below api call is for getting the list of future appointments

        const futureApptBody = {
            "UHID": data.regCode,
            "mobile": data.mobileNo,
            "hospitalId": 1,
            "type": 1
        }

        axios.post(futureApptUrl, futureApptBody, { headers })
            .then((res) => {
                if (res.status === 200) {
                    setApptFutureLoader(false);
                    dispatch(setFutureAppointmentData(res.data));
                    setFutureAppointment(res.data);
                }
            })
            .catch((e) => {
                console.log(e)
                setApptFutureLoader(false);
            })

        //Below api call is for getting the list of past appointments

        const pastApptBody = {
            "UHID": data.regCode,
            "mobile": data.mobileNo,
            "hospitalId": 1,
            "type": 2
        }

        axios.post(pastApptUrl, pastApptBody, { headers })
            .then((res) => {
                if (res.status === 200) {
                    setApptPastLoader(false);
                    dispatch(setPastAppointmentData(res.data));
                    // setFutureAppointment(res.data);
                }
            })
            .catch((e) => {
                console.log(e)
                setApptPastLoader(false);
            })

    }, []);

    const clickHandler = (data, id) => {
        dispatch(setDeptData(data));
        navigate(id === 1 ? '/department' : `/services${data.nav}`)
    }

    console.log(futureAppointment);

    const settings = {
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        arrows: false
    }

    const rescheduleHandler = () => {
        navigate('/reschedule')
    }


    return (
        <div style={{ minHeight: '100vh', marginTop: '4rem' }} className='txtColor_light'>
            <section id="Home" style={{ padding: '5.4rem' }}>
                <Grid container spacing={2}>
                    <Grid item md={6}>
                        <div className={`${classes.leftContent} dFlex`}>
                            <div className={`${classes.header} landingHeader`}>Quality matters the most when choosing your <b>hospital</b></div>
                            <div className='heading_2_Medium' style={{ marginTop: '4rem', color: '#DC3A3A' }}>Prince Faud Bin Sultan Hospital</div>
                            <div className='para_16_400' style={{ margin: '2rem 0', color: '#AAAAAA' }}>When patients and healthcare providers think through the available treatment options, they consider the benefits and risk of each options</div>
                            <CommonButton name="Help" filledRed={true} />
                        </div>

                    </Grid>

                    <Grid item md={6}>
                        {/* <div className='dFlex' style={{ padding: '2rem', justifyContent: 'center', height: '100%', transform: 'rotate(45deg)' }}>
                            <div style={{ background: '#a6cac5', height: '28rem', width: '22rem', justifyContent: 'center', borderRadius: '1.4rem 3.8rem' }} className='dFlex'>
                                <div style={{ background: '#5eb8ab', height: '25rem', width: '19rem', borderRadius: '1.4rem 3.8rem' }}></div>
                            </div>
                        </div> */}
                        <img src={HomePic} alt="Home Pic" style={{ maxWidth: 'fit-content', maxHeight: 'fit-content' }} />
                    </Grid>
                </Grid>
                <div style={{ position: 'relative' }}>
                    {futureAppointment.length > 1 && <div className={`${classes.glassSection} ${classes.backGlass}`}></div>}
                    <div className={`${classes.glassSection}`}>
                        <div className='para_26_300'>Appointment</div>
                        {
                            apptFutureLoader
                                ?
                                <div className='dFlex' style={{ justifyContent: 'center' }}>
                                    <CircularProgress />
                                </div>
                                :
                                futureAppointment.length > 0
                                    ?
                                    <div>
                                        {/* <Slider {...settings}> */}
                                        <Carousel
                                            indicatorContainerProps={{
                                                style: {
                                                    marginTop: '50px', // 5
                                                    // textAlign: 'right' // 4
                                                }

                                            }}
                                            next=
                                            {() =>
                                            <div style={{ height: '4rem', width: '4rem', background: '#be0e08', position: 'absolute', right: '-2rem', top: '50%', borderRadius: '50%', justifyContent: 'center', color: 'white' }} className='dFlex'>
                                                <ChevronRightIcon />
                                            </div>
                                            }
                                        >
                                            {
                                                futureAppointment.map((data, index) => {
                                                    return (
                                                        <div className='dFlex' style={{ justifyContent: 'space-evenly', marginTop: '2rem' }}>
                                                            {/* <img src={Img} alt="Pic" style={{ width: '5rem', height: '5rem', borderRadius: '50%' }} /> */}
                                                            <div className={`${classes.imgDiv} dFlex`}>
                                                                {
                                                                    data.GenderID === 1
                                                                        ?
                                                                        <FaceIcon fontSize="large" />
                                                                        :
                                                                        <Face3Icon fontSize="large" />
                                                                }
                                                            </div>
                                                            <div style={{ background: 'white', padding: '1rem', borderRadius: '0.4rem', width: '15rem' }}>{data.DoctorName}</div>
                                                            <div style={{ background: 'white', padding: '1rem', borderRadius: '0.4rem', width: '15rem' }}>{data.SpecialityName}</div>
                                                            <div style={{ background: '#555858', padding: '1rem', borderRadius: '0.4rem', color: 'white' }} className='dFlex'>

                                                                <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M4 6.3H2.66667V7.7H4V6.3ZM6.66667 6.3H5.33333V7.7H6.66667V6.3ZM9.33333 6.3H8V7.7H9.33333V6.3ZM10.6667 1.4H10V0H8.66667V1.4H3.33333V0H2V1.4H1.33333C0.593333 1.4 0.00666666 2.03 0.00666666 2.8L0 12.6C0 13.37 0.593333 14 1.33333 14H10.6667C11.4 14 12 13.37 12 12.6V2.8C12 2.03 11.4 1.4 10.6667 1.4ZM10.6667 12.6H1.33333V4.9H10.6667V12.6Z" fill="white" />
                                                                </svg>
                                                                <label style={{ padding: '0 1rem', borderRight: '1px solid grey' }}>{moment(data.ScheduleDateTime).format("DD MMM YYYY")}</label>
                                                                <label style={{ padding: '0 1rem' }}>{data.ScheduleStartTime}</label>
                                                            </div>
                                                            <div style={{ background: '#52b8a9', padding: '1rem', borderRadius: '0.4rem', color: 'white', cursor: 'pointer' }} onClick={rescheduleHandler}>Reschedule Appointment</div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </Carousel>
                                        {/* </Slider>  */}
                                        {/* <div style={{ position: 'absolute', left: '12rem', width: '16rem' }}>Details</div> */}
                                        {/* <div style={{ height: '4rem', width: '4rem', background: '#be0e08', position: 'absolute', right: '-2rem', top: '50%', borderRadius: '50%', justifyContent: 'center', color: 'white' }} className='dFlex'>
                                            <ChevronRightIcon />
                                        </div> */}
                                    </div>
                                    :
                                    <div className={`${classes.noAppointmentDiv} dFlex`}>No future appointments</div>
                        }
                    </div>
                </div>
            </section>

            <section id="Specialities">
                <div className={classes.specialityWrapper}>
                    <p className='heading_2_Medium'>Specialities</p>
                    <p>Choose the speciality and book your specialities</p>
                    {
                        deptLoader
                            ?
                            <div className='dFlex' style={{ justifyContent: 'center' }}>
                                <CircularProgress />
                            </div>
                            :
                            <Grid container spacing={2}>
                                {viewMoreSpeciality ?
                                    specialities.map((speciality, index) => {
                                        return (
                                            <Grid item md={2} sm={4} key={index} onClick={() => clickHandler(speciality, 1)}>
                                                <SectionCard data={speciality.Specialisation} />
                                            </Grid>
                                        )
                                    })
                                    :
                                    specialities.map((speciality, index) => {
                                        return (
                                            index < 5 &&
                                            <Grid item md={2} sm={4} key={index} onClick={() => clickHandler(speciality, 1)}>
                                                <SectionCard data={speciality.Specialisation} />
                                            </Grid>
                                        )
                                    })
                                }

                                {
                                    specialities.length > 5
                                    &&
                                    <Grid item md={2} sm={4} onClick={() => viewMoreSpeciality ? setViewMoreSpeciality(false) : setViewMoreSpeciality(true)}>
                                        <div className='dFlex cp' style={{ background: 'rgba(0, 0, 0, 0.2)', flexDirection: 'column', padding: '2rem', borderRadius: '0.4rem', height: '8rem', justifyContent: 'center' }}>
                                            <div style={{ background: 'rgba(255, 255, 255, 0.4)', padding: '2rem', borderRadius: '50%' }}>
                                                {viewMoreSpeciality
                                                    ?
                                                    <KeyboardDoubleArrowLeftIcon />
                                                    :
                                                    <KeyboardDoubleArrowRightIcon />
                                                }
                                            </div>
                                            <div style={{ marginTop: '1rem' }}>{viewMoreSpeciality ? "Less" : "More"}</div>
                                        </div>
                                    </Grid>
                                }
                            </Grid>
                    }
                </div>
            </section>

            <section id="Services">
                <div style={{ padding: '4rem 2rem' }}>
                    <p className='heading_2_Medium'>Services</p>
                    <p>Choose the speciality and book your appointment</p>
                    <Grid container spacing={2}>
                        {viewMoreService ?
                            services.map((service, index) => {
                                return (

                                    <Grid item md={2} sm={4} key={index} onClick={() => clickHandler(service, 2)}>
                                        <SectionCard data={service.name} icon={service.icon} />
                                    </Grid>
                                )
                            })
                            :
                            services.map((service, index) => {
                                return (
                                    index < 5 &&
                                    <Grid item md={2} sm={4} key={index} onClick={() => clickHandler(service, 2)}>
                                        <SectionCard data={service.name} icon={service.icon} />
                                    </Grid>
                                )
                            })
                        }
                        {
                            services.length > 5
                            &&

                            <Grid item md={2} sm={4} onClick={() => viewMoreService ? setViewMoreService(false) : setViewMoreService(true)}>
                                <div className={`${classes.showMoreWrapper} dFlex cp`}>
                                    <div style={{ background: 'rgba(255, 255, 255, 0.4)', padding: '2rem', borderRadius: '50%' }}>
                                        {
                                            viewMoreService
                                                ? <KeyboardDoubleArrowLeftIcon />
                                                :
                                                <KeyboardDoubleArrowRightIcon />
                                        }
                                    </div>
                                    <div style={{ marginTop: '1rem' }}>{viewMoreService ? "Less" : "More"}</div>
                                </div>
                            </Grid>
                        }
                    </Grid>
                </div>
            </section>

            <section id="Contact">
                <div className={classes.contactWrapperDiv}>
                    <p className='heading_2_Medium' style={{ color: '#F4F4F4' }}>Contact Us</p>
                    <div className={`${classes.eachContactWrapper} dFlex para_12_Regular`}>
                        <div style={{ padding: '1rem' }}>
                            <p style={{ borderBottom: '2px solid #B9BBBB' }}>Introduction</p>
                            <p>Chairman</p>
                            <p>Message</p>
                            <p>Hospital</p>
                            <p>Accredition</p>
                            <p>Career</p>
                        </div>
                        <div style={{ padding: '1rem' }}>
                            <p style={{ borderBottom: '2px solid #B9BBBB' }}>Find a Doctor</p>
                            <p>Medical Services</p>
                            <p>Nursing Services</p>
                            <p>Accomplishment</p>
                            <p>Supporting Medical</p>
                            <p>Services</p>
                            <p>Hospital Indicator</p>
                            <p>Programs</p>
                        </div>
                        <div style={{ padding: '1rem' }}>
                            <p style={{ borderBottom: '2px solid #B9BBBB' }}>Media Center</p>
                            <p>News & Events</p>
                            <p>Video Gallery</p>
                            <p>Podcast</p>
                        </div>
                        <div style={{ padding: '1rem' }}>
                            <p style={{ borderBottom: '2px solid #B9BBBB' }}>Contact Us</p>
                            <p>Get in Touch</p>
                            <p>Complaints & Suggestions</p>
                        </div>
                        <div style={{ padding: '1rem' }}>
                            <p style={{ borderBottom: '2px solid #B9BBBB' }}>Mobile</p>
                            <p>Application</p>
                            <p>Report a Violation</p>
                        </div>
                    </div>
                </div>
                <div className={`${classes.bottomRibbon} dFlex para_10_Regular`}>
                    Copyright (2002) - Prince Faud Bin Sultan Hospital | Credit
                </div>
            </section>

        </div>
    )
}

export default LandingMain