import React from 'react'
import UploadForm from './UploadForm'
import VideoList from './VideoList'
import { Divider } from '@mui/material'
import { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';

const AuthComponent = ({ setAuth }) => {
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password == 'ziczac') {
      setAuth(true)
    }
  };

  return (
    <Container component="main" maxWidth="xs" style={{ height: '60vh' }}>
      <Box
        sx={{
          marginTop: 15,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <LockOutlined sx={{ color: 'primary.main', fontSize: 100 }} />
        <Typography component="h1" variant="h5">
          Authentication
        </Typography>
        <form onSubmit={handleSubmit} noValidate>
          <TextField
            // color='primary'

            variant='standard'
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputLabelProps={{
              style: { color: 'white' }, // Change placeholder color
            }}
            sx={{
              '& .MuiInputBase-input': {
                color: 'white', // Set text color
              },
            }}
          />
          <Button type="submit" fullWidth variant="contained" color="primary">
            Sign In
          </Button>
        </form>
      </Box>
    </Container>
  );
};

function Dashboard() {
  const [auth, setAuth] = useState(false)
  if (auth) {
    return (
      <>
        <h1 style={{color:'white'}}>Dashboard</h1>
        <UploadForm />
        <Divider />
        <VideoList />
      </>
    )
  } else return <AuthComponent setAuth={setAuth} />

}

export default Dashboard