import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Button, Typography, OutlinedInput } from '@mui/material';

const Login = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (localStorage.getItem('loggedIn')) {
            navigate('/');
        }
    })

    const handleChange = (e) => {
        setPassword(e.target.value);
        setErrorMessage('');
    };

    const handleLogin = () => {
        if (password === process.env.REACT_APP_LOGIN_PASSWORD) {
            localStorage.setItem('loggedIn', true);
            navigate('/');
        } else {
            setErrorMessage('Wrong password');
        }
    }

    return (
        <Grid
            container
            style={{
                width: '100%',
                maxWidth: 380,
                height: 230,
                transform: 'translate(-50%, -50%)',
                position: 'absolute',
                top: '50%',
                left: '50%',
                backgroundColor: '#474e5d',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Grid
                container
                xs={10}
                style={{
                    flexDirection: 'column',
                    height: '60%',
                    justifyContent: 'space-between',
                }}
            >
                <OutlinedInput
                    placeholder='PASSWORD'
                    type='password'
                    onChange={(e) => {
                        handleChange(e);
                    }}
                    sx={{
                        input: {
                            borderRadius: 0,
                        }
                    }}
                    variant='filled'
                />
                <Typography
                    textAlign='center'
                    style={{
                        color: '#f85a30',
                    }}
                >
                    {errorMessage}
                </Typography>
                <Button
                    onClick={handleLogin}
                    style={{
                        backgroundColor: '#1ba39c',
                        color: 'white',
                        borderRadius: 0,
                    }}
                >
                    LOGIN
                </Button>
            </Grid>
        </Grid>  
    );
}

export default Login;