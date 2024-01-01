import { Box, Container, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import StarRateIcon from "@mui/icons-material/StarRate";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Helper from "./Helper";
import Footer from "./Footer";
import Loader from "../Loader/Loader";

const SingleItem = () => {
  const [data, setData] = useState(null);
  const [videoData, setVideoData] = useState(null);
  const [videoKey, setVideoKey] = useState([]);
  const [bannerUrl, setBannerUrl] = useState("");
  const [posterUrl, setPosterUrl] = useState("");
  const [showTrailer, setShowTrailer] = useState("poster");
  const [castData, setCastData] = useState([]);
  const [addWatchlist, setAddWatchlist] = useState(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const contentID = searchParams.get("id");
  const contentType = searchParams.get("type");

  // Load Watchlist from local storage on component mount
  useEffect(() => {
    const addedWatchlist = JSON.parse(localStorage.getItem("Watchlist")) || [];
    setAddWatchlist(
      addedWatchlist.some((item) => item.contentID === contentID)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = () => {
    const addedWatchlist = JSON.parse(localStorage.getItem("Watchlist")) || [];

    const isAlreadyAdded = addedWatchlist.some(
      (item) => item.contentID === contentID && item.contentType === contentType
    );

    if (isAlreadyAdded) {
      // Remove from Watchlist
      const updatedWatchlist = addedWatchlist.filter(
        (item) =>
          item.contentID !== contentID || item.contentType !== contentType
      );
      localStorage.setItem("Watchlist", JSON.stringify(updatedWatchlist));
    } else {
      // Add to Watchlist
      const updatedWatchlist = [
        ...addedWatchlist,
        { contentID, contentType: contentType },
      ];
      localStorage.setItem("Watchlist", JSON.stringify(updatedWatchlist));
    }

    setAddWatchlist(!addWatchlist);
  };

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${contentType}/${contentID}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&external_source=imdb_id`
      );

      setData(data);

      const url = `https://api.themoviedb.org/3/${contentType}/${contentID}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=videos,credits&language=en-US&external_source=imdb_id`;

      const response = await fetch(url);
      const dataVideo = await response.json();
      setVideoData(dataVideo);

      const bannerPosterPath = data?.backdrop_path;
      const posterPath = data?.poster_path;
      if (bannerPosterPath) {
        const baseUrl = "https://image.tmdb.org/t/p/original";
        setBannerUrl(baseUrl + bannerPosterPath);
      }
      if (posterPath) {
        const baseUrl = "https://image.tmdb.org/t/p/original";
        setPosterUrl(baseUrl + posterPath);
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentID]);

  const checkYouTubeTrailerAvailability = async (results) => {
    if (!videoData) return;

    const availableTrailers = [];

    for (const result of results) {
      try {
        if (!result.name.includes("removed")) {
          availableTrailers.push(result.key);
        } else {
        }
      } catch (error) {}
    }

    setVideoKey(availableTrailers);
    return availableTrailers;
  };

  useEffect(() => {
    const results = videoData?.videos?.results;
    if (results) {
      checkYouTubeTrailerAvailability(results).then((availableTrailers) => {});
    }

    if (videoData && videoData.credits && videoData.credits.cast) {
      const casts = videoData.credits.cast;

      const castCopyData = [];

      for (const cast of casts) {
        castCopyData.push({ ...cast });
      }

      setCastData(castCopyData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoData]);

  return (
    <Box>
      {data ? (
        <Box
          sx={{
            background: "black",
            color: "white",
          }}
        >
          <Box
            sx={{
              position: "relative",
              height: "50vh",
              backgroundPosition: "50%",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",

              backgroundImage: `url(${bannerUrl})`,
              "&::before": {
                content: '""',
                position: "absolute",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0,0,0,.6)",
              },

              "&::after": {
                content: '""',
                position: "absolute",
                bottom: "0",
                left: "0",
                width: "100%",
                height: "100px",
                backgroundImage: "linear-gradient(0deg,#0f0f0f,transparent)",
              },
            }}
          ></Box>
          <Box>
            <Container
              sx={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                maxWidth: "1260px",
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "-200px",
                marginBottom: "3rem",
                position: "relative",
                padding: "0 2rem",
              }}
            >
              <Box
                sx={{
                  flexGrow: "1",
                  flexShrink: "1",
                  flexBasis: "0%",
                }}
              >
                <Box
                  sx={{
                    backgroundPosition: "50%",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundImage: `url(${posterUrl})`,
                    borderRadius: "25px",
                    paddingTop: "165%",
                  }}
                ></Box>
              </Box>
              <Box
                sx={{
                  width: {
                    xs: "100%",
                    sm: "80%",
                    md: "70%",
                    lg: "70%",
                    xl: "70%",
                  },
                  paddingLeft: {
                    xs: "0.5rem",
                    sm: "2rem",
                    md: "2rem",
                    lg: "2rem",
                    xl: "2rem",
                  },
                  position: "relative",
                }}
              >
                <Typography
                  sx={{
                    marginBottom: "2rem",
                    fontSize: {
                      xs: "2rem",
                      sm: "3rem",
                      md: "4rem",
                      lg: "4rem",
                      xl: "4rem",
                    },
                    lineHeight: "1",
                    fontWeight: {
                      xs: "600",
                      sm: "600",
                      md: "400",
                      lg: "400",
                      xl: "400",
                    },
                  }}
                >
                  {data.title || data.name}
                </Typography>

                <Typography
                  sx={{
                    marginBottom: "2rem",
                  }}
                >
                  {data.genres &&
                    data.genres.slice(0, 5).map((genre, i) => (
                      <Box
                        key={i}
                        sx={{
                          display: "inline-flex",
                          padding: { xs: "0.3rem 0.5rem", sm: "0.5rem 1.5rem" },
                          marginLeft: "0.5rem",
                          marginBottom: { xs: "0.5rem", sm: "0" },
                          border: "2px solid #fff",
                          borderRadius: "30px",
                          fontSize: { xs: "0.6rem", sm: "0.8rem" },
                          fontWeight: { xs: "400", sm: "600" },
                          backgroundColor: "#0f0f0f",
                        }}
                      >
                        {genre.name}
                      </Box>
                    ))}
                </Typography>

                <Typography
                  sx={{
                    marginBottom: "2rem",
                    fontSize: {
                      xs: "0.7rem",
                      sm: "1rem",
                      md: "1rem",
                      lg: "1rem",
                      xl: "1rem",
                    },
                  }}
                >
                  {data.description || data.overview}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: {
                      xs: "column",
                      sm: "row",
                      md: "row",
                      lg: "row",
                      xl: "row",
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      gap: "1rem",
                    }}
                  >
                    <Box
                      sx={{
                        marginBottom: "2rem",
                        border: "2px solid #e94f64",
                        padding: "1rem",
                        fontSize: "1rem",
                        width: "7rem",
                        height: "7rem",
                      }}
                    >
                      <span
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          fontSize: "20px",
                        }}
                      >
                        <StarRateIcon sx={{ color: "yellow" }} />
                        {data.vote_average}
                      </span>
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "9px",
                        }}
                      >
                        {data.vote_count}
                      </span>
                    </Box>
                    <Box>
                      <Typography
                        sx={{
                          marginBottom: "2rem",
                        }}
                      >
                        Release Date: &nbsp;
                        <span style={{ color: "#e94f64" }}>
                          {data.release_date || data.first_air_date}
                        </span>
                      </Typography>
                      <Typography
                        sx={{
                          marginBottom: "2rem",
                        }}
                      >
                        Duration: &nbsp;
                        <span style={{ color: "#e94f64" }}>
                          {data.runtime || data.episode_run_time}
                          min
                        </span>
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      marginBottom: "2rem",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      border: "1px solid #e94f64",
                      width: "12rem",
                      height: "2.5rem",
                      color: addWatchlist ? "none" : "#e94f64",
                      background: addWatchlist ? "#e94f64" : "none",
                      cursor: "pointer",
                    }}
                    onClick={handleClick}
                  >
                    <CollectionsBookmarkIcon />
                    {addWatchlist ? "Added to Watchlist" : "Watchlist"}
                  </Box>
                </Box>
              </Box>
            </Container>

            <Box
              sx={{
                marginLeft: "1rem",
              }}
            >
              {showTrailer === "poster" ? (
                <Box
                  sx={{
                    position: "relative",
                  }}
                >
                  <img
                    style={{
                      maxWidth: "85%",
                    }}
                    src={bannerUrl}
                    alt={data.name ?? data.title ?? data.original_title}
                  />

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.5rem",
                      position: "absolute",
                      bottom: "2rem",
                      left: {
                        xs: "0.5rem",
                        sm: "0.7rem",
                        md: "1.2rem",
                        lg: "2rem",
                        xl: "2rem",
                      },
                      zIndex: "3",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#e01c37",
                        width: "85%",
                        fontSize: {
                          sm: "2.3rem",
                          md: "3rem",
                          lg: "3.8rem",
                          xl: "4.2rem",
                        },
                        fontWeight: "600",
                        display: { xs: "none", sm: "block" },
                      }}
                    >
                      {data.name ?? data.title ?? data.original_title}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        color: "#fff",
                        alignItems: "center",
                        width: "fit-content",
                        gap: "0.5rem",
                        border: "2px solid #e01c37",
                        paddingX: {
                          xs: "0.4rem",
                          sm: "0.6rem",
                          md: "0.8rem",
                          lg: "1rem",
                          xl: "1rem",
                        },
                        "&:hover": {
                          background: "#e01c37",
                          color: "white",
                          cursor: "pointer",
                        },
                      }}
                      onClick={() => {
                        setShowTrailer("trailer");
                      }}
                    >
                      <PlayArrowIcon
                        sx={{
                          fontSize: {
                            xs: "1.5rem",
                            sm: "1rem",
                            md: "1.2rem",
                            lg: "1.5rem",
                            xl: "1.5rem",
                          },
                          color: "#fff",
                          padding: "0",
                        }}
                      />
                      <Typography
                        sx={{
                          padding: "0",
                          fontSize: {
                            sm: "1rem",
                            md: "1.2rem",
                            lg: "1.4rem",
                            xl: "1.4rem",
                          },
                          display: { xs: "none", sm: "block" },
                        }}
                      >
                        Watch Trailer
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      position: "absolute",
                      top: "0",
                      width: "100%",
                      height: "100%",
                      background:
                        "linear-gradient(45deg,rgba(0,0,0,.9),rgba(0,0,0,.15))",
                    }}
                  ></Box>
                </Box>
              ) : (
                <Box>
                  <Box
                    sx={{
                      position: "relative",
                      maxWidth: "85%",
                    }}
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        color: "white",
                        fontSize: "1.2rem",
                        border: "2px solid #e01c37",
                        margin: {
                          xs: "0.6rem",
                          sm: "1rem",
                          md: "1rem",
                          lg: "2rem",
                          xl: "2rem",
                        },
                        background: "#e01c37",
                        cursor: "pointer",
                        padding: "0.2rem 0.6rem",
                        borderRadius: "5px",
                        transition: "all 0.3s ease",
                        right: {
                          xs: "-8%",
                          sm: "-5%",
                          md: "-4%",
                          lg: "-4%",
                          xl: "-4%",
                        },
                        top: {
                          xs: "-12%",
                          sm: "-9%",
                          md: "-8%",
                          lg: "-8%",
                          xl: "-8%",
                        },
                        zIndex: "44",
                      }}
                      onClick={() => {
                        setShowTrailer("poster");
                      }}
                    >
                      X
                    </Box>
                    {videoData?.videos?.results ? (
                      <iframe
                        style={{
                          aspectRatio: "16/9",
                          width: "100%",
                          height: "100%",
                          top: "0",
                          left: "0",
                          transition: "all 0.4s ease",
                        }}
                        width="500"
                        height="350"
                        src={`https://www.youtube.com/embed/${videoKey[0]}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allowFullScreen
                      ></iframe>
                    ) : (
                      <figure>
                        <i class="ph-icon ph-warning"></i>
                        <figcaption>
                          Unfortunately, we cant find the video trailer of this
                          one.
                        </figcaption>
                        <a
                          target="_blank"
                          href={`https://www.youtube.com/results?search_query=
                       ${data.name ?? data.title ?? data.original_title}
                       Trailer`}
                          rel="noreferrer"
                        >
                          Watch in youtube &#8594;
                        </a>
                      </figure>
                    )}
                  </Box>
                </Box>
              )}
            </Box>

            <Box sx={{ margin: "1rem" }}>
              <Typography variant="h3">
                Casts
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    flexDirection: "column",
                    gap: "1rem",
                    margin: "1.5rem",
                  }}
                >
                  {videoData && castData ? (
                    <Box>
                      <Helper castData={castData} />
                    </Box>
                  ) : (
                    <Loader />
                  )}
                </Box>
              </Typography>
            </Box>
            <Footer />
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            paddingTop: "10rem",
          }}
        >
          <Loader />
        </Box>
      )}
    </Box>
  );
};

export default SingleItem;
