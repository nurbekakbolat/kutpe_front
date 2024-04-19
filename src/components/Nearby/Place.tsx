import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { client, getToken } from '../../client'
import { Button, Paper, Stack, Typography } from '@mui/material';
import { Queue } from '../../models/types/place';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import ChatGPTAdvice from '../GPTAdvice';
import { useDispatch as reduxUseDispatch } from 'react-redux';
import CountdownTimer from './QueueState';
import dayjs from 'dayjs';
import { AppDispatch } from '../../models/store';
import { fetchUserDetails } from '../../models/slices/userSlice';
import LineChart from './Graph';

export interface Datapoint {
  id: number
  waiting_time: number
  date: string
  service_name: string
  org_id: string
}

// eslint-disable-next-line react-refresh/only-export-components
export const Banks: Record<string, string> = {
  'Jusan' : "https://play-lh.googleusercontent.com/aNk0WGRPbyNzVwBiGMSv8AByg_7PEQFJCjaVAr73EVAvxtiLnxvbHapTdjoF3POJIQ",
  'Рбк': "https://upload.wikimedia.org/wikipedia/commons/6/66/Logo_Bank_RBK.png",
  'ForteBank': "https://play-lh.googleusercontent.com/MID_9UdhBp6QtxI9u5_0r6Ek1QZa1oaqtnzp_0HK72oKCJOeZw7-bOXBctYyWQGHYLDl",
  'Bereke Bank': "https://media.licdn.com/dms/image/D560BAQH-PcHo9ATS2A/company-logo_200_200/0/1700023468583/berekebank_logo?e=2147483647&v=beta&t=clQlezx9Ly1t_amnbej51rZyNEsjI_oCePNOeVVPKdw"
}

function convertToHumanTime(decimalTime: number) {
  const minutes = Math.floor(decimalTime);
  const seconds = Math.round((decimalTime - minutes) * 60);
  const currentTime = dayjs();
  const targetTimeMinutes = currentTime.add(minutes, 'minutes').toDate();
  const targetTime = dayjs(targetTimeMinutes).add(seconds, 'seconds').toDate();
  
  return {
    timeText: `${minutes > 0 ? `${minutes} minute${minutes !== 1 ? 's' : ''} ` : ''}${seconds} second${seconds !== 1 ? 's' : ''}`,
    targetTime
  };
}

const Place = () => {
  const [params] = useSearchParams()
  const navigate = useNavigate();
  const dispatch = reduxUseDispatch<AppDispatch>();
  const auth = useMemo(() => localStorage.getItem('token'), []) || '';
  const id = params.get('id')
  const [waitingTime, setWaitingTime] = useState("Calculating...");
  const [targetTime, setTargetTime] = useState<Date | null>(null);
  const [queueState, setQueueState] = useState(false);
  const [bankInfo, setBankInfo] = useState<Queue | null>(null);
  const [text, setText] = useState('Please wait for a moment while we generate some advice for you.');
  const [data, setData] = useState<Datapoint[]>([]);

  const callGPT = () => {
    try {
      client.post('/get-advice/').then((response) => {
        setText(response.data);
      });
    } catch (error) {
      console.error(error);
    }
  }

  const getQueueData = async () => {
    try {
      await client.post(`/queue/${id}/`, {
        service_name: "deposit"
      }).then((response) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const user = response.data.participants.find((user: any) => user.user.toString() === auth);
        console.log(user)
        if (user) {
          setQueueState(true);
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  const getGraphData = async () => {
    try {
      await client.post(`/queue/${id}/waiting_time_date/`, {
        service_name: "deposit",
        "date":"2024-04-19"
      }).then((response) => {
        setData(response.data);
      });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    callGPT();
    getGraphData();
    const fetchBySearch = async () => {
      if (id) {
        try {
          const response = await client.post(`/queue/${id}/`, {
            service_name: "deposit"
          });

          const time = response.data.waiting_time.toFixed(2);
          const { targetTime, timeText } = convertToHumanTime(time);

          setBankInfo(response.data);
          setWaitingTime(timeText);
          setTargetTime(targetTime);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchBySearch();

    const intervalId = setInterval(fetchBySearch, 30000);

    return () => {
      clearInterval(intervalId);
      setQueueState(false);
    };
  }, [id]);

  const handleJoinQueue = async () => {
    const token = getToken();
    console.log(token)
    if (!token) navigate('/auth');

    try {
      await dispatch(fetchUserDetails());
    } catch (error) {
      console.error(error);

      navigate('/auth');

      return;
    }    

    setQueueState(true);
    try {
      await client.post(`/add-to-queue/${id}/${auth}`, {
        service_name: "deposit"
      });


    } catch (error) {
      console.error(error);
    }
  };

  const handleQueueLeave = async () => {
    try {
      await client.post(`/leave-queue/${id}/${auth}`);
    } catch (error) {
      console.error(error);
    }

    setQueueState(false);
  };

  useEffect(() => {
    getQueueData();

  }, [])

  return (
    <Stack
    direction="column"
    justifyContent="center"
    alignItems="center"
    spacing={4}
    sx={{
      width: '100%',
      mx: 'auto',
      my: 24,
    }}
  >
    <Paper elevation={0} sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 3,
      backgroundColor: '#ffffff',
      borderRadius: '16px'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        columnGap: '10px',
        flexDirection: 'row',
        width: '100%',
        paddingTop: '20px'
      }}>
      <Typography variant="h5" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
        {bankInfo?.org.name}
      </Typography>
      {bankInfo && <img height={32} width={32} src={Banks[bankInfo.org.name]} alt={`${bankInfo.org.name} logo`} />}
      </div>
      <Typography variant="body1" color="textSecondary">
        {bankInfo?.description}
      </Typography>
    <div style={{
      alignSelf: 'start',
      width: '100%',
    
    }}>
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'column',
      width: '100%',
      marginBottom: '10px'
    }}>
       <Typography variant="h6" sx={{ fontWeight: 'bold' }} align='center'>Number of People in a queue</Typography> 
        <Typography variant="h6" component="span" color="primary" sx={{ fontWeight: 'bold', ml: 1 }}>
          {bankInfo?.number_of_people}
        </Typography>
      </div>
      <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'column',
      width: '100%',
      marginBottom: '10px'
    }}>
      {queueState ?<CountdownTimer targetTime={targetTime} /> : <>
      <Typography variant="h6" sx={{ fontWeight: 'bold' }} align='center'>Waiting Time</Typography>  
        <Typography variant="h6" component="span" color="primary" sx={{ fontWeight: 'bold', ml: 1 }}>
          {waitingTime}
        </Typography>
        </>}
        </div>
    </div>
    {queueState ? <>
      <Button
        variant="contained"
        color="warning"
        endIcon={<LogoutIcon />}
        onClick={handleQueueLeave}
        sx={{
          fontSize: '1rem',
          padding: '10px 20px',
          fontWeight: 'bold',
          color: '#ffffff',
          alignSelf: 'flex-end',
          borderTopLeftRadius: 0,
          borderTopRightRadius: '16px',
          borderBottomRightRadius: '16px',
          borderBottomLeftRadius: 0,
          '&:hover': {
            backgroundColor: '#388e3c',
          },
          boxShadow: 'none',
          marginRight: '0',
        }}
      >
        Leave
      </Button>
    </> : <Button
        variant="contained"
        color="primary"
        endIcon={<AddCircleOutlineIcon />}
        onClick={handleJoinQueue}
        sx={{
          fontSize: '1rem',
          padding: '10px 20px',
          fontWeight: 'bold',
          backgroundColor: '#4caf50',
          color: '#ffffff',
          alignSelf: 'flex-end',
          borderTopLeftRadius: 0,
          borderTopRightRadius: '16px',
          borderBottomRightRadius: '16px',
          borderBottomLeftRadius: 0,
          '&:hover': {
            backgroundColor: '#388e3c',
          },
          boxShadow: 'none',
          marginRight: '0',
        }}
      >
        Join Queue
      </Button>} 
      <ChatGPTAdvice text={text} />
      <Typography>
        See Dynamics during the day
      </Typography>
      <div style={{
        height: "600px"
      }}>
      <LineChart data={data}/>
      </div>

    </Paper>
  </Stack>
  )
}

export default Place