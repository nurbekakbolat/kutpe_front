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
    const user_id = getToken();
    const [qr, setQr] = useState('');

  const removeFromQueue = async () => {
    try {
      await client.post(`/queue/${8944227500}/remove/${user_id}/`);
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
        try {
          dispatch(fetchUserDetails());
        } catch (error) {
          console.error(error);
    
          navigate('/auth');
    
          return;
        }    

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