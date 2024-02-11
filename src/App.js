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

  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
  return (
    <Contexts>
      <Box sx={{ backgroundColor: "#000" }}>
        <Navbar />
        <Container maxWidth="xl" sx={{ paddingY: '20px' }}>
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
