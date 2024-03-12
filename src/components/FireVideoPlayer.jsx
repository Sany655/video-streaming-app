import { Box, Button, Stack, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from '../Contexts';
import FireVideos from './FireVideos';
import ReactPlayer from 'react-player';
import { useHref, useNavigate, useParams } from 'react-router-dom';
import { CheckCircle } from '@mui/icons-material';

function FireVideoPlayer() {
    const { firebaseVideos } = useContext(MyContext)
    const [video, setVideo] = useState({
    });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (firebaseVideos.find(v => v.id === id)) {
            setVideo(firebaseVideos.find(v => v.id === id))
        } else {
            navigate(-1);
        }
    }, [id]);
    return (
        <Box minHeight="95vh">
            <Stack >
                <Box flex={1}>
                    <Box sx={{ width: "100%", position: "sticky", top: "86px" }}>
                        <ReactPlayer
                            url={video?.videoURL}
                            className="react-player"
                            controls
                        />
                        <Typography variant={"h5"} color="#fff" fontWeight="bold" p={2}> {video.name} </Typography>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            sx={{ color: "#fff" }}
                            py={1}
                            px={2}
                        >
                            <Typography
                                variant="subtitle1"
                                color="#fff"
                            >
                                {video.createdAt?.toDate().toLocaleString()}
                                <CheckCircle
                                    sx={{ fontSize: "12px", color: "gray", ml: "5px" }}
                                />
                            </Typography>
                            <Stack direction="row" gap="20px" alignItems="center">
                                <a href={video.videoURL} target="_blank" >
                                    <Button variant="outlined" color="primary">Download</Button>
                                </a>
                                {/* <Typography variant="body1" sx={{ opacity: 0.7 }}>
                                    {last_view ? last_view + " Last views" : null}
                                </Typography>
                                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                                    {views} views
                                </Typography> */}
                            </Stack>
                        </Stack>
                    </Box>
                </Box>
                <iframe src="https://addressanythingbridge.com/hscsr9rd5?key=6cc4c9f6956d375d17283c16cbc74b68" frameborder="0"></iframe>
                <Box
                    px={2}
                    py={{ md: 1, xs: 5 }}
                    justifyContent="center"
                    alignItems="center"
                >
                    <FireVideos />
                </Box>
                <iframe src="https://addressanythingbridge.com/a1fe5tmx0?key=91164de064106bf569478518cc17daff" frameborder="0"></iframe>
            </Stack>
        </Box>
    )
}

export default FireVideoPlayer