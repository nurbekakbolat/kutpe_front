import { Button, CardContent, Typography } from '@mui/material'
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import MainActions from './MainActions'

import { useEffect, useState } from 'react'
import { setActiveTab } from '../../models/slices/tabsSlice';
import { Tabs } from '../../models/slices/types';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Landing = () => {
    const dispatch = useDispatch();
    const { page } = useParams();
    const [clicked, setClicked] = useState(false);

    useEffect(() => {
      if (clicked) {
        setTimeout(() => {
          setClicked(false);
        }, 3000)
      }
    }, [clicked])

    useEffect(() => {
        dispatch(setActiveTab(page as Tabs));
    }, [page, dispatch]);

  return (
    <div>
    <CardContent
    className="font-base font-bold"
    >
   <div style={{
    display: "flex",
    flexDirection: "column",
    marginTop: "80px",
    width: "60vw",
    rowGap: "20px",
   }}>
   <Typography sx={{
      fontSize: "1rem",
      lineHeight: "1.8",
      color: "#121212",
      textAlign: "start"
    }}>Skip the wait and secure your spot</Typography>
    <Typography sx={{
      fontSize: "2.4rem",
      lineHeight: "1.2",
      color: "#121212",
      marginBottom: "20px",
      textAlign: "start"
    }}>Queue Smarter, Save Time</Typography>
    </div>
    <Typography sx={{
      fontSize: "1.2rem",
      lineHeight: "1.2",
      fontWeight: "400",
      color: "#121212",
      marginBottom: "40px",
      textAlign: "start"
    }}>Track and Plan Your Appointments</Typography>
    <MainActions />
    <Typography sx={{
      marginTop: "40px",
      fontSize: "2.4rem",
      lineHeight: "1.2",
      color: "#121212",
      textAlign: "start"
    }}>Get on Time Notifications</Typography>
          <Button onClick={() => setClicked(true)} sx={{
          marginTop: "60px",
          borderRadius: "10px",
          backgroundColor: "#012035",
          alignItems: "center",
          justifyContent: "center",
        }} size="large" variant="contained" fullWidth>
         <Typography  sx={{
          color: "#fff",
          marginRight: "10px"
         }}>{clicked ? "Upcoming..." : "Schedule appointment"}</Typography> <EventAvailableIcon sx={{fontSize: "20px"}}/>
        </Button>
    </CardContent>
    </div>
  )
}

export default Landing