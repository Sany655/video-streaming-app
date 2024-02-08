import React from "react";
import { Button, Container, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { logo } from "../utils/constants";
import SearchBar from "./SearchBar";

const Navbar = () => {
  return (
    <Container maxWidth="xl"
      style={{
        position: "sticky",
        top: 0,
        justifyContent: "space-between",
        alignItems: "center",
        background: "black",
        paddingTop: 15,
        paddingBottom: 15,
      }}>
      <Stack
        sx={{

        }}
        direction={{ xs: 'column', sm: 'row' }}
        alignItems="center"
        justifyContent={'space-between'}
      >
        <Link to="/" style={{}}>
          <img src={logo} alt="logo" height={45} />
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
