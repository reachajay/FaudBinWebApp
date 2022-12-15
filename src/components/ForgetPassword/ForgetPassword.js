import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Alert, Backdrop, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar } from '@mui/material';
import TextField from '@mui/material/TextField';
import CommonButton from '../Common/CommonButton';
import * as constant from '../../constant'
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const useStyles = makeStyles(() => ({
    forgetPwdRoot: {
        padding: '4rem'
    },
    errorWrapper: {
        marginTop: '0.5rem',
        color: '#DC3A3A',
        fontSize: '0.8rem'
    },
    btnDiv: {
        marginTop: '2rem',
        justifyContent: 'flex-start'
    },
    btnWrapper: {
        padding: '0 1rem 1rem 1rem',
        width: '100%'
    },
}));

const ForgetPassword = () => {

    const classes = useStyles();
    const [validateId, setValidateId] = useState(true);
    const [textField, setTextField] = useState('');
    const [validateOtp, setValidateOtp] = useState(false);
    const [validationError, setValidationError] = useState('');
    const [enterPwd, setEnterPwd] = useState(false);
    const [newPwd, setNewPwd] = useState('');
    const [confirmPwd, setConfirmPwd] = useState('');
    const navigate = useNavigate();
    const [title, setTitle] = useState("Forget Password ?");
    const [token, setToken] = useState('');
    const [refreshError, setRefreshError] = useState(false);
    const [toastMsg, setToastMsg] = useState('');
    const [loader, setLoader] = useState(false)

    const verifyNationalIDHandler = () => {
        setLoader(true);
        const url = `${constant.BASE_URL}/auth/validateNationalId`
        const headers = {
            "nationalId": textField
        }
        axios.get(url, { headers })
            .then((res) => {
                if (res.status === 200 && res.data.status === true) {
                    setValidateId(false);
                    setValidateOtp(true);
                    setLoader(false);
                    localStorage.setItem("nationalId", textField)
                    setTextField('');
                }
                else {
                    setValidationError("Invalid National ID")
                    setLoader(false);
                }
            })
            .catch((e) => {
                console.log(e)
                setLoader(false);
            })
        // setValidationError("Invalid National ID")
        // setValidateId(false);
        // setValidateOtp(true);
    }

    const verifyOTPHandler = () => {
        setValidationError('');
        setLoader(true)
        const url = `${constant.BASE_URL}/auth/mfa`
        const headers = {
            "nationalId": localStorage.getItem("nationalId"),
            "type": 2,
            "oneTimePassword": textField
        }

        axios.post(url, { headers })
            .then((res) => {
                if (res.status === 200 && res.data) {
                    setLoader(false);
                    if (res.data.message === "MFA success") {
                        localStorage.setItem("token", res.data.tokens.access);
                        setToken(res.data.tokens);
                        setValidateOtp(false);
                        setEnterPwd(true);
                        // localStorage.setItem("isLoggedIn", "true");
                        // navigate('/home');
                    }
                    else {
                        setValidationError("Invalid OTP")
                    }
                }
            })
            .catch((e) => {
                console.log(e);
                setLoader(false);
            })
        // console.log(textField)
        // setValidateOtp(false);
        // setEnterPwd(true);
    }

    const setNewPasswordHandler = () => {

        setValidationError('');
        let tmpToken = token.access
        let details = jwt_decode(tmpToken);
        const data = details.profile;
        setLoader(true);

        const url = `${constant.BASE_URL}/auth/forgotPassword`

        const headers = {
            "nationalId": localStorage.getItem("nationalId"),
            "mobileNo": data.mobileNo,
            "newPassword": newPwd
        }

        axios.post(url, { headers })
            .then((res) => {
                setLoader(false);
                if (res.status === 200 && res.data.message === "Success") {
                    // navigate('/');
                    setTitle("Password changed successfully !!");
                    setEnterPwd(false);
                }
                else {
                    setValidationError("Some error occured. Please try again")
                }
            })
            .catch((e) => {
                console.log(e)
                setLoader(false);
            })

        // setLoader(false);

        // if (newPwd === confirmPwd) {
        //     setTitle("Password changed successfully !!");
        //     setEnterPwd(false);
        // }
        // else {
        //     setValidationError("New password and Confirm password did not match");
        // }
    }

    const refreshToken = () => {

        setLoader(true);
        const url = `${constant.BASE_URL}/auth/refresh`

        const headers = {
            token: token.refresh
        }

        axios.get(url, { headers })
            .then((res) => {
                setLoader(false);
                if (res.status === 200 && res.data.accessToken) {
                    localStorage.setItem("token", res.data.accessToken);
                    setRefreshError(false);
                    navigate('/')
                }
                else {
                    setToastMsg("Some error occured. Please try again !!")
                    setRefreshError(true);
                }
            })
            .catch((e) => {
                console.log(e);
                setLoader(false);
            })

        // setToastMsg("Some error occured. Please try again !!")
        // setRefreshError(true);
    }

    const closeForgetPopupHandler = () => {
        setValidateId(false);
        setValidationError('');
        setValidateOtp(false);
    }

    // const action = (
    //     <React.Fragment>
    //         <IconButton
    //             size="small"
    //             aria-label="close"
    //             color="inherit"
    //             onClick={() => setRefreshError(false)}
    //         >
    //             <CloseIcon fontSize="small" />
    //         </IconButton>
    //     </React.Fragment>
    // );

    const backToLogin = () => {
        navigate('/');
        setValidateId(false);
        setValidateOtp(false)
    }

    return (
        <div className={classes.forgetPwdRoot}>

            <Backdrop sx={{ color: '#fff', zIndex: '1400' }} open={loader}>
                <CircularProgress />
            </Backdrop>

            <div className='para_12_Regular txtColor_light'>{title}</div>
            {/* {title.includes("success") && */}
            <div className={`${classes.btnDiv} dFlex`}>
                <CommonButton name="Back to Login" clickHandler={title.includes("success") ? refreshToken : backToLogin} filledGreen={true} />
            </div>
            {/* } */}


            <Dialog open={validateId || validateOtp} onClose={() => closeForgetPopupHandler()}>
                <DialogTitle>{validateId ? "Verify National ID" : "Validate OTP"}</DialogTitle>
                <DialogContent>
                    <TextField variant='outlined' placeholder={validateId ? 'Enter National ID' : 'Enter OTP'} value={textField} onChange={(e) => setTextField(e.target.value)} />
                    {validationError.length > 0 && <div className={classes.errorWrapper}>{validationError}</div>}
                </DialogContent>
                <DialogActions>
                    <div className={classes.btnWrapper} style={{ pointerEvents: textField.length > 0 ? 'all' : 'none', opacity: textField.length > 0 ? '1' : '0.4' }}>
                        <CommonButton name={validateId ? "Submit" : "Validate"} clickHandler={validateId ? verifyNationalIDHandler : verifyOTPHandler} filledRed={true} />
                    </div>
                </DialogActions>
            </Dialog>

            <Dialog open={enterPwd} onClose={() => { setEnterPwd(false); setLoader(false) }}>
                <DialogTitle>Forgot Password ?</DialogTitle>
                <DialogContent style={{ width: '20rem' }}>
                    <div className='dFlex' style={{ flexDirection: 'column' }}>
                        <TextField type='password' style={{ marginTop: '1rem', width: '100%' }} variant='outlined' placeholder="New Password" value={newPwd} onChange={(e) => setNewPwd(e.target.value)} />
                        <TextField type='password' style={{ marginTop: '1rem', width: '100%' }} variant='outlined' placeholder="Confirm Password" value={confirmPwd} onChange={(e) => setConfirmPwd(e.target.value)} />
                    </div>
                    {validationError.length > 0 && <div className={`${classes.errorWrapper}`}>{validationError}</div>}
                </DialogContent>
                <DialogActions>
                    <div className={classes.btnWrapper} style={{ pointerEvents: newPwd.length > 0 && newPwd.length === confirmPwd.length ? 'all' : 'none', opacity: newPwd.length > 0 && newPwd.length === confirmPwd.length ? '1' : '0.4' }}>
                        <CommonButton name="Confirm" clickHandler={setNewPasswordHandler} filledRed={true} />
                    </div>
                </DialogActions>
            </Dialog>

            <Snackbar open={refreshError} autoHideDuration={6000}>
                <Alert severity='error'
                    action={
                        <IconButton
                            size="small"
                            aria-label="close"
                            color="inherit"
                            onClick={() => { setRefreshError(false); setLoader(false) }}
                        >
                            <CloseIcon fontSize="small" />
                        </IconButton>}
                >{toastMsg}</Alert>
            </Snackbar>
        </div>
    )
}

export default ForgetPassword