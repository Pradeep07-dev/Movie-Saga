import React, { useEffect, useState } from "react";
import { Box, Button, Popover, useMediaQuery } from "@mui/material";
import axios from "axios";
import FilterListIcon from "@mui/icons-material/FilterList";

const Genres = ({
  genres,
  setGenres,
  selectedGenres,
  setSelectedGenres,
  setPage,
}) => {
  const toggleGenre = (genreId) => {
    if (selectedGenres.includes(genreId)) {
      setSelectedGenres(
        selectedGenres.filter((selected) => selected !== genreId)
      );
      setPage(1);
    } else {
      setSelectedGenres([...selectedGenres, genreId]);
      setPage(1);
    }
  };

  const fetchGenres = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );

    setGenres(data.genres);
  };
  useEffect(() => {
    fetchGenres();
    return () => {
      setGenres([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = () => {
    setAnchorEl("top");
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Box>
      {isSmallScreen ? (
        <Button
          sx={{
            borderRadius: "50%",
            padding: "0",
            cursor: "pointer",
            margin: "0",
            width: "2.5rem",
            height: "2.5rem",
            minWidth: "0",
            // color: "#087f5b",
            color: "#e94f64",
            transition: "all 0.4s ease",
          }}
          onClick={handleClick}
        >
          <FilterListIcon
            sx={{
              fontSize: { xs: "2rem", sm: "2rem", md: "2.2rem" },
            }}
          />
        </Button>
      ) : (
        <Button
          variant="outlined"
          sx={{
            border: "1px solid #e94f64 ",
            color: "white",
            borderRadius: "8px",
            "&:hover": {
              background: "#e94f64",
              color: "white",
              transition: "all 0.4s ease",
            },
          }}
          onClick={handleClick}
        >
          Genre
        </Button>
      )}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        sx={{
          transform: "translateY(12%)",
          transition: "all 0.3 ease",
        }}
      >
        <Box sx={{ padding: "10px" }}>
          {genres.map((genre) => (
            <Button
              key={genre.id}
              onClick={() => toggleGenre(genre.id)}
              variant="outlined"
              sx={{
                borderRadius: "8px",
                margin: "8px",

                border: "1px solid #e94f64",
                color: selectedGenres.includes(genre.id) ? "white" : "black",
                backgroundColor: selectedGenres.includes(genre.id)
                  ? "#e94f64"
                  : "transparent",
                "&:hover": {
                  border: "1px solid #e94f64",
                  backgroundColor: selectedGenres.includes(genre.id)
                    ? "#e94f64"
                    : "transparent",
                  color: selectedGenres.includes(genre.id) ? "white" : "black",
                },
              }}
            >
              {genre.name}
            </Button>
          ))}
        </Box>
      </Popover>
    </Box>
  );
};

export default Genres;
