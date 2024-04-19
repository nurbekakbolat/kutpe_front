import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';

const ChatGPTAdvice = ({ text }: {text: string}) => {
  const [isTyping, setIsTyping] = useState(false);
  const [displayedAdvice, setDisplayedAdvice] = useState('');

  // Simulate the typing effect
  useEffect(() => {
    if (text) {
      setIsTyping(true);
      let i = 0;
      const typingEffect = setInterval(() => {
        if (i < text.length) {
          i++;
          setDisplayedAdvice(text.substring(0, i));
        } else {
          setIsTyping(false);
          clearInterval(typingEffect);
        }
      }, 50);
      return () => clearInterval(typingEffect);
    }
  }, [text]);

  return (

    
    <Typography variant="body1" color="textSecondary" sx={{ mt: 2 }}>{isTyping ? displayedAdvice : text}</Typography>
  );
};

export default ChatGPTAdvice;