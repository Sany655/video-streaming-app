import React, { useContext } from "react";
import { Badge, Button, Container, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { MyContext } from "../Contexts";

const Navbar = () => {
  const { count } = useContext(MyContext)
  return (
    <Container maxWidth="xl"
      style={{
        position: "sticky",
        top: 0,
        paddingTop: 15,
        paddingBottom: 15,
        borderBottom: "5px solid rgb(201 201 201)",
        background: "black"
      }}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        alignItems="center"
        justifyContent={'space-between'}
      >
        <Link to="/" style={{}}>
          <img src={__dirname + "logo.png"} alt="logo" height={45} />
        </Link>
        <Stack direction={{ sm: 'column', md: 'row' }} flex={1} justifyContent={'end'} alignItems={'center'} gap={4}>
          <Badge color="primary" badgeContent={count}>
            <Link to={`/saved`}><Typography color={'white'} variant="body1" >SAVED VIDEOS</Typography></Link>
          </Badge>
          <SearchBar />
        </Stack>
      </Stack>
    </Container>
  );
};

export default Navbar;
