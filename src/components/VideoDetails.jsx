import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Videos, Loader } from "./";
import { BASE_URL, VIDEO_BASE_URL, fetchFromAPI } from "../utils/fetchFromAPI";
import axios from "axios";

const VideoDetails = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchFromAPI(
      `api/file/info?key=355458djyp1cm54by8ekvj&&file_code=${id}`
    ).then((res1) => {
      setVideoDetail(res1.result[0]);
      axios.get(`${BASE_URL}/api/search/videos?key=355458djyp1cm54by8ekvj&search_term=${res1.result[0].title.split(" ")[0]}`).then(res2 => {
        console.log(res1.result[0].title.split(" ")[0], res2.data.result);
        setVideos(res2.data.result)
      }).catch(err => console.log(err.message))
    }).catch(err => console.log(err.message))
  }, [id]);

  if (!videoDetail) return <Loader />;

  const {
    protected_embed, title, filecode, uploaded, views, last_view
  } = videoDetail;

  return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box flex={1}>
          <Box sx={{ width: "100%", position: "sticky", top: "86px" }}>
            <iframe className="react-player" style={{ margin: "auto" }} width="640px" height="460px" src={"https://d0000d.com" + protected_embed} scrolling="no" frameborder="0" allowFullScreen={true}></iframe>
            <Typography color="#fff" variant="h5" fontWeight="bold" p={2}>
              {title}
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ color: "#fff" }}
              py={1}
              px={2}
            >
              <Typography
                variant={{ sm: "subtitle1", md: "h6" }}
                color="#fff"
              >
                {uploaded}
                <CheckCircleIcon
                  sx={{ fontSize: "12px", color: "gray", ml: "5px" }}
                />
              </Typography>
              <Stack direction="row" gap="20px" alignItems="center">
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {last_view ? last_view + " Last views" : null}
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {views} views
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
          <Box
            px={2}
            py={{ md: 1, xs: 5 }}
            justifyContent="center"
            alignItems="center"
          >
            <Videos videos={videos} direction="column" />
          </Box>
      </Stack>
    </Box>
  )
};

export default VideoDetails;
