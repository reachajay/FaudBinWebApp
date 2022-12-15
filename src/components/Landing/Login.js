import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import LoginPopup from './LoginPopup';
import CommonButton from '../Common/CommonButton';
import * as constant from '../../constant'
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import { Alert, Backdrop, IconButton, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router';
import CloseIcon from '@mui/icons-material/Close';


const useStyles = makeStyles(() => ({
    rootDiv: {
        // display: 'flex',
        // alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 'calc(100vh - 5rem)',
        // minHeight: '100vh'
        // padding: '2rem',
        // '-webkit-filter':'blur(5px)'
    },

    glassSection: {
        background: 'rgba(109, 165, 174, 0.2)',
        backdropFilter: 'blur(20px)',
        borderRadius: '0.4rem',
        padding: '2rem',
        border: '1px solid #B6B6B6',
        width: '50vw',
    },

    leftDiv: {
        width: '60%',
        padding: '2rem',
    },

    marginDiv: {
        marginTop: '1rem !important',
    },

    rightDiv: {
        display: 'flex',
        flexDirection: 'column',
        width: '40%',
        padding: '2rem',
        borderLeft: '1px solid black',
    },

    bottomDiv: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    btnDiv: {
        justifyContent: 'center',
        marginTop: '1rem'
    }
}));

const Login = () => {
    const [credential, setCredential] = useState({ id: '2316750625', pwd: 'sk@123' });
    const [validate, setValidate] = useState(false);
    const [error, setError] = useState('');
    const classes = useStyles();
    const [loader, setLoader] = useState(false);
    const [apiError, setApiError] = useState(false);
    const [apiErrorMsg, setApiErrorMsg] = useState('')
    const navigate = useNavigate();

    const changeHandler = (e) => {
        setCredential({
            ...credential,
            [e.target.name]: e.target.value
        });
    }

    const closePopupHandler = () => {
        setValidate(false);
        setCredential({
            id: '',
            pwd: ''
        })
    }

    const loginHandler = () => {
        // dispatch(setNationalId(credential.id))
        setLoader(true)

        localStorage.setItem("nationalId", credential.id)

        const url = `${constant.BASE_URL}/auth/login`
        const headers = {
            "nationalId": credential.id,
            "password": credential.pwd
        }

        axios.post(url, headers)
            .then((res) => {
                if (res.status === 200) {
                    if (res.data.message === "Login Success") {
                        setValidate(true);
                        setLoader(false);
                    }
                    // console.log(res)
                    else {
                        setError("Invalid National Id or Password");
                        setLoader(false);
                    }
                }
            })
            .catch((e) => {
                console.log(e);
                setLoader(false);
                setApiErrorMsg(e.message);
                setApiError(true);
            })
    }

    const blurHandler = (e) => {
        // console.log(e.target.value)
        if (e.target.value && e.target.value.length > 0) {
            console.log("Validation Successful")
        }
        else {
            console.log("Please enter valid id")
        }
    }

    setTimeout(() => {
        setApiError(false)
    }, 5000);

    return (
        <div className={`${classes.rootDiv} bg-Gradient dFlex`}>

            <Backdrop sx={{ color: '#fff', zIndex: '1400' }}
                open={loader}>
                <CircularProgress />
            </Backdrop>

            <div className={classes.glassSection}>
                <div>
                    <div className='dFlex landingHeader' style={{ justifyContent: 'center', fontWeight: '500' }}>Login</div>
                    <div style={{ flexDirection: 'column' }} className='dFlex'>
                        <TextField style={{ width: 'calc(100% - 25rem)' }} variant="outlined" placeholder='Enter NationalID' name="id" onBlur={(e) => blurHandler(e)} value={credential.id} onChange={(e) => changeHandler(e)} className={classes.marginDiv} />
                        <TextField style={{ width: 'calc(100% - 25rem)' }} variant="outlined" placeholder='Enter Password' name="pwd" type={'password'} value={credential.pwd} onChange={(e) => changeHandler(e)} className={classes.marginDiv} />
                        {error.length > 0 && <div>{error}</div>}
                    </div>
                    <div className={`${classes.btnDiv} dFlex`} style={{ pointerEvents: credential.id && credential.pwd ? 'all' : 'none', opacity: credential.id && credential.pwd ? '1' : '0.4' }}>
                        <div style={{ width: 'calc(100% - 25rem)' }}>
                            <CommonButton name="Login" clickHandler={loginHandler} filledRed={true} />
                        </div>
                    </div>
                </div>
                <div className='dFlex' style={{ justifyContent: 'center', width: '100%', marginTop: '1rem' }}>
                    <div style={{ marginRight: '12rem' }} className='cp' onClick={() => navigate('/forgetPassword')}>Forgot Password ?</div>
                    {/* <div title='This feature is not yet ready' className='cp'>New User</div> */}
                </div>
                {
                    validate && <LoginPopup open={validate} closeHandler={closePopupHandler} />
                }
            </div>

            <Snackbar open={apiError} autoHideDuration={600}>
                <Alert
                    severity='error'
                    action={
                        <IconButton size='small' aria-label="close" color="inherit" onClick={() => setApiError(false)}>
                            <CloseIcon fontSize='small' />
                        </IconButton>}
                >
                    {apiErrorMsg}
                </Alert>
            </Snackbar>

        </div>
    )
}

export default Login