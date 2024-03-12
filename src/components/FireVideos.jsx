import React, { useContext } from 'react'
import { MyContext } from '../Contexts'
import { CircularProgress } from '@mui/material'
import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const FireVideos = () => {
    const { firebaseVideos, loading, error } = useContext(MyContext)

    return (
        <div style={{ marginBottom: '50px' }}>
            {
                loading ? (
                    <CircularProgress />
                ) : error ? (
                    <p>Error: {error}</p>
                ) : (
                    firebaseVideos.filter(v => v.show == true).length > 0 && (
                        <div>
                            <iframe src="https://addressanythingbridge.com/dehs47x4b?key=8995f404b51cd15e00158a55b481bafa" frameborder="0"></iframe>
                            <h1>Excluisive</h1>
                            <Grid container spacing={2}>
                                {firebaseVideos.filter(v => v.show == true).map((video) => {
                                    return (
                                        <Grid item xs={12} sm={6} md={4} lg={3}>
                                            <Link to={'/fvideo/' + video.id}>
                                                <Card sx={{ backgroundColor: '#1e1e1e', color: '#fff' }}>
                                                    <CardMedia
                                                        component="img"
                                                        height="140"
                                                        image={video.imageURL}
                                                        alt={video.name}
                                                    />
                                                    <CardContent>
                                                        <Typography variant="h6">{video.name.substring(0, 25) + "..."}</Typography>
                                                        <Typography variant="body2" color="lightgray">
                                                            Uploaded: {video.createdAt?.toDate().toLocaleString()}
                                                        </Typography>
                                                    </CardContent>
                                                </Card>
                                            </Link>
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        </div>
                    )
                )
            }
        </div>
    )
}

export default FireVideos;