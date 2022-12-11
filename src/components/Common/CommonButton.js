import React from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    btnWrapper:{
        padding: '1rem 1.6rem',
        // background: '#DC3A3A',
        color: 'white',
        borderRadius: '0.4rem',
        cursor: 'pointer',
        textAlign: 'center',
        // border: '1px solid #DC3A3A'
    },
    outlinedGreenBtn:{
        border: '1px solid #1F646F',
        color: '#1F646F'
    },
    outlinedRedBtn:{
        border: '1px solid #DC3A3A', 
        color: '#DC3A3A'
    },
    filledGreenBtn:{
        background: '#1F646F',
        color: 'white'
    },
    filledRedBtn:{
        background: '#DC3A3A',
        color: 'white'
    }
}))

const CommonButton = (props) => {

    const classes = useStyles();

    return (
        <div className={props.outlineRed ? `${classes.btnWrapper} ${classes.outlinedRedBtn}` : props.outlineGreen ? `${classes.btnWrapper} ${classes.outlinedGreenBtn}` : props.filledRed ? `${classes.btnWrapper} ${classes.filledRedBtn}` : props.filledGreen ? `${classes.btnWrapper} ${classes.filledGreenBtn}` : `${classes.btnWrapper}`} onClick={props.clickHandler}>
            {props.name}
        </div>
    )
}

export default CommonButton