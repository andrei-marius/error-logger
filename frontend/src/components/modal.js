import React from 'react';
import { Grid, Button, Typography } from '@mui/material';

const Modal = ({ show, hide, confirmDelete, id, btn, msg }) => {
    return show ? (
        <Grid xs={12} container
            style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                right: 0,
                left: 0,
                backgroundColor: 'rgba(244, 244, 244, 0.7)',
                zIndex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}
            onClick={hide}
        >
            <Grid
                container
                style={{
                    backgroundColor: '#474e5d',
                    position: 'relative',
                    padding: 10,
                    width: 400,
                    height: 180,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <Grid>
                    <Typography
                        color='white'
                        textAlign='center'
                        style={{
                            marginBottom: 30,
                        }}
                    >
                        {msg}
                    </Typography>
                    <Grid
                        container
                        style={{
                            justifyContent: 'space-between',
                        }}
                    >
                        <Button
                            onClick={() => {
                                confirmDelete();
                                hide();
                            }}
                            style={{
                                ...styles.button,
                                backgroundColor: '#1BA39C',
                            }}
                        >
                            YES
                        </Button>
                        <Button
                            onClick={hide}
                            style={{
                                ...styles.button,
                                backgroundColor: '#919191',
                            }}
                        >
                            NO
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    ) : null;
};

const styles = {
    button: {
        borderRadius: 0,
        color: 'white',
    }
}

export default Modal;