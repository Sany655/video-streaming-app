import React, { useContext, useEffect, useRef, useState } from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import VideocamOutlined from '@mui/icons-material/VideocamOutlined';
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage';
import { MyContext, db, storage } from '../../Contexts';
import { addDoc, collection, doc, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { Box, LinearProgress, Switch, TextField, Typography } from '@mui/material';
import axios from 'axios';

const UploadForm = () => {
    const form = useRef(null)
    const { firebaseVideos } = useContext(MyContext)
    const [formData, setFormData] = useState({
        imageFile: null,
        videoFile: null,
        show: false
    });
    
    const [uploadError, setUploadError] = useState(null)
    const [uploading, setUploading] = useState(
        {
            snapshot: null,
        })

    const handleImageUpload = (event) => {
        setFormData({ ...formData, imageFile: event.target.files[0] });
    };

    const handleVideoUpload = (event) => {
        if (event.target.files[0].name && firebaseVideos.find(q => q.name === event.target.files[0].name.split('.')[0]) === undefined) {
            axios.get(`/api/search/videos?key=${process.env.REACT_APP_API_KEY}&search_term=${event.target.files[0].name.split('.')[0]}`)
                .then((res) => {
                    if (res.data.result.length == 0) {
                        setFormData({ ...formData, videoFile: event.target.files[0] });
                    }
                    else alert("it already in doodstream..")
                }).catch(err => console.log(err.message));
        }
        else alert("it already in firebase..")
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!formData.imageFile || (formData.videoFile && !formData.videoFile.type.startsWith('video/'))) {
            setUploadError({ type: 'error', msg: 'Please provide a category and valid file(s).' });
            return;
        }

        setUploadError({ type: '', msg: '', }); // Clear previous error messages

        const { imageFile, videoFile } = formData;
        const refName = videoFile.name.split('.')[0];
        uploadBytes(ref(storage, `videos/general/${refName}/${imageFile.name}`), imageFile).then(res => {
            const res1 = uploadBytesResumable(ref(storage, `videos/general/${refName}/${videoFile.name}`), videoFile)
            res1.on('state_changed',
                (snapshot) => {
                    setUploading({ ...uploading, snapshot: snapshot })
                    console.log(snapshot.state);
                    if (snapshot.totalBytes === snapshot.bytesTransferred) {
                        setUploading({ ...uploading, snapshot: null })
                    }
                },
                (error) => {
                    setUploadError({ type: 'error', msg: error.message })
                },
                () => {
                    if (imageFile) {
                        getDownloadURL(ref(storage, res.ref)).then((imageURL) => {
                            if (videoFile) {
                                getDownloadURL(ref(storage, res1.snapshot.ref)).then((videoURL) => {
                                    if (imageURL || videoURL) {
                                        addDoc(collection(db, 'general'), {
                                            name: refName,
                                            imageURL,
                                            imgPath: `videos/general/${refName}/${imageFile.name}`,
                                            videoURL,
                                            vidPath: `videos/general/${refName}/${videoFile.name}`,
                                            show:formData.show,
                                            createdAt: serverTimestamp(),
                                            modifiedAt: serverTimestamp()
                                        }).then((res5) => {
                                            setUploadError({ type: 'success', msg: 'Document written with ID: ' + res5.id })
                                            setFormData({ category: '', imageFile: null, videoFile: null }); // Clear form data
                                        });
                                    }
                                }).catch(er => setUploadError({ type: 'error', msg: er.message })); // Get download URL
                            }
                        })
                    }
                }
            )
        }).catch(er => setUploadError({ type: 'error', msg: er.message }))
    };

    const LinearProgressWithLabel = () => {
        return (
            <Box display="flex" alignItems="center" width={'50%'}>
                <Box width="100%" mr={1}>
                    <LinearProgress variant="determinate" value={Math.round((uploading.snapshot.bytesTransferred / uploading.snapshot.totalBytes) * 100)} />
                </Box>
                <Box minWidth={35}>
                    <Typography variant="body2" color="textSecondary">{Math.round((uploading.snapshot.bytesTransferred / uploading.snapshot.totalBytes) * 100)}%</Typography>
                </Box>
                <Box minWidth={35}>
                    <Typography variant="body2" color="textSecondary">{(uploading.snapshot.bytesTransferred / 1000000).toFixed(2) + 'MB /' + (uploading.snapshot.totalBytes / 1000000000).toFixed(2) + 'GB'}</Typography>
                </Box>
            </Box>
        );
    }

    return (
        <form onSubmit={handleSubmit} style={{ padding: '15px', background: 'white', color: 'black' }} ref={form}>
            <h1>Remember to upload only 8 files</h1>
            {uploadError?.msg && <p style={uploadError?.type == 'error' ? { color: 'red' } : { color: 'blue' }}>{uploadError.msg}</p>}
            <div>
                <IconButton color="primary" aria-label="upload image" component="label">
                    <input hidden accept="image/*" type="file" onChange={handleImageUpload} />
                    <PhotoCamera />
                </IconButton>
                <span>{formData.imageFile ? formData.imageFile.name : 'No image selected'}</span>
            </div>
            <div>
                <IconButton color="primary" aria-label="upload video" component="label">
                    <input hidden accept="video/*" type="file" onChange={handleVideoUpload} />
                    <VideocamOutlined />
                </IconButton>
                <span>{formData.videoFile ? formData.videoFile.name : 'No video selected'}</span>
            </div>
            <Switch
                checked={formData.show}
                onChange={e => setFormData({...formData,show:e.target.checked})}
                inputProps={{ 'aria-label': 'controlled switch' }}
            />
            {(uploading.snapshot?.state === 'running' || uploading.snapshot?.state === 'paused') && <LinearProgressWithLabel />}
            <div style={{ display: 'flex', gap: 4 }}>
                {(uploading.snapshot?.state !== 'running' && uploading.snapshot?.state !== 'paused') && <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }} disabled={!formData.imageFile?.name || !formData.videoFile?.name}>
                    Submit
                </Button>}

                {(uploading.snapshot?.state === 'running' || uploading.snapshot?.state === 'paused') && (
                    <>
                        <Button type="button" variant="contained" color="warning" sx={{ mt: 2 }} onClick={() => uploading.snapshot.state === "paused" ? uploading.snapshot?.task.resume() : uploading.snapshot?.task.pause()}>
                            {uploading.snapshot.state === "paused" ? 'Play' : 'Pause'}
                        </Button>
                        <Button type="button" variant="contained" color="error" sx={{ mt: 2 }} onClick={() => {
                            uploading.snapshot?.task.cancel()
                            setFormData({ category: '', imageFile: null, videoFile: null });
                            setUploading({ ...uploading, snapshot: null })
                            form.current.reset()
                        }}>
                            Cancel
                        </Button>
                    </>
                )}
            </div>
        </form>
    );
};

export default UploadForm;