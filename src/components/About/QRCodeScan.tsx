/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { setActiveTab } from '../../models/slices/tabsSlice';
import { Tabs } from '../../models/slices/types';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { QrReader }from 'react-qr-reader';
import { fetchUserDetails } from '../../models/slices/userSlice';
import { AppDispatch } from '../../models/store';
import { client, getToken } from '../../client';
import { Typography } from '@mui/material';

const QRCodeScan = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { page } = useParams();
    const [params] = useSearchParams();
    const id = params.get('id') || '';
    const is_superuser = localStorage.getItem('is_superuser')?.toLocaleLowerCase() === 'true';
    const navigate = useNavigate();
    const user_id = getToken();
    const [qr, setQr] = useState('');

  const removeFromQueue = async () => {
    try {
      await client.post(`/queue/${id}/remove/${user_id}/`);
    } catch (error) {
      console.error(error);
    }
  }

    const handleScan = (data: any) => {
      if (data) {
        removeFromQueue();
      }
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
    {id === '34' ? <QrReader
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