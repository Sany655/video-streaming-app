import { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { Videos } from "./";

const SearchFeed = () => {
  const [videos, setVideos] = useState([]);
  const { searchTerm } = useParams();
  console.log("Inside Search Feed...");
  console.log(videos, searchTerm);

  useEffect(() => {
    setVideos([]);
    fetchFromAPI(`/api/search/videos?key=355458djyp1cm54by8ekvj&search_term=${searchTerm}`)
    .then((res) => {
      setVideos(res.result)
    }).catch(err => console.log(err.message));

  }, [searchTerm]);

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
