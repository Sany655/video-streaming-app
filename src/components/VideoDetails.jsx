import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Box, Stack, Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import axios from "axios";
import Videos from "./Videos";
import Loader from "./Loader";
import { SaveAlt } from "@mui/icons-material";

const VideoDetails = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`/api/file/info?key=${process.env.REACT_APP_API_KEY}&&file_code=${id}`)
      .then((res1) => {
        setVideoDetail(res1.data.result[0]);
        axios.get(`api/search/videos?key=${process.env.REACT_APP_API_KEY}&search_term=${res1.data.result[0].title.split(" ")[0]}`)
          .then(res2 => {
            setVideos(res2.data.result)
          })
          .catch(err => console.log(err.message))
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
            <iframe className="react-player" style={{ margin: "auto" }} width="640px" height="460px" src={"https://d0000d.com" + protected_embed} scrolling="no" frameBorder="0" allowFullScreen={true}></iframe>
            <Typography variant={"h5"} color="#fff" fontWeight="bold" p={2}> {title} </Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ color: "#fff" }}
              py={1}
              px={2}
            >
              <Typography
                variant="subtitle1"
                color="#fff"
              >
                {uploaded}
                <CheckCircleIcon
                  sx={{ fontSize: "12px", color: "gray", ml: "5px" }}
                />
              </Typography>
              <Stack direction="row" gap="20px" alignItems="center">
                <a href={process.env.REACT_APP_DOWNLOAD_BASE_URL+filecode} target="_blank" >
                  <Button variant="outlined" color="primary">Download</Button>
                </a>
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
