import { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import Videos from "./Videos";

const SearchFeed = () => {
  const [videos, setVideos] = useState([]);
  const { searchTerm } = useParams();

  useEffect(() => {
    setVideos([]);
    axios.get(`/api/search/videos?key=${process.env.REACT_APP_API_KEY}&search_term=${searchTerm}`)
    .then((res) => {
      setVideos(res.data.result)
    }).catch(err => console.log(err.message));

  }, []);

  return (
    <Box p={2} minHeight="95vh">
      <Typography
        variant="h4"
        fontWeight={900}
        color="white"
        mb={3}
        ml={{ sm: "50px" }}
      >
        Search Results for{" "}
        <span style={{ color: "#FC1503" }}>{searchTerm}</span> videos
      </Typography>
      <Box display="flex">
        <Box sx={{ mr: { sm: "50px" } }} />
        {<Videos videos={videos} />}
        <Box sx={{ ml: { sm: "50px" } }} />
      </Box>
    </Box>
  );
};

export default SearchFeed;
