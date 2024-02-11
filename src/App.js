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
import Experiment from "./components/Experiment";
import AppAdmin from "./components/Admin/AppAdmin";

const App = () => {

  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
  return (
    <Contexts>
      <Box sx={{ backgroundColor: "#000",height:'100vh',overflow:'auto' }}>
        <Navbar />
        <Box sx={{ paddingY: '20px' }}>
          <Routes>
            <Route path="/" exact element={<Feed />} />
            <Route path="/video/:id" element={<VideoDetails />} />
            <Route path="/search/:searchTerm" element={<SearchFeed />} />
            <Route path="/saved" element={<SavedVideos />} />
            <Route path="/experiment" element={<Experiment />} />
            <Route path="/admin" element={<AppAdmin />} />
          </Routes>
        </Box>
      </Box>
    </Contexts>
  );
};
export default App;
