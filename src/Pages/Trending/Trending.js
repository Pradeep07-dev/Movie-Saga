import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Genres from "../../components/Genres";
import axios from "axios";
import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../components/Pagination/CustomPagination";
import Loader from "../../components/Loader/Loader";
import Footer from "../../components/SingleItem/Footer";

const Trending = () => {
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

  const fetchTrending = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`
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
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  console.log(page, "page");

  useEffect(() => {
    fetchTrending();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, selectedGenres]);

  return (
    <Box
      sx={{
        transition: "opacity 0.4s ease",
        background: "black",
        paddingTop: "64px",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem",
          fontWeight: "bold",
        }}
      >
        Trending Page
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
              media_type={c.media_type}
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

export default Trending;
