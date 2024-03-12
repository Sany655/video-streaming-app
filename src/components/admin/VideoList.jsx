import React, { useState, useEffect, useContext } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Button, Switch } from '@mui/material';
import { MyContext, db, storage } from '../../Contexts'; // Import Firestore
import { deleteDoc, doc, setDoc, updateDoc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import VideoListItem from './VideoListItem';

const VideoList = () => {
    const { firebaseVideos, loading, error } = useContext(MyContext)
    const videos = firebaseVideos;

    return (
        <div>
            {loading ? (
                <CircularProgress />
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <TableContainer component={Paper}>
                    <Table sx={{ width: '100%' }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Image</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Video</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Created Date</TableCell>
                                <TableCell>Modified Date</TableCell>
                                <TableCell>#</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {videos.map((video, index) => (
                                <VideoListItem video={video} key={index}/>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </div>
    );
};

export default VideoList;
