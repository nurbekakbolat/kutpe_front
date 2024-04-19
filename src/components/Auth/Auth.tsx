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
        const token = await client.post('auth/login/', {
            phone_number: number,
            password: otp
        });

        localStorage.setItem('token', token.data.key);

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
        })

        setEnterOtp(true);
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
                    borderBottom: "2px solid #fff",
                    borderRadius: "0px",
                    height: "50px",
                    width: "100%",
                    backgroundColor: "transparent",
                    padding: "10px",
                    color: "#fff",
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
                borderRadius: "10px",
                height: "50px",
                width: "100%",
                backgroundColor: "transparent",
                padding: "10px",
                borderBottom: "1px solid #fff",
                color: "#fff",
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
            <Button onClick={handleRegister} variant="outlined" sx={{
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
                    fontWeight: "bold",
                    fontSize: "16px"
                
                }}>Register</Typography>
            </Button>  
        )}
    </Box>
  )
}

export default Auth