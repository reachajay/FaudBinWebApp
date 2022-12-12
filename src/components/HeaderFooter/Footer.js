import React from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    contactWrapperDiv: {
        padding: '2rem',
        background: '#2A3A40',
        color: 'white'
    },
    eachContactWrapper: {
        alignItems: 'flex-start',
        color: '#E0E0E0'
    },
    footerheading:{
        borderBottom: '2px solid #B9BBBB'
    },
    bottomRibbon: {
        background: '#525252',
        justifyContent: 'center',
        padding: '1rem',
        color: '#A8A8A8'
    },
}))

const Footer = () => {

    const classes = useStyles()
    return (
        <div>
            <div className={classes.contactWrapperDiv}>
                <p className='heading_4_Medium' style={{ color: '#F4F4F4' }}>Contact Us</p>
                <div className={`${classes.eachContactWrapper} dFlex para_12_Regular`}>
                    <div style={{ padding: '1rem' }}>
                        <p className={classes.footerheading}>Introduction</p>
                        <p>Chairman</p>
                        <p>Message</p>
                        <p>Hospital</p>
                        <p>Accredition</p>
                        <p>Career</p>
                    </div>
                    <div style={{ padding: '1rem' }}>
                        <p className={classes.footerheading}>Find a Doctor</p>
                        <p>Medical Services</p>
                        <p>Nursing Services</p>
                        <p>Accomplishment</p>
                        <p>Supporting Medical</p>
                        <p>Services</p>
                        <p>Hospital Indicator</p>
                        <p>Programs</p>
                    </div>
                    <div style={{ padding: '1rem' }}>
                        <p className={classes.footerheading}>Media Center</p>
                        <p>News & Events</p>
                        <p>Video Gallery</p>
                        <p>Podcast</p>
                    </div>
                    <div style={{ padding: '1rem' }}>
                        <p className={classes.footerheading}>Contact Us</p>
                        <p>Get in Touch</p>
                        <p>Complaints & Suggestions</p>
                    </div>
                    <div style={{ padding: '1rem' }}>
                        <p className={classes.footerheading}>Mobile</p>
                        <p>Application</p>
                        <p>Report a Violation</p>
                    </div>
                </div>
            </div>
            <div className={`${classes.bottomRibbon} dFlex para_10_Regular`}>
                Copyright (2002) - Prince Faud Bin Sultan Hospital | Credit
            </div>
        </div>
    )
}

export default Footer