import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Genres from "../../components/Genres";
import axios from "axios";
import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../components/Pagination/CustomPagination";
import Loader from "../../components/Loader/Loader";
import Footer from "../../components/SingleItem/Footer";

const Movies = () => {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(1000);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const filterContentByGenre = (data) => {
    return data.filter((item) => {
      return selectedGenres.every((selectedGenre) =>
        item.genre_ids.includes(selectedGenre)
      );
    });
  };

  const fetchMovies = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`
      );

      const filteredData = filterContentByGenre(data?.results);

      if (selectedGenres.length < 1) {
        setContent(data?.results);
        setNumberOfPages(data?.total_pages);
      } else {
        setContent(filteredData);
        setNumberOfPages(Math.ceil(filteredData.length / 20));
      }

      setLoading(false);
      // setNumberOfPages(data?.total_pages);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      // Handle the error, e.g., show an error message to the user
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, selectedGenres]);

  return (
    <Box
      sx={{
        // opacity: contentOpacity,
        transition: "opacity 0.4s ease",
        // pointerEvents: "auto",
        // backgroundColor: "#dee2e6",
        background: "black",
        paddingTop: "64px",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          // color: "black",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem",
          fontWeight: "bold",
        }}
      >
        Movies Page
        <Genres
          genres={genres}
          setGenres={setGenres}
          selectedGenres={selectedGenres}
          setSelectedGenres={setSelectedGenres}
          setPage={setPage}
        />
      </Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={c.media_type || "movie"}
              vote_average={c.vote_average}
            />
          ))}

        {loading && <Loader />}
      </Box>
      {numberOfPages > 1 && (
        <CustomPagination setPage={setPage} pageNumber={numberOfPages} />
      )}
      <Footer />
    </Box>
  );
};

export default Movies;
