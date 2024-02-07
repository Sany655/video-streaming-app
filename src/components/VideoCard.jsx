import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Typography, Card, CardContent, CardMedia, Box, IconButton } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  demoThumbnailUrl,
  demoVideoUrl,
  demoVideoTitle,
  demoChannelUrl,
  demoChannelTitle,
} from "../utils/constants";
import { Bookmark, SaveAlt } from "@mui/icons-material";

// Destructuring the api response
const VideoCard = ({ video }) => {
  useEffect(() => {
    console.log(video);
  }, [])

  return (
    <Box>
      <Card
        sx={{
          width: { xs: "100%", sm: "358px", md: "320px" },
          boxShadow: "none",
          borderRadius: 0,
          maxWidth: "358px",
        }}
      >
        <Link to={video.file_code ? `/video/${video.file_code}` : demoVideoUrl}>
          <CardMedia
            component="img"
            image={video.single_img || video.splash_img}
            alt={video.title}
            sx={{
              width: { xs: "100%", sm: "358px", md: "320px" },
              height: 180,
              maxWidth: "358px",
            }}
            object-fit="cover"
          />
          {/*Optional Chaining - Returns Undifined instead of error  */}
        </Link>
        <CardContent sx={{ backgroundColor: "#1E1E1E", height: "106px" }}>
          <Link to={video.file_code ? `/video/${video.file_code}` : demoVideoUrl}>
            <Typography variant="subtitle1" fontWeight="bold" color="#FFF">
              {video.title}
            </Typography>
          </Link>
          <Typography variant="subtitle2" color="gray">
            {video.uploaded || demoChannelTitle}
            <CheckCircleIcon
              sx={{ fontSize: "12px", color: "gray", ml: "5px" }}
            />
          </Typography>
          <a href={video.download_url} target="_blank">
            <IconButton aria-label="save" color="primary">
              <SaveAlt />
            </IconButton>
          </a>
          {/* <IconButton aria-label="like" color="primary">
            <Bookmark />
          </IconButton> */}
        </CardContent>
      </Card>
    </Box>
  );
};

export default VideoCard;
