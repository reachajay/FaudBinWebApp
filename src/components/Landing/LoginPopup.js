import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    dialog: {
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column'
    },
    margin:{
        marginTop: '1rem !important',
    }
}));

const LoginPopup = (props) => {
    const classes = useStyles()
    const [otp, setOtp] = useState('');
    return (
        <Dialog open={props.open} onClose={props.closeHandler}>
            <div className={classes.dialog}>
                <div>Enter OTP</div>
                <TextField variant="outlined" placeholder='Enter OTP' type={'password'} value={otp} onChange={(e) => setOtp(e.target.value)} className={classes.margin} />
                <Button variant="contained" className={classes.margin} >Login</Button>
            </div>
        </Dialog>
    )
}

export default LoginPopup