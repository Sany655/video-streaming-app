import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Box, Container } from "@mui/material";
import {
  Navbar,
  Feed,
  SearchFeed,
  ChannelDetails,
  VideoDetails,
} from "./components";

const App = () => {

  return (
    <Box sx={{ backgroundColor: "#000" }}>
      <Navbar />
      <Container maxWidth="xl">

        <Routes>
          <Route path="/" exact element={<Feed />} />
          <Route path="/video/:id" element={<VideoDetails />} />
          <Route path="/channel/:id" element={<ChannelDetails />} />
          <Route path="/search/:searchTerm" element={<SearchFeed />} />
        </Routes>
      </Container>
    </Box>
  );
};
export default App;
