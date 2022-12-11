import React, { useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { Tab, Tabs } from '@mui/material';
import axios from 'axios';
import * as constant from '../../constant';
import PastAppointment from './PastAppointment';
import FutureAppointment from './FutureAppointment';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Navigate, useNavigate } from 'react-router';

const useStyles = makeStyles(() => ({
  appointmentRoot: {
    marginTop: '4rem',
    padding: '4rem 2rem'
  },
  back: {
    color: '#1F646F',
    maxWidth: 'fit-content'
  },
  headerLabel:{
    marginTop: '2rem'
  },
  tabWrapper: {
    marginTop: '2rem'
  },
  tabClass: {
    '&.css-1h9z7r5-MuiButtonBase-root-MuiTab-root': {
      textTransform: 'capitalize',
      color: '#1F646F',
      fontSize: '1.2rem',
      fontWeight: '400',
    },
    '&.css-1h9z7r5-MuiButtonBase-root-MuiTab-root.Mui-selected': {
      fontWeight: '600',
      color: '#1F646F',
    }
  }
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

//   TabPanel.propTypes = {
//     children: PropTypes.node,
//     index: PropTypes.number.isRequired,
//     value: PropTypes.number.isRequired,
//   };

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const AppointmentHistory = () => {

  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    // getData(newValue);
  };

  // const getData = (selectedValue) => {
  //     const url = selectedValue === 1 ? `${constant.BASE_URL}/appointments/future` : `${constant.BASE_URL}/appointments/past`;
  //     const headers = {
  //         token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9maWxlIjp7InBhdGllbnRJZCI6MzY1MjY5LCJwYXRpZW50TmFtZSI6IlN1bmlsIEt1bWFyIFJhZ2h1IiwibW9iaWxlTm8iOiIwNTQyNTk3NDcwIiwiZnVsbEFnZSI6IjQzIFllYXJzIiwicmVnQ29kZSI6IlBGQlMuMDAwMDIyMDM1OCJ9LCJzdWIiOiJwYXRpZW50LWFwaSIsImlhdCI6MTY2OTk4MTI5OSwiZXhwIjoxNjc4NjIxMjk5fQ.rvQHOofAWgNUYNvqaYCqcLL0l2yZmhNkUzdORAYxwW4"
  //     }

  //     const body = {
  //         "UHID": "PFBS.0000219720",
  //         "mobile": "0500984269",
  //         "hospitalId": 1,
  //         "type": 1
  //     }

  //     axios.post(url, body, { headers })
  //     .then((res) => {
  //         if(res.status === 200){
  //             console.log(res)
  //         }
  //     })
  //     .catch((e) => {
  //         console.log(e)
  //     })
  // }

  useEffect(() => {

    // getData();
  }, [])

  const backHandler = () => {
    navigate('/home')
  }

  return (
    <div className={classes.appointmentRoot}>
      <div className={`${classes.back} dFlex cp`} onClick={backHandler}  >
        <ArrowBackIosIcon />Back
      </div>
      <div className={`${classes.headerLabel} heading_2_Medium txtColor_light`}>Appointment History</div>

      <div className={classes.tabWrapper}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" TabIndicatorProps={{ style: { background: '#DC3A3A' } }}>
          <Tab label="Past Appointments" {...a11yProps(0)} className={`${classes.tabClass} para_16_400`} />
          <Tab label="Future Appointments" {...a11yProps(1)} className={`${classes.tabClass} para_16_400`} />
        </Tabs>

        <TabPanel value={value} index={0}>
          <PastAppointment />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <FutureAppointment />
        </TabPanel>
      </div>
    </div>
  )
}

export default AppointmentHistory