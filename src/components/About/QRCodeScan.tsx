/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { setActiveTab } from '../../models/slices/tabsSlice';
import { Tabs } from '../../models/slices/types';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { QrReader }from 'react-qr-reader';

const QRCodeScan = () => {
    const dispatch = useDispatch();
    const { page } = useParams();
    const [scanResult, setScanResult] = useState('');

    const handleScan = (data: any) => {
      if (data) {
        console.log("RESULT: ", data)
        setScanResult(data);
      }
    };        

    useEffect(() => {
        dispatch(setActiveTab(page as Tabs));
    }, [page, dispatch]);

  return (
    <>
      <QrReader
        containerStyle={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '300px',
          width: '300px'
        }}
        constraints={{ facingMode: 'user' }}
        scanDelay={500}
        onResult={handleScan}
      />
      {scanResult && (
        <p>User ID from QR: {scanResult}</p>
      )}
    </>
  )
}

export default QRCodeScan