import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { Box, Pagination, Paper, Stack } from "@mui/material";
import Videos from "./Videos";
import axios from "axios";
import ErrorPage from "./ErrorPage";

const Feed = () => {
  const [videos, setVideos] = useState([]);
  const [error, seterror] = useState(null)
  const vidRef = useRef();
  useEffect(() => {
    setVideos([]);
    getData(1);
  }, []);

  const getData = (res) => {
    axios.get(`/api/file/list?key=${process.env.REACT_APP_API_KEY}&per_page=12&page=${res}`)
      .then(({ data }) => {
        setVideos(data.result);
        vidRef.current.scrollIntoView({ behavior: "smooth" })
      }
      ).catch(err => {
        seterror(err.message)
        setVideos([])
      })
  }


  if (!error) {
    return (
      <>
        <div ref={vidRef}>
          <Videos videos={videos.files} vidref={vidRef} />
        </div>
        <Paper style={{ background: "#c9c9c9", padding: 15, marginTop: 50 }}>
          <Pagination count={videos.total_pages} onChange={(e, r) => getData(r)} />
        </Paper>
      </>
    )
  } else {
    return <ErrorPage error={error} />;
  }
};

export default Feed;
