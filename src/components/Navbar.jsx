import React from "react";
import { Button, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { logo } from "../utils/constants";
import SearchBar from "./SearchBar";

const Navbar = () => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      p={2}
      sx={{
        position: "sticky",
        top: 0,
        justifyContent: "space-between",
        background: "#fff",
      }}
    >
      <Link to="/" style={{}}>
        <img src={logo} alt="logo" height={45} />
      </Link>
      <Stack flex={1} direction={'row'} justifyContent={'end'} alignItems={'center'} gap={4}>
        {/* <Link ><Typography variant="body">BOOKMARKED VIDEOS</Typography></Link> */}
        <SearchBar />
      </Stack>
    </Stack>
  );
};

export default Navbar;
