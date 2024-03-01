import React, { createContext, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Box, Container } from "@mui/material";
import axios from "axios";
import Feed from "./components/Feed";
import VideoDetails from "./components/VideoDetails";
import SearchFeed from "./components/SearchFeed";
import Navbar from "./components/Navbar";
import SavedVideos from "./components/SavedVideos";
import Contexts from "./Contexts";

const App = () => {
  useEffect(() => {
    if (process.env.NODE_ENV) {
      console.log('string','Development mode');
      console.log('variable',process.env.NODE_ENV);
    }else{
      console.log('string','peoduction mode');
      console.log('variable',process.env.NODE_ENV);
    }
  }, [])
  
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
  return (
    <Contexts>
      <Box>
        <Navbar />
        {process.env.NODE_ENV === 'production' && (<script type="text/javascript" src="//www.topcreativeformat.com/11f5206119ac1884d11f82c6562de90f/invoke.js"></script>)}
        <Container maxWidth="xl" sx={{ paddingY: '20px' }} >
          <Routes>
            <Route path="/" exact element={<Feed />} />
            <Route path="/video/:id" element={<VideoDetails />} />
            <Route path="/search/:searchTerm" element={<SearchFeed />} />
            <Route path="/saved" element={<SavedVideos />} />
          </Routes>
        </Container>
      </Box>
    </Contexts>
  );
};
export default App;
