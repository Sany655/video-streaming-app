import React from "react";
import { Button, Container, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

const Navbar = () => {
  return (
    <Container maxWidth="xl"
      style={{
        position: "sticky",
        top: 0,
        paddingTop: 15,
        paddingBottom: 15,
        borderBottom:"5px solid rgb(201 201 201)",
        background:"black"
      }}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        alignItems="center"
        justifyContent={'space-between'}
      >
        <Link to="/" style={{}}>
          <img src={__dirname+"logo.png"} alt="logo" height={45} />
        </Link>
        <Stack flex={1} direction={'row'} justifyContent={'end'} alignItems={'center'} gap={4}>
          {/* <Link ><Typography variant="body">BOOKMARKED VIDEOS</Typography></Link> */}
          <SearchBar />
        </Stack>
      </Stack>
    </Container>
  );
};

export default Navbar;
