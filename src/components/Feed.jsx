import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { Box, Pagination, Paper, Stack } from "@mui/material";
import Videos from "./Videos";
import axios from "axios";
import ErrorPage from "./ErrorPage";

const Feed = () => {
  const [videos, setVideos] = useState(null);
  const [error, seterror] = useState(null)
  const vidRef = useRef();
  useEffect(() => {
    getData(1);
  }, []);

  const getData = (res, option = null) => {
    axios.get(`/api/file/list?key=${process.env.REACT_APP_API_KEY}&per_page=12&page=${res}`)
      .then(({ data }) => {
        setVideos(data.result);
        if (option != null) {
          document.body.scrollTop = 0; // For Safari
          document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

        }
      }
      ).catch(err => {
        seterror(err.message)
        setVideos(null)
      })
  }


  if (!error) {
    return (
      <>
        <Videos videos={videos?.files} />
        <Paper style={{  padding: 15, marginTop: 50 }}>
          <Pagination count={videos?.total_pages} onChange={(e, r) => getData(r, 1)} />
        </Paper>
      </>
    )
  } else {
    return <ErrorPage error={error} />;
  }
};

export default Feed;
