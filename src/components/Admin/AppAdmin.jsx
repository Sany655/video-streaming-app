import React, { useState } from 'react'
import { Box } from '@mui/material'
import axios from 'axios';

function AppAdmin() {
    const [file, setFile] = useState()
    const handleSubmit = e => {
        e.preventDefault();
        const fd = new FormData()
        fd.append("file", file.files[0])
        fetch(`https://xxx.dood.video/upload/01?${process.env.REACT_APP_API_KEY}`, { method: "POST", body: fd })
            .then(d => d.json())
            .then(r => {
                console.log(r);
            })
            .catch(e => console.log(e.message))
    }
    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: { sm: 'column', md: 'row' }, color: 'white' }}>
                <form encType="multipart/form-data" onSubmit={handleSubmit}>
                    <input type="hidden" name="api_key" value="{your_api_key}" />
                    <input type="file" onChange={e => setFile(e.target)} />
                    <input type="submit" />
                </form>
            </Box>
        </>
    )
}

export default AppAdmin