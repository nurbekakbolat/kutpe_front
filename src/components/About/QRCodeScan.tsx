/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { setActiveTab } from '../../models/slices/tabsSlice';
import { Tabs } from '../../models/slices/types';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { QrReader }from 'react-qr-reader';
import { fetchUserDetails } from '../../models/slices/userSlice';
import { AppDispatch } from '../../models/store';
import { client, getToken } from '../../client';
import { Typography } from '@mui/material';

const QRCodeScan = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { page } = useParams();
    const id = getToken();
    const navigate = useNavigate();
    const [qr, setQr] = useState('');

  const getQueueData = async () => {
      try {
        await client.post(`/queue/${id}/`, {
          service_name: "deposit"
        }).then((response) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const user = response.data.participants.find((user: any) => user.user.toString() === 5);

          if (!user) {
            navigate('/nearby');
          }
        });
      } catch (error) {
        console.error(error);
      }
    }

  const removeFromQueue = async () => {
    try {
      await client.post(`/queue/${8944227500}/remove/${5}/`);

    } catch (error) {
      console.error(error);
    }
  }

    const handleScan = (data: any) => {
      console.log(data);
      removeFromQueue();
    };

    const getQR = async () => {
      try {
        const res = await client.post('/qr/');

        console.log("QR: ", res.data)
        setQr(res.data);
      } catch (error) {
        console.error(error);
      }
    }
    
    useEffect(() => {
        dispatch(setActiveTab(page as Tabs));

        getQR();

        const intervalId = setInterval(() => {
          getQueueData();
      }, 3000);
        try {
          dispatch(fetchUserDetails());
        } catch (error) {
          console.error(error);
    
          navigate('/auth');
    
          return;
        }    

        return () => clearInterval(intervalId);

    }, [page, dispatch, navigate]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh'
    }}>
    {id === '10' ? <QrReader
        containerStyle={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '300px',
          width: '300px'
        }}
        constraints={{ facingMode: 'environment' }}
        scanDelay={500}
        onResult={handleScan}
      /> : <> 
    <Typography style={{
    }} variant="h4" gutterBottom>
      Show the QR Code to bank staff to check in
    </Typography>
        <img src={qr} alt="QR Code" />
      </>} 
    </div>
  )
}

export default QRCodeScan