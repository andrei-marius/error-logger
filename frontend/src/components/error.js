import React from 'react';
import convertToLocalTime from '../utils';
import DeleteIcon from '@mui/icons-material/Delete';
import { ButtonBase, Grid, Typography } from '@mui/material';

const Error = ({ msg, stack, timestamp, client, index, showDeleteModal }) => {
    return (
        <Grid
            style={{
                backgroundColor: '#d9d9d9',
                padding: 10,
                marginTop: index > 0 ? 10 : 0,
            }}
        >
            <Grid
                container
                style={{
                    alignItems: 'start',
                    justifyContent: 'space-between',
                    marginBottom: 10,
                }}
            >
                <Grid>
                    <Typography style={styles.text}>Client: {client}</Typography>
                    <Typography style={styles.text}>On {convertToLocalTime(timestamp).slice(0, 10)}, at {convertToLocalTime(timestamp).slice(11)}</Typography>
                </Grid>
                <ButtonBase
                    onClick={showDeleteModal}
                >
                    <DeleteIcon />
                </ButtonBase>
            </Grid>
            <Grid
                style={{
                    padding: '0 20px',
                }}
            >
                <Typography
                    style={{
                        ...styles.text,
                        marginBottom: 10,
                    }}
                >
                    {msg}
                </Typography>
                <Typography
                    style={{
                        ...styles.text,
                        whiteSpace: 'break-spaces',
                    }}
                >
                    {stack}
                </Typography>
            </Grid>
        </Grid>
    );
}

const styles = {
    text: {
        fontSize: 15,
    },
}

export default Error;