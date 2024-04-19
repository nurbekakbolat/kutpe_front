/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { setActiveTab } from '../../models/slices/tabsSlice';
import { Tabs } from '../../models/slices/types';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { QrReader }from 'react-qr-reader';
import { fetchUserDetails } from '../../models/slices/userSlice';
import { AppDispatch, RootState } from '../../models/store';
import { client } from '../../client';
import { Typography } from '@mui/material';

const QRCodeScan = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { page } = useParams();
    const navigate = useNavigate();
    const isAdmin = useSelector((state: RootState) => state.user.is_superuser);
    const [scanResult, setScanResult] = useState('');
    const [qr, setQr] = useState('');

    const handleScan = (data: any) => {
      if (data) {
        console.log("RESULT: ", data)
        setScanResult(data);
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
    {isAdmin ? <QrReader
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
    <Typography variant="h4" gutterBottom>
      Show the QR Code to bank staff to check in
    </Typography>
        <img src={qr} alt="QR Code" />
      </>} 
      
      {scanResult && (
        <p>User ID from QR: {scanResult}</p>
      )}
    </div>
  )
}

export default QRCodeScan