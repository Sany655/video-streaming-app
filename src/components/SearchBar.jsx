import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Paper, IconButton } from "@mui/material";
import { Search } from "@mui/icons-material";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const onhandleSubmit = (event) => {
    event.preventDefault();

    if (searchTerm) {
      navigate(`/search/${searchTerm}`);

      setSearchTerm("");
    }
  };
  return (
    <Paper
      component="form"
      onSubmit={onhandleSubmit}
      sx={{
        borderRadius: 20,
        border: "1px solid #333",
        pl: 2,
        boxShadow: "none",
        mr: { sm: 5 },
        background:'white'
      }}
    >
      <input
        className="search-bar"
        onChange={(event) => setSearchTerm(event.target.value)}
        value={searchTerm}
        placeholder="Search Here..."
      />
      <IconButton type="submit" sx={{ p: "10px", color: "#333" }}>
        <Search />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;
