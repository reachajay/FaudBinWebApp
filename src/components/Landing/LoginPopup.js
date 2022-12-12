import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import CommonButton from '../Common/CommonButton';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { setLoggedIn, setToken, setUserProfile } from '../../store/reducers/UserData';
import axios from 'axios';
import * as constant from '../../constant';
import jwt_decode from "jwt-decode";
import { DialogTitle } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';


const useStyles = makeStyles(() => ({
    dialog: {
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column'
    },
    margin: {
        marginTop: '1rem !important',
    },
    glassSection: {
        background: 'rgba(109, 165, 174, 0.2)',
        backdropFilter: 'blur(20px)',
        borderRadius: '0.4rem',
        padding: '2rem',
        border: '1px solid #B6B6B6',
    },
    titleWrapper:{
        justifyContent: 'space-between'
    }
}));

const LoginPopup = (props) => {
    const classes = useStyles()
    const [otp, setOtp] = useState('');
    const navigate = useNavigate();
    // const nationalId = useSelector(state => state.userData.nationalId);
    const nationalId = localStorage.getItem("nationalId");
    const [errorMsg, setErrorMsg] = useState('');
    const [loader, setLoader] = useState(false);
    // const dispatch = useDispatch()

    const changeHandler = (e) => {
        if (e.target.value.match("^[0-9]") !== null) {
            setOtp(e.target.value);
        }
    }

    const loginHandler = () => {
        // dispatch(setLoggedIn(true))
        // localStorage.setItem("isLoggedIn", "true")
        // localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9maWxlIjp7InBhdGllbnRJZCI6MzY1MjY5LCJwYXRpZW50TmFtZSI6IlN1bmlsIEt1bWFyIFJhZ2h1IiwibW9iaWxlTm8iOiIwNTQyNTk3NDcwIiwiZnVsbEFnZSI6IjQzIFllYXJzIiwicmVnQ29kZSI6IlBGQlMuMDAwMDIyMDM1OCJ9LCJzdWIiOiJwYXRpZW50LWFwaSIsImlhdCI6MTY2OTk4MTI5OSwiZXhwIjoxNjc4NjIxMjk5fQ.rvQHOofAWgNUYNvqaYCqcLL0l2yZmhNkUzdORAYxwW4")
        setLoader(true);
        const url = `${constant.BASE_URL}/auth/mfa`
        const headers = {
            "nationalId": nationalId,
            "type": 2,
            "oneTimePassword": otp
        }

        axios.post(url, headers)
            .then((res) => {
                if (res.status === 200 && res.data) {
                    setLoader(false);
                    if (res.data.message === "MFA success") {
                        localStorage.setItem("token", res.data.tokens.access);
                        localStorage.setItem("isLoggedIn", "true");
                        navigate('/home');
                    }
                    else {
                        setErrorMsg("Invalid OTP")
                    }
                    // console.log(res)
                    //  dispatch(setToken(res.data.tokens.access))
                    // Below 2 lines code is for decoding the token and saving data in redux store
                    //  let details = jwt_decode(res.data.tokens.access); -- We can remove

                    //  dispatch(setUserProfile(details.profile)); -- We can remove
                }
            })
            .catch((e) => {
                console.log(e);
                setLoader(false);
            })
        // let details = jwt_decode("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9maWxlIjp7InBhdGllbnRJZCI6MzY1MjY5LCJwYXRpZW50TmFtZSI6IlN1bmlsIEt1bWFyIFJhZ2h1IiwibW9iaWxlTm8iOiIwNTQyNTk3NDcwIiwiZnVsbEFnZSI6IjQzIFllYXJzIiwicmVnQ29kZSI6IlBGQlMuMDAwMDIyMDM1OCJ9LCJzdWIiOiJwYXRpZW50LWFwaSIsImlhdCI6MTY2OTk4MTI5OSwiZXhwIjoxNjc4NjIxMjk5fQ.rvQHOofAWgNUYNvqaYCqcLL0l2yZmhNkUzdORAYxwW4")
        // console.log(details)
        // dispatch(setUserProfile(details.profile));
        // dispatch(setToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9maWxlIjp7InBhdGllbnRJZCI6MzY1MjY5LCJwYXRpZW50TmFtZSI6IlN1bmlsIEt1bWFyIFJhZ2h1IiwibW9iaWxlTm8iOiIwNTQyNTk3NDcwIiwiZnVsbEFnZSI6IjQzIFllYXJzIiwicmVnQ29kZSI6IlBGQlMuMDAwMDIyMDM1OCJ9LCJzdWIiOiJwYXRpZW50LWFwaSIsImlhdCI6MTY2OTk4MTI5OSwiZXhwIjoxNjc4NjIxMjk5fQ.rvQHOofAWgNUYNvqaYCqcLL0l2yZmhNkUzdORAYxwW4"))
    }

    return (
        <>
        {loader && <CircularProgress />}
        <Dialog open={props.open} onClose={props.closeHandler}>
            <div className={`${classes.dialog} ${classes.glassSection}`}>
            {/* <DialogTitle>
                <div className={`${classes.titleWrapper} dFlex`}>
                    <div>Validation</div>
                    <CloseIcon onClick={props.closeHandler} />
                </div>
            </DialogTitle> */}
                <div>Enter OTP</div>
                {/* <TextField variant="outlined" placeholder='Enter OTP' type={'password'} value={otp} onChange={(e) => setOtp(e.target.value)} className={classes.margin} /> */}
                <TextField variant="outlined" placeholder='Enter OTP' type={'password'} value={otp} onChange={(e) => changeHandler(e)} className={classes.margin} />
                {errorMsg.length > 0 && <div>{errorMsg}</div>}
                <div className={classes.margin} style={{ pointerEvents: otp.trim().length > 0 ? 'all' : 'none', opacity: otp.trim().length > 0 ? '1' : '0.4' }}>
                    <CommonButton name="Login" clickHandler={loginHandler} filledRed={true} />
                </div>
            </div>
        </Dialog>
        </>
    )
}

export default LoginPopup