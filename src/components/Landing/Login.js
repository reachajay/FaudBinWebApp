import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LoginPopup from './LoginPopup';



const useStyles = makeStyles(() => ({
    rootDiv: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        // height: '90vh',
        // padding: '2rem',
        border: '1px solid black',
        background: 'white',
        // '-webkit-filter':'blur(5px)'
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

    bottomDiv:{
        display: 'flex',
        alignItems:'center',
        justifyContent: 'space-between'
    },
    
}));

const Login = () => {
    const [credential, setCredential] = useState({id: '', pwd: ''});
    const [validate, setValidate] = useState(false);
    const classes = useStyles();

    const changeHandler = (e) => {
        setCredential({[e.target.name]: e.target.value});
    }

    const closePopupHandler = () => {
        setValidate(false);
        setCredential({
            id: '',
            pwd: ''
        })
    }

    return (
        <div className={classes.rootDiv}>
            <div className={classes.leftDiv}>
                <div>Logo</div>
                <div className={`${classes.marginDiv} heading_2_Medium`}>Faud Bin Sultan Hospital</div>
                <div className={`${classes.marginDiv} para_12_Regular`}>Some random text for the details about the hospital which will show some further details</div>
            </div>

            <div className={classes.rightDiv}>
                {/* <img src={LoginBg} /> */}
                <div className='para_12_Regular'>Login</div>
                <TextField variant="outlined" placeholder='Enter NationalID' value={credential.id} onChange={(e) => changeHandler(e)} className={classes.marginDiv} />
                <TextField variant="outlined" placeholder='Enter Password' type={'password'} value={credential.pwd} onChange={(e) => changeHandler(e)} className={classes.marginDiv} />
                <Button variant="contained" className={classes.marginDiv} onClick={() => setValidate(true)}>Login</Button>
                <div className={`${classes.bottomDiv} ${classes.marginDiv}  para_12_Regular`}>
                    <span className='cp'>Forgot Password</span>
                    <span className='cp'>New User?</span>
                </div>
            </div>
            {
                validate && <LoginPopup open={validate} closeHandler={closePopupHandler} />
            }
        </div>
    )
}

export default Login