import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Typography, Card, CardContent, CardMedia, IconButton } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Bookmark, SaveAlt } from "@mui/icons-material";
import { MyContext } from "../Contexts";

const VideoCard = ({ video }) => {
  const { saveVid } = useContext(MyContext)
  
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
      <CardContent sx={{ backgroundColor: "#1E1E1E", height: "106px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
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
          <div>
            <SaveAlt color="primary" style={{ cursor: 'pointer', marginLeft: '5px' }} onClick={() => window.location.href = process.env.REACT_APP_DOWNLOAD_BASE_URL + video.file_code} />
            <Bookmark color="primary" style={{ cursor: 'pointer', marginLeft: '5px' }} onClick={() => saveVid(video)} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoCard;
