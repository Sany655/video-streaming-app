import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Typography, Card, CardContent, CardMedia, IconButton } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { SaveAlt } from "@mui/icons-material";


const VideoCard = ({ video }) => {
  return (
    <Card
      sx={{
        width: { xs: "100%", sm: "358px", md: "320px" },
        boxShadow: "none",
        borderRadius: 0,
        maxWidth: "358px",
      }}
    >
      <Link to={video.file_code ? `/video/${video.file_code}` : null} sx={{
        width: { xs: "100%", sm: "358px", md: "320px" },
        height: 180,
        maxWidth: "358px",
      }}>
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
      <CardContent sx={{ backgroundColor: "#1E1E1E", height: "106px", display: "flex", flexDirection: "column", justifyContent: "end" }}>
        <Link to={video.file_code ? `/video/${video.file_code}` : null}>
          <Typography variant="subtitle1" fontWeight="bold" color="#FFF">
            {video.title}
          </Typography>
        </Link>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: 'center' }}>

          <Typography variant="subtitle2" color="gray">
            {video.uploaded}
            <CheckCircleIcon
              sx={{ fontSize: "12px", color: "gray", ml: "5px" }}
            />
          </Typography>
          <a href={process.env.REACT_APP_DOWNLOAD_BASE_URL+video.file_code} target="_blank" >
            <SaveAlt color="primary" />
          </a>
        </div>
        {/* <IconButton aria-label="like" color="primary">
            <Bookmark />
          </IconButton> */}
      </CardContent>
    </Card>
  );
};

export default VideoCard;
