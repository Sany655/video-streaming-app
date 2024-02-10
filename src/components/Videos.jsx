import React, { useEffect } from "react";
import { Stack, Box } from "@mui/material";
import VideoCard from "./VideoCard";
import Loader from "./Loader";

const Videos = ({ videos, direction }) => {
  
  if (!videos) return <Loader />;
  else if(videos.length > 0) return (
    <Stack
      direction={direction || "row"}
      flexWrap="wrap"
      gap={2}
      justifyContent={'center'}
    >
      {videos.map((item, index) => (
        <VideoCard video={item} key={index}/>
      ))}
    </Stack>
  );
  else return (
    <h1>No video available!</h1>
  );
};

export default Videos;
