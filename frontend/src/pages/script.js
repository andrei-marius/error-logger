import React from 'react';
import NavBar from '../components/navBar';
import { useState } from 'react';
import { CopyBlock, dracula } from 'react-code-blocks';
import { Select, MenuItem, Grid, Typography, Container, Tooltip } from '@mui/material';

const Script = () => {
    const [selectedMethod, setSelectedMethod] = useState('slack');
    const [showTooltip, setShowTooltip] = useState(false);

    const code = `window.addEventListener('error', (event) => {
    fetch('http://localhost:3001/api/add-error', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            method: '${selectedMethod}',
            errorInfo: {
                message: event.error.message,
                stack: event.error.stack,
                timestamp: new Date().toISOString(),
                client: window.location.hostname.split('.')[1],
            }
        })
    })
})`;

    const handleCopyText = () => {
        navigator.clipboard.writeText(code);
        setShowTooltip(true);
        setTimeout(() => {
            setShowTooltip(false);
        }, 2000)
    }

    const handleChange = (e) => {
        setSelectedMethod(e.target.value);
    }

    return (
        <>
            <NavBar />
            <Container
                disableGutters
                maxWidth={false}
                sx={{
                    maxWidth: 620,
                }}
                style={{
                    paddingTop: 10,
                }}
            >
                <Grid 
                    container
                    style={{
                        alignItems: 'center',
                    }}
                >
                    <Typography
                        style={{
                            fontSize: 15,
                        }}
                    >
                        Choose how to get notified
                    </Typography>
                    <Select
                        value={selectedMethod}
                        onChange={handleChange}
                        style={{
                            height: 30,
                            marginLeft: 10,
                        }}
                        autoWidth
                    >
                        <MenuItem value='slack'>Slack</MenuItem>
                        <MenuItem value='email'>Email</MenuItem>
                        <MenuItem value='slack_email'>Slack and email</MenuItem>
                    </Select>
                </Grid>
                <Tooltip
                    arrow
                    open={showTooltip}
                    title='CODE COPIED'
                >
                    <Grid
                        onClick={handleCopyText}
                        style={{
                            backgroundColor: '#282a36',
                            position: 'relative',
                            cursor: 'pointer',
                            color: 'white',
                            padding: '15px 0 0',
                            marginTop: 10,
                        }}
                    >
                        <Typography textAlign='center'>CLICK TO COPY</Typography>
                        <CopyBlock
                            text={code}
                            language='javascript'
                            theme={dracula}
                        /> 
                    </Grid>
                </Tooltip>
            </Container>
        </>
    );
}

export default Script;

// window.onerror = (msg, url, line, col, error) => {
    //     // Note that col & error are new to the HTML 5 spec and may not be
    //     // supported in every browser.  It worked for me in Chrome.
    //     var extra = !col ? '' : '\ncolumn: ' + col;
    //     extra += !error ? '' : '\nerror: ' + error;

    //     // You can view the information in an alert to see things working like this:
    //     // console.log("Error: " + msg + "\nurl: " + url + "\nline: " + line + extra);

    //     fetch('http://localhost:3001/api/error', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({errorInfo: msg})
    //     })

    //     // TODO: Report this error via ajax so you can keep track
    //     //       of what pages have JS issues

    //     var suppressErrorAlert = false;
    //     // If you return true, then error alerts (like in older versions of
    //     // Internet Explorer) will be suppressed.
    //     return suppressErrorAlert;
    // };

    // window.onunhandledrejection = (e) => {
    //     console.log(e.reason.stack);
    //     throw new Error(e.reason.stack);
    // }