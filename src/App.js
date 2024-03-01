import React, { createContext, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Box, Container, Divider } from "@mui/material";
import axios from "axios";
import Feed from "./components/Feed";
import VideoDetails from "./components/VideoDetails";
import SearchFeed from "./components/SearchFeed";
import Navbar from "./components/Navbar";
import SavedVideos from "./components/SavedVideos";
import Contexts from "./Contexts";

const App = () => {
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
  return (
    <Contexts>
      <Box>
        <Navbar />
        {/* {process.env.NODE_ENV === 'production' && (<script type="text/javascript" src="//www.topcreativeformat.com/11f5206119ac1884d11f82c6562de90f/invoke.js"></script>)} */}
        <Container maxWidth="xl" sx={{ paddingY: '20px' }} >
          <iframe style={{ width: '100%' }} src="https://www.profitablegatecpm.com/fhpp1jwne?key=e18fb2bde6ba4f34f3faafb3ad1b141b"></iframe>
          <Routes>
            <Route path="/" exact element={<Feed />} />
            <Route path="/video/:id" element={<VideoDetails />} />
            <Route path="/search/:searchTerm" element={<SearchFeed />} />
            <Route path="/saved" element={<SavedVideos />} />
          </Routes>
          <iframe style={{ width: '100%' }} src="https://www.profitablegatecpm.com/rbj3gfpesb?key=73c7d7295ee73d2c93b113e7f3afc094"></iframe>
        </Container>
      </Box>
    </Contexts >
  );
};
export default App;
