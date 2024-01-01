import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import SingleContent from "../../components/SingleContent/SingleContent";
import axios from "axios";
import Footer from "../../components/SingleItem/Footer";
import WarningIcon from "@mui/icons-material/Warning";
import Loader from "../../components/Loader/Loader";

const Watchlist = () => {
  const [bookmarkedMovies, setBookmarkedMovies] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedBookmarks = JSON.parse(localStorage.getItem("Watchlist")) || [];
    setBookmarkedMovies(storedBookmarks);
  }, []);

  const fetchData = async () => {
    try {
      if (bookmarkedMovies.length > 0) {
        const dataArray = await Promise.all(
          bookmarkedMovies.map(async (bookmarkedMovie) => {
            const { contentID, contentType } = bookmarkedMovie;
            const { data } = await axios.get(
              `https://api.themoviedb.org/3/${contentType}/${contentID}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&external_source=imdb_id`
            );

            return data;
          })
        );
        setData(dataArray);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookmarkedMovies]);

  return (
    <Box
      sx={{
        background: "black",
        color: "white",
        paddingTop: "64px",
        paddingBottom: "1rem",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          color: "white",
          padding: "1rem",
          fontWeight: "bold",
        }}
      >
        Watchlist Page
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-start",
          padding: "2rem 3rem",
        }}
      >
        {data.length > 0
          ? data.map((d) => (
              <SingleContent
                key={d.id}
                id={d.id}
                poster={d.poster_path}
                title={d.title || d.name}
                date={d.first_air_date || d.release_date}
                media_type={d.title ? "movie" : "tv"}
                vote_average={d.vote_average}
              />
            ))
          : !loading && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  flexDirection: "column",
                  // padding: "8rem 2rem",
                  minHeight: "55vh",
                }}
              >
                <WarningIcon
                  sx={{
                    fontSize: { xs: "4rem", sm: "5rem" },
                    color: "#e94f64",
                  }}
                />
                <Typography sx={{ fontSize: { xs: "2rem", sm: "3rem" } }}>
                  You don't have any Watchlists yet.
                </Typography>
              </Box>
            )}
        {loading && <Loader />}
      </Box>
      <Box>
        <Footer />
      </Box>
    </Box>
  );
};

export default Watchlist;
