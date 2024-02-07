import React, { useEffect } from "react";
import { Stack, Box } from "@mui/material";
import { VideoCard, ChannelCard, Loader } from "./";

const Videos = ({ videos, direction }) => {
  
  if (!videos) return <Loader />;
  else if(videos.length == 0) return null;
  else return (
    <Stack
      direction={direction || "row"}
      flexWrap="wrap"
      justifyContent="space-evenly"
      alignItems="start"
      gap={2}
      ml="auto"
    >
      {videos.map((item, index) => (
        <Box key={index}>
          {item.file_code && <VideoCard video={item} />}
        </Box>
      ))}
    </Stack>
  );
};

export default Videos;
