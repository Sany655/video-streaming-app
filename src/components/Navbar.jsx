import React, { useContext } from "react";
import { Badge, Box, Button, Container, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { MyContext } from "../Contexts";

const Navbar = () => {
  const { count } = useContext(MyContext)
  return (
    <Box
      style={{
        // position: { xs: "sticky", md:"relative"},
        top: 0,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft:20,
        paddingRight:20,
        borderBottom: "5px solid rgb(201 201 201)",
        background: "black"
      }}>
      <Stack
        direction={{ sm: 'column', md: 'row' }}
        alignItems="center"
        justifyContent={'space-between'}
      >
        <Link to="/" style={{}}>
          <img src={__dirname + "logo.png"} alt="logo" height={45} />
        </Link>
        <Stack direction={{ xs: 'column', sm: 'row' }} flex={1} justifyContent={'end'} alignItems={'center'} gap={3} marginTop={{ xs: 3,md: 0 }}>
          <Link to={`/saved`}><Typography color={'white'} variant="body1" >{count} - SAVED VIDEOS</Typography></Link>
          <Link to={`/experiment`}><Typography color={'white'} variant="body1" textTransform={'capitalize'}>experiment</Typography></Link>
          <Link to={`/admin`}><Typography color={'white'} variant="body1" textTransform={'capitalize'}>admin</Typography></Link>
          <SearchBar />
        </Stack>
      </Stack>
    </Box>
  );
};

export default Navbar;
