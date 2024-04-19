import { Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react'

const CountdownTimer = ({ targetTime }: {targetTime: Date | null}) => {
    const [timeLeft, setTimeLeft] = useState('');
  
    useEffect(() => {
        if (!targetTime) {
            return;
        }

      const intervalId = setInterval(() => {
        const now = new Date().getTime();
        const target = new Date(targetTime).getTime();

        const difference = target - now;
        
        const timeLeft = {
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
  
        if (difference < 0) {
          // Stop the timer
          clearInterval(intervalId);
          setTimeLeft('00:00:00');
        } else {
          // Update the timer
          setTimeLeft(
            `${timeLeft.hours.toString().padStart(2, '0')}:${timeLeft.minutes
              .toString()
              .padStart(2, '0')}:${timeLeft.seconds.toString().padStart(2, '0')}`
          );
        }
      }, 1000);
  
      return () => clearInterval(intervalId);
    }, [targetTime]);
  
    return (
      <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
        <Typography variant="h6" fontWeight={"bold"}>Time Remaining</Typography>
        <Typography variant="h4">{timeLeft}</Typography>
      </Paper>
    );
  };

  export default CountdownTimer;