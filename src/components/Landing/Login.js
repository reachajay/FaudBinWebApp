import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import LoginPopup from './LoginPopup';
import CommonButton from '../Common/CommonButton';
import * as constant from '../../constant'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setNationalId } from '../../store/reducers/UserData';
import CircularProgress from '@mui/material/CircularProgress';


const useStyles = makeStyles(() => ({
    rootDiv: {
        // display: 'flex',
        // alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 'calc(100vh - 4rem)',
        minHeight: '100vh'
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
    const [loader, setLoader] = useState(false)
    // const dispatch = useDispatch();

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

    return (
        <div className={`${classes.rootDiv} bg-Gradient dFlex`}>
            {
                loader
                    ?
                    <CircularProgress />
                    :
                    <div className={classes.glassSection}>
                        <div className='dFlex landingHeader' style={{ justifyContent: 'center', fontWeight: '500' }}>Login</div>
                        <div style={{ flexDirection: 'column' }} className='dFlex'>
                            <TextField variant="outlined" placeholder='Enter NationalID' name="id" onBlur={(e) => blurHandler(e)} value={credential.id} onChange={(e) => changeHandler(e)} className={classes.marginDiv} />
                            <TextField variant="outlined" placeholder='Enter Password' name="pwd" type={'password'} value={credential.pwd} onChange={(e) => changeHandler(e)} className={classes.marginDiv} />
                            {error.length > 0 && <div>{error}</div>}
                        </div>
                        {/* <Button variant="contained" className={classes.marginDiv} onClick={() => setValidate(true)}>Login</Button> */}
                        <div className={`${classes.btnDiv} dFlex`} style={{ pointerEvents: credential.id && credential.pwd ? 'all' : 'none', opacity: credential.id && credential.pwd ? '1' : '0.4' }}>
                            <div style={{ width: '13rem' }}>
                                <CommonButton name="Login" clickHandler={loginHandler} filledRed={true} />
                            </div>
                        </div>
                        {
                            validate && <LoginPopup open={validate} closeHandler={closePopupHandler} />
                        }
                    </div>
            }
        </div>
    )
}

export default Login