import { Box, Button, Input, Typography } from "@mui/material"
import { client } from '../../client'
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Auth = () => {
    const navigate = useNavigate();

    const [number, setNumber] = useState('');
    const [enterOtp, setEnterOtp] = useState(false);
    const [otp, setOtp] = useState('');
const handleOtp = async () => {
    try {
        const res = await client.post('auth/login/', {
            phone_number: number,
            password: otp
        });

        localStorage.setItem('token', res.data.user);
        localStorage.setItem('is_superuser', res.data.is_superuser);

        navigate('/nearby')
    }
    catch (error) {
        console.log(error)
    }
}

const handleRegister = async () => {
    try {
        await client.post('registration/', {
            phone_number: number
        });

        setEnterOtp(true);
    }
    catch (error) {
        console.log(error)
    }
}

const handleLogin = async () => {
    try {
        const res = await client.post('auth/login/', {
            phone_number: number
        });

        navigate('/nearby')
        localStorage.setItem('token', res.data);
    }
    catch (error) {
        console.log(error)
    }

}

  return (
    <Box sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        rowGap: "20px",
        width: "100%",
        padding: "0px",
        flexGrow: 1
    }}>
        <Typography fontWeight="bold" fontSize={14}>Please Enter Your Number</Typography>
        <Input
                placeholder="Number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                sx={{
                    borderBottom: "2px solid #121212",
                    borderRadius: "0px",
                    height: "50px",
                    width: "100%",
                    backgroundColor: "transparent",
                    padding: "10px",
                    color: "#121212",
                    '&::placeholder': {
                        color: "lightgrey",
                        opacity: 1
                    },
                    '&:hover': {
                        outline: "none"
                    },
                    '&:focus': {
                        borderBottom: "1px solid #fff",
                        outline: "none"
                    },
                    '&&&:before': {
                        borderBottom: "none"
                    },
                    '&&:after': {
                        borderBottom: "none"
                    }
                }}
            />
        {enterOtp && (
            <>
            <Typography fontWeight="bold" fontSize={14}>Please Enter OTP</Typography>
            <Input
            placeholder="Code"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            sx={{
                height: "50px",
                width: "100%",
                backgroundColor: "transparent",
                padding: "10px",
                borderBottom: "1px solid #121212",
                color: "#121212",
                '&::placeholder': {
                    color: "lightgrey",
                    opacity: 1
                },
                '&:hover': {
                    border: "none",
                    outline: "none"
                },
                '&:focus': {
                    border: "none",
                    outline: "none"
                },
                '&&&:before': {
                    borderBottom: "none"
                },
                '&&:after': {
                    borderBottom: "none"
                }
            }}
        /></>
        )}
        {otp ? (
            <Button onClick={handleOtp} variant="outlined" sx={{
                display: "flex",
                alignSelf: "end",
                fontSize: "14px",
                border: "none",
                backgroundColor: "#a9a9a9a !important",
                '&:hover': {
                    border: "none",
                    outline: "none"
                },
            }}>
                <Typography sx={{
                    color: "#fff",
                    fontSize: "14px"
                
                }}>Send</Typography>
            </Button>
        ) : (
           <div style={{
                display: "flex",
                alignSelf: "end",
                flexDirection: "row",
                gap: "10px"
              
           }}>
           <Button onClick={handleLogin} variant="text" sx={{
                display: "flex",
                alignSelf: "end",
                fontSize: "14px",
                border: "none",
                backgroundColor: "#a9a9a9a !important",
                '&:hover': {
                    border: "none",
                    outline: "none"
                },
            }}>
                <Typography sx={{
                    color: "#121212",
                    fontWeight: "bold",
                    fontSize: "16px"
                
                }}>Login</Typography>
            </Button> 
           
           <Button onClick={handleRegister} variant="contained" sx={{
                display: "flex",
                alignSelf: "end",
                fontSize: "14px",
                border: "none",
                backgroundColor: "#a9a9a9a !important",
                '&:hover': {
                    border: "none",
                    outline: "none"
                },
            }}>
                <Typography sx={{
                    color: "#121212",
                    fontWeight: "bold",
                    fontSize: "16px"
                
                }}>Register</Typography>
            </Button>  
           </div> 
        )}
    </Box>
  )
}

export default Auth