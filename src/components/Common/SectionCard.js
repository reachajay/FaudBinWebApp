import React from 'react';
// import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
// import { useDispatch } from 'react-redux';
// import { setData } from '../../store/reducers/SelectedData';

const useStyles = makeStyles(() => ({
    wrapperCardDiv: {
        background: 'rgba(0, 0, 0, 0.2)',
        flexDirection: 'column',
        padding: '2rem',
        borderRadius: '0.4rem',
        height: '8rem',
        justifyContent: 'center',
        '&:hover': {
            boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
        }
    },
    innerDiv: {
        background: 'rgba(255, 255, 255, 0.4)',
        padding: '1.8rem',
        borderRadius: '50%'
    },
    textLabel: {
        marginTop: '1rem',
        textAlign: 'center',
        textTransform: 'capitalize'
    }
}))

const SectionCard = (props) => {

    const classes = useStyles();

    return (
        <div >
            <div className={`${classes.wrapperCardDiv} dFlex cp`}>
                <div className={classes.innerDiv}>
                    <img src={props && props.icon && props.icon} alt="ic" />
                </div>
                <div className={classes.textLabel}>{props.data.toLowerCase()}</div>
            </div>
        </div>
    )
}

export default SectionCard