import React from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    btnWrapper:{
        padding: '1rem 1.6rem',
        background: '#DC3A3A',
        color: 'white',
        borderRadius: '0.4rem',
        cursor: 'pointer'
    }
}))

const CommonButton = (props) => {

    const classes = useStyles();

    return (
        <div className={classes.btnWrapper} onClick={props.clickHandler}>
            {props.name}
        </div>
    )
}

export default CommonButton