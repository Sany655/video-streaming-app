import { Button, Switch, TableCell, TableRow } from '@mui/material';
import { deleteObject, ref } from 'firebase/storage';
import React, { useState } from 'react'
import { db, storage } from '../../Contexts';
import { deleteDoc, doc, setDoc, updateDoc } from 'firebase/firestore';

function VideoListItem({ video }) {
    const [isChecked, setIsChecked] = useState(video.show || false);
    async function deleteRec(video) {
        try {
            await deleteObject(ref(storage, video.imgPath))
            await deleteObject(ref(storage, video.vidPath))
            await deleteDoc(doc(db, 'general', video.id))
        } catch (error) {
            console.log(error.message);
        }
    }
    async function statusChanging(event) {
        setIsChecked(event.target?.checked);
        // updateDoc(db,ref(id),{show:event.target.checked})
        await updateDoc(doc(db,'general',video.id), {
            show: event.target.checked
        });
    }
    return (
        <TableRow>
            <TableCell>{video.id}</TableCell>
            <TableCell>
                {video.imageURL && <img src={video.imageURL} alt="Video Thumbnail" width="50" height="30" />}
            </TableCell>
            <TableCell>{video.name}</TableCell>
            <TableCell>
                {video.videoURL && (
                    <a href={video.videoURL} target="_blank" rel="noreferrer">
                        Video Link
                    </a>
                )}
            </TableCell>
            <TableCell>
                <Switch
                    checked={video.show}
                    onChange={(e) => statusChanging(e)}
                    inputProps={{ 'aria-label': 'controlled switch' }}
                />
            </TableCell>
            <TableCell>{video.createdAt?.toDate().toLocaleString()}</TableCell>
            <TableCell>{video.modifiedAt?.toDate().toLocaleString()}</TableCell>
            <TableCell><Button onClick={() => deleteRec(video)} color='error'>DELETE</Button></TableCell>
        </TableRow>
    )
}

export default VideoListItem