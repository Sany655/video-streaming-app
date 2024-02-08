import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { Box, Pagination, Paper, Stack, Typography } from "@mui/material";

import SideBar from "./SideBar";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import Videos from "./Videos";

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("New");
  const [videos, setVideos] = useState([]);
  const [counts, setCounts] = useState(1)
  const vidRef = useRef()
  useEffect(() => {
    setVideos([]);
    getData(1);
  }, []);
  // }, [selectedCategory]);

  const getData = (res) => {
    fetchFromAPI(`api/file/list?key=355458djyp1cm54by8ekvj&per_page=12&page=${res}`).then((data) => {
      setVideos(data.result);
      console.log(res);
    }
    ).catch(err => console.log(err.message)).finally(() => {
      vidRef.current.scrollIntoView({behavior:"smooth"})
    });
  }

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

        <div ref={vidRef}>

          <Videos videos={videos.files} />
        </div>
        <Paper style={{ background: "#c9c9c9", padding: 15, marginTop: 50 }}>
          <Pagination count={videos.total_pages} onChange={(e, r) => getData(r)} />
        </Paper>
      </Box>
    </Stack>
  );
};

export default Feed;
