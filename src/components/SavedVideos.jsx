import React, { useContext } from "react";
import Videos from "./Videos";
import { MyContext } from "../Contexts";

function SavedVideos() {
    const { saved } = useContext(MyContext)

    return <Videos videos={saved} />
}

export default SavedVideos