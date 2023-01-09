import React, { useState, useEffect } from 'react';
import NavBar from '../components/navBar';
import Error from '../components/error';
import CircularProgress from '@mui/material/CircularProgress';
import { Grid, Button, Container, Typography } from '@mui/material';
import Modal from '../components/modal';

const Errors = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [deletedId, setDeletedId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [id, setId] = useState(null);
    const [deleteMsg, setDeleteMsg] = useState('');
    const [deleteBtn, setDeleteBtn] = useState('');

    useEffect(() => {
        (async () => {
            setLoading(true);
            const response = await fetch('http://localhost:3001/api/get-errors', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json();
            setData(data);
            setLoading(false);
        })();
    }, [deletedId])

    const showDeleteModal = (e, id) => {
        setId(id);

        if (e.target.innerText === undefined) {
            setDeleteMsg('Are you sure you want to delete it?');
            setDeleteBtn('delete');
        } else {
            setDeleteMsg('Are you sure you want to delete all?');
            setDeleteBtn('deleteall');
        }

        setShowModal(true);
    }

    const hideDeleteModal = () => {
        setShowModal(false);
    };

    const confirmDelete = async () => {
        if (deleteBtn === 'delete') {
            await fetch(`http://localhost:3001/api/delete-error/${id}`, {
                method: 'DELETE',
            })
            setDeletedId(id);
        } else {
            await fetch(`http://localhost:3001/api/delete-errors`, {
                method: 'DELETE'
            });
            setDeletedId(0);
        }
    }

    return (
        <>
            <NavBar />
            <Container 
                disableGutters 
                maxWidth={false}
                sx={{ 
                    maxWidth: 800,
                }}
                style={{
                    paddingTop: 10,
                }}
            >
                <Modal 
                    show={showModal}
                    confirmDelete={confirmDelete}
                    hide={hideDeleteModal}
                    id={id}
                    msg={deleteMsg}
                />
                {Array.isArray(data) && data.length > 1
                    ? <Grid
                        container
                        style={{
                            justifyContent: 'center',
                            marginBottom: 10,
                        }}
                      >
                        <Button
                            onClick={showDeleteModal}
                            style={{
                                backgroundColor: '#1ba39c',
                                color: 'white',
                                borderRadius: 0,
                            }}
                        >
                            DELETE ALL
                        </Button>
                    </Grid>
                    : null}
                {loading ? 
                    <CircularProgress
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)'
                        }}
                    /> :
                    (Array.isArray(data) && data.length > 0 ?
                        data.map((error, index) => {
                            return <Error 
                                key={error.id}
                                id={error.id}
                                msg={error.message}
                                stack={error.stack}
                                timestamp={error.timestamp}
                                client={error.client}
                                index={index}
                                showDeleteModal={(e) => showDeleteModal(e, error.id)}
                            />
                        }) :
                        <Typography textAlign='center'>{data}</Typography>)
                }
            </Container>
        </>
    );
}

export default Errors;