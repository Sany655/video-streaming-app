import { Typography } from '@mui/material'
import React from 'react'

function ErrorPage({ error }) {
    return (
        <Typography style={{ height: '95vh', }} variant="h1" color={'primary'}>{error}</Typography>
    )
}

export default ErrorPage