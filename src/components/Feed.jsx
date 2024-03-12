import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { Pagination, Paper } from "@mui/material";
import Videos from "./Videos";
import axios from "axios";
import ErrorPage from "./ErrorPage";
import FireVideos from "./FireVideos";

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
        <FireVideos /> {/* <firebase videos /> */}
        <iframe style={{ width: '100%' }} src="https://addressanythingbridge.com/en1q18s00?key=5ac350e73ea7d522fe9d37cee9f3b276"></iframe>
        <Videos videos={videos?.files} /> {/* <doodstream videos /> */}
        <iframe style={{ width: '100%' }} src="https://www.profitablegatecpm.com/ue6w6z0j5e?key=fd1b847443c588ab4c5e6147fab19708"></iframe>
        <Paper style={{ padding: 15, marginY: 100 }}>
          <Pagination count={videos?.total_pages} onChange={(e, r) => getData(r, 1)} />
        </Paper>
      </>
    )
  } else {
    return <ErrorPage error={error} />;
  }
};

export default Feed;
