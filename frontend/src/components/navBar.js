import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Grid, Button } from '@mui/material';

const NavBar = () => {
    const navigate = useNavigate();

    const handleLogOut = () => {
        localStorage.removeItem('loggedIn');
        navigate('/login');
    }

    return (
        <Grid
            container
            xs={12}
            style={{
                height: 50,
                background: '#474e5d',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0 3%',
            }}
        >
            <Grid>
                <Link 
                    to='/'
                    style={{
                        ...styles.link,
                        marginRight: 30,
                    }}
                >
                    ERRORS
                </Link>
                <Link
                    to='/script'
                    style={styles.link}
                >
                    SCRIPT
                </Link>
            </Grid> 
            <Button
                onClick={handleLogOut}
                style={{
                    color: 'white',
                    borderRadius: 0,
                }}
            >
                LOG OUT
            </Button>
        </Grid>
    );
}

const styles = {
    link: {
        textDecoration: 'none',
        color: 'white',
    }
}

export default NavBar;