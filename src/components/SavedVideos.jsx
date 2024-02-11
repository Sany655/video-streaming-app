import React, { useContext, useRef } from "react";
import { useState, useEffect } from "react";
import { Box, Pagination, Paper, Stack } from "@mui/material";
import Videos from "./Videos";
import axios from "axios";
import ErrorPage from "./ErrorPage";
import { MyContext } from "../Contexts";

function SavedVideos() {
    const { saved } = useContext(MyContext)

    return (
        <div style={{height:'100vh',background:"black"}}>
            <Videos videos={saved} />
        </div>
    )
}

export default SavedVideos