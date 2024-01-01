import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  InputBase,
  Modal,
  Typography,
  Backdrop,
  Fade,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const BASE_POSTER_URL = "https://image.tmdb.org/t/p/w92";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

const Search = ({ setBlurMainContent }) => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(true);
    setBlurMainContent(true);
  };

  const handleClose = () => {
    setOpen(false);
    setBlurMainContent(false);
    setSearchText("");
  };

  const handleClick = (result) => {
    handleClose();

    navigate(
      `/${result.media_type}/content?id=${result.id}&type=${result.media_type}`
    );
  };

  const fetchSearch = async (searchText) => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchText}`
      );
      setSearchResults(data.results);
    } catch (error) {}
  };

  useEffect(() => {
    if (searchText.trim() === "") {
      setSearchResults([]);
    } else {
      fetchSearch(searchText);
    }
  }, [searchText]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        padding: "5px",
      }}
    >
      <Button
        sx={{
          display: "flex",
          alignItems: "center",

          border: "1px solid #383838",
          backgroundColor: "white",
          color: "#383838",
          transition: "all 0.5s ease",
          borderRadius: "5px",
          "&:hover": {
            backgroundColor: "#626262",
            color: "#FFF",
            border: "1px solid #fff",
          },
        }}
        onClick={handleOpen}
      >
        <SearchIcon />
        <Typography>Search</Typography>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                backgroundColor: "#212121",
                borderRadius: "8px",
                paddingTop: "2rem",
                color: "white",
                flexDirection: "column",
                justifyContent: "flex-start",
                paddingX: {
                  xs: "0.8rem",
                  sm: "1rem",
                  md: "1.5rem",
                  lg: "3rem",
                  xl: "3rem",
                },
                paddingBottom: "1rem",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "16px",
                  backgroundColor: "#383838",
                }}
              >
                <SearchIcon
                  sx={{
                    margin: "0 1rem",

                    color: "white",
                  }}
                />
                {open && (
                  <InputBase
                    placeholder="Search Movies&TV "
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    sx={{
                      paddingRight: {
                        xs: "1.8rem",
                        sm: "1.5rem",
                        md: "1.8rem",
                        lg: "4.3rem",
                        xl: "5.3rem",
                      },
                      color: "white",
                    }}
                    autoFocus={true}
                  />
                )}

                {searchText.trim() !== "" && (
                  <ClearIcon
                    onClick={() => setSearchText("")}
                    sx={{
                      color: "white",
                      margin: "0 0.5rem",
                    }}
                  />
                )}
              </Box>
              <Box
                sx={{
                  height: 320,
                  overflow: "auto",
                  marginTop: "0.2rem",
                  width: {
                    xs: "312px",
                    sm: "395px",
                    md: "425px",
                    lg: "450px",
                    xl: "500px",
                  },
                  scrollBehavior: "smooth",
                  "&::-webkit-scrollbar": {
                    height: 10,
                    width: 7,
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#bdbdbd",
                    borderRadius: 2,
                  },
                }}
              >
                {searchResults.map((result) => (
                  <Box
                    key={result.id}
                    sx={{
                      padding: "10px 10px",
                      display: "flex",
                      alignItems: "center",
                      "&:hover": {
                        backgroundColor: "#383838",
                        cursor: "pointer",
                      },
                    }}
                    onClick={() => handleClick(result)}
                  >
                    <img
                      src={`${BASE_POSTER_URL}${result.poster_path}`}
                      alt=""
                      width="32px"
                    />
                    <Typography
                      sx={{
                        paddingLeft: "8px",
                      }}
                    >
                      {result.name || result.title}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default Search;
