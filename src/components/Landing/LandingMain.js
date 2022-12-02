import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CommonButton from '../Common/CommonButton';
import { makeStyles } from '@mui/styles';
import Img from '../../Images/HospitalImage.jpg';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import SettingsInputSvideoIcon from '@mui/icons-material/SettingsInputSvideo';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import GrassIcon from '@mui/icons-material/Grass';
import PsychologyIcon from '@mui/icons-material/Psychology';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import HistoryIcon from '@mui/icons-material/History';
import ScienceIcon from '@mui/icons-material/Science';
import FilterBAndWIcon from '@mui/icons-material/FilterBAndW';
import ArticleIcon from '@mui/icons-material/Article';
import SickIcon from '@mui/icons-material/Sick';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';
import SectionCard from '../Common/SectionCard';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import HomePic from '../../Images/LandingHome.png';
import axios from 'axios';
import * as constant from '../../constant';
import {loginApi} from '../../apis/api'

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
        padding: '4rem',
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
    }
}));

let specialities = [
    {
        name: 'Anesthesia',
        icon: <VaccinesIcon />
    },
    {
        name: 'Cardiology',
        icon: <VolunteerActivismIcon />
    },
    {
        name: 'Chest and Allergy',
        icon: <SettingsInputSvideoIcon />
    },
    {
        name: 'Dentistry',
        icon: <TagFacesIcon />
    },
    {
        name: 'Dermatology',
        icon: <GrassIcon />
    },
    {
        name: 'Neurology',
        icon: <PsychologyIcon />
    },
    {
        name: 'More',
        icon: <VaccinesIcon />
    }
];

let services = [
    {
        name: 'Find My Doctor',
        icon: <FindInPageIcon />
    },
    {
        name: 'Appointment History',
        icon: <HistoryIcon />
    },
    {
        name: 'Lab Result',
        icon: <ScienceIcon />
    },
    {
        name: 'Radiologist',
        icon: <FilterBAndWIcon />
    },
    {
        name: 'Prescription',
        icon: <ArticleIcon />
    },
    {
        name: 'Sick Leave',
        icon: <SickIcon />
    },
    {
        name: 'Blood Sample',
        icon: <BloodtypeIcon />
    },
    {
        name: 'Home Checkup',
        icon: <AddHomeWorkIcon />
    },
]

const LandingMain = () => {

    const classes = useStyles();
    const [viewMoreSpeciality, setViewMoreSpeciality] = useState(false);
    const [viewMoreService, setViewMoreService] = useState(false);
    const [otp, setOtp] = useState("");
    const [token, setToken] = useState("")

    useEffect(() => {

        // const apiUrl = `${constant.BASE_URL}/auth/login`
        // const headers = {
        //     "nationalId": "",
        //     "password": ""
        // }

        // axios.post(apiUrl, headers)
        //     .then((res) => {
        //         console.log(res);
        //         setOtp(res.OTP)
        //     })
        //     .catch((e) => {
        //         console.log(e)
        //     })

        // const authUrl = `${constant.BASE_URL}/auth/mfa`
        // const mfaHeaders = {
        //     "nationalId": "",
        //     "type": '',
        //     "oneTimePassword": ""
        // }
        // axios.post(authUrl, mfaHeaders)
        // .then((res) => {
        //     console.log(res)
        // })
        // .catch((e) => {
        //     console.log(e)
        // })

        // login();
        // console.log(loginApi());
        // console.log(result)
        // authHandler();
        getDepartment();
        
    }, [])

    const login = async() => {
        const apiUrl = `${constant.BASE_URL}/auth/login`
        const body = {
            "nationalId": "",
            "password": ""
        }

        await axios.post(apiUrl, body)
            .then((res) => {
                console.log(res);
                setOtp(res.OTP)
            })
            .catch((e) => {
                console.log(e)
            })
    }

    const authHandler = async() => {
         const authUrl = `${constant.BASE_URL}/auth/mfa`
        const mfaHeaders = {
            "nationalId": "",
            "type": '',
            "oneTimePassword": ""
        }
        axios.post(authUrl, mfaHeaders)
        .then((res) => {
            console.log(res);
            setToken(res.tokens)
        })
        .catch((e) => {
            console.log(e)
        })
    }

    const getDepartment = () => {
        const url = `${constant.BASE_URL}/departments`
        const headers = {
            accessToken: "",
            "Content-Type": "application/json"
        }
        axios.get(url, {headers})
            .then((res) => {
                console.log(res)
            })
            .catch((e) => {
                console.log(e)
            })
    }

    return (
        <div className="bg-Gradient" style={{ minHeight: '100vh', marginTop: '5rem' }}>
            <section id="Home" style={{ padding: '5.4rem' }}>
                <Grid container spacing={2}>
                    <Grid item md={6}>
                        <div className={`${classes.leftContent} dFlex`}>
                            <div className={`${classes.header} landingHeader`}>Quality matters the most when choosing your <b>hospital</b></div>
                            <div className='heading_2_Medium' style={{ marginTop: '4rem', color: '#DC3A3A' }}>Prince Faud Bin Sultan Hospital</div>
                            <div className='para_16_300' style={{ margin: '2rem 0', color: '#AAAAAA' }}>When patients and healthcare providers think through the available treatment options, they consider the benefits and risk of each options</div>
                            <CommonButton name="Help" clickHandler={getDepartment} />
                        </div>

                    </Grid>

                    <Grid item md={6}>
                        {/* <div className='dFlex' style={{ padding: '2rem', justifyContent: 'center', height: '100%', transform: 'rotate(45deg)' }}>
                            <div style={{ background: '#a6cac5', height: '28rem', width: '22rem', justifyContent: 'center', borderRadius: '1.4rem 3.8rem' }} className='dFlex'>
                                <div style={{ background: '#5eb8ab', height: '25rem', width: '19rem', borderRadius: '1.4rem 3.8rem' }}></div>
                            </div>
                        </div> */}
                        <img src={HomePic} alt="Home Pic" />
                    </Grid>
                </Grid>
                <div style={{ position: 'relative' }}>
                    <div className={`${classes.glassSection} ${classes.backGlass}`}></div>
                    <div className={`${classes.glassSection}`}>
                        <div className='para_26_300'>Appointment</div>
                        <div className='dFlex' style={{ justifyContent: 'space-evenly', marginTop: '2rem' }}>
                            <img src={Img} alt="Pic" style={{ width: '5rem', height: '5rem', borderRadius: '50%' }} />
                            <div style={{ background: 'white', padding: '1rem', borderRadius: '0.4rem' }}>Name</div>
                            <div style={{ background: 'white', padding: '1rem', borderRadius: '0.4rem' }}>Department</div>
                            <div style={{ background: '#555858', padding: '1rem', borderRadius: '0.4rem', color: 'white' }}>Calendar</div>
                            <div style={{ background: '#52b8a9', padding: '1rem', borderRadius: '0.4rem', color: 'white' }}>Reschedule Appointment</div>
                            <div style={{ height: '4rem', width: '4rem', background: '#be0e08', position: 'absolute', right: '-2rem', borderRadius: '50%', justifyContent: 'center', color: 'white' }} className='dFlex'>
                                <ChevronRightIcon />
                            </div>
                        </div>
                        <div style={{ marginLeft: '21rem' }}>Details</div>
                    </div>
                </div>
            </section>

            <section id="Specialities">
                <div className={classes.specialityWrapper}>
                    <p className='heading_2_Medium'>Specialities</p>
                    <p>Choose the speciality and book your specialities</p>
                    <Grid container spacing={2}>
                        {viewMoreSpeciality ?
                            specialities.map((speciality, index) => {
                                return (

                                    <Grid item md={2} key={index}>
                                        <SectionCard data={speciality} />
                                    </Grid>
                                )
                            })
                            :
                            specialities.map((speciality, index) => {
                                return (
                                    index < 5 &&
                                    <Grid item md={2} key={index}>
                                        <SectionCard data={speciality} />
                                    </Grid>
                                )
                            })
                        }
                        {
                            !viewMoreSpeciality &&
                            <Grid item md={2} onClick={() => setViewMoreSpeciality(true)}>
                                <div className='dFlex cp' style={{ background: '#CDD4D2', flexDirection: 'column', padding: '1rem', borderRadius: '0.4rem', height: '8rem', justifyContent: 'center' }}>
                                    <div style={{ background: '#E7EAE9', padding: '2rem', borderRadius: '50%' }}>
                                        <KeyboardDoubleArrowRightIcon />
                                    </div>
                                    <div style={{ marginTop: '1rem' }}>More</div>
                                </div>
                            </Grid>
                        }
                    </Grid>
                </div>
            </section>

            <section id="Services">
                <div style={{ padding: '4rem' }}>
                    <p className='heading_2_Medium'>Services</p>
                    <p>Choose the speciality and book your appointment</p>
                    <Grid container spacing={2}>
                        {viewMoreService ?
                            services.map((service, index) => {
                                return (

                                    <Grid item md={2} key={index}>
                                        <SectionCard data={service} />
                                    </Grid>
                                )
                            })
                            :
                            services.map((service, index) => {
                                return (
                                    index < 5 &&
                                    <Grid item md={2} key={index}>
                                        <SectionCard data={service} />
                                    </Grid>
                                )
                            })
                        }
                        {
                            !viewMoreService &&
                            <Grid item md={2} onClick={() => setViewMoreService(true)}>
                                <div className='dFlex cp' style={{ background: '#CDD4D2', flexDirection: 'column', padding: '1rem', borderRadius: '0.4rem', height: '8rem', justifyContent: 'center' }}>
                                    <div style={{ background: '#E7EAE9', padding: '2rem', borderRadius: '50%' }}>
                                        <KeyboardDoubleArrowRightIcon />
                                    </div>
                                    <div style={{ marginTop: '1rem' }}>More</div>
                                </div>
                            </Grid>
                        }
                    </Grid>
                </div>
            </section>

            <section id="Contact">
                <div style={{ padding: '4rem', background: '#1E3B35', color: 'white' }}>
                    <p className='heading_2_Medium'>Contact Us</p>
                    <div className='dFlex' style={{ alignItems: 'flex-start' }}>
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
            </section>

            <div style={{ background: '#7B7E7E', justifyContent: 'center', padding: '1rem', color: '#AFB2B2' }} className='dFlex'>
                Copyright (2002) - Prince Faud Bin Sultan Hospital | Credit
            </div>
        </div>
    )
}

export default LandingMain
