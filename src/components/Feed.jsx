import React from "react";
import { useState, useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";

import SideBar from "./SideBar";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import Videos from "./Videos";

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("New");
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    setVideos([]);
    fetchFromAPI(`api/file/list?key=355458djyp1cm54by8ekvj`).then((data) => {
      setVideos(data.result.files);
    }
    ).catch(err => console.log(err.message));
  }, [selectedCategory]);
  return (
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
      {/* Box for Sidebar */}
      {/* <Box
        sx={{
          height: { sx: "auto", md: "92vh" },
          borderRight: "1px solid #3d3d3d",
          px: { sx: 0, md: 2 },
        }}
      >
        <SideBar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <Typography
          className="copyright"
          variant="body2"
          sx={{ mt: 1.5, color: "#fff" }}
        >
          Copyright 2023 Saibalji Kokate
        </Typography>
      </Box> */}
      {/* Box for Videos */}
      <Box
        p={2}
        sx={{ overflowY: "auto", flex: "auto", height: "90vh" }}
        margin="auto"
      >
        <Typography
          varient="h4"
          fontWeight="bold"
          mb={2}
          sx={{ color: "white" }}
        >
          {/* <span>
            {selectedCategory}{" "}
            <span
              style={{
                color: "#F31503",
              }}
            >
              Videos
            </span>
          </span> */}
        </Typography>

        <Videos videos={videos} />
      </Box>
    </Stack>
  );
};

export default Feed;
