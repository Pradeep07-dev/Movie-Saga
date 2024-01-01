import React from "react";
import WarningIcon from "@mui/icons-material/Warning";
import { Box, Typography } from "@mui/material";

const IMG_PATH = "https://image.tmdb.org/t/p/w300";

const Helper = ({ castData }) => {
  const castDataCopy = [...castData];

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: "1.2rem",
        marginTop: "1rem",
      }}
    >
      {castDataCopy &&
        castDataCopy.map((c, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: {
                xs: "0.8rem",
                sm: "0.88rem",
                md: "1rem",
                lg: "1rem",
                xl: "1rem",
              },
              textAlign: "center",
              width: {
                xs: "8rem",
                sm: "8rem",
                md: "10rem",
                lg: "10rem",
                xl: "10rem",
              },
            }}
          >
            {c.profile_path ? (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "2px solid #e94f64",
                  borderRadius: "5px",
                  width: {
                    xs: "8rem",
                    sm: "8rem",
                    md: "10rem",
                    lg: "10rem",
                    xl: "10rem",
                  },
                  height: {
                    xs: "11rem",
                    sm: "11rem",
                    md: "13rem",
                    lg: "13rem",
                    xl: "13rem",
                  },
                  overflow: "hidden",
                }}
              >
                <img
                  style={{
                    width: "10.2rem",
                    height: "13rem",
                    "@media (max-width: 600px)": {
                      width: "8.2rem",
                      height: "11rem",
                    },

                    cursor: "pointer",
                  }}
                  src={`${IMG_PATH}${c.profile_path}`}
                  alt={c.name}
                />
              </Box>
            ) : (
              <Box
                sx={{
                  width: {
                    xs: "8.2rem",
                    sm: "8.2rem",
                    md: "10.2rem",
                    lg: "10.2rem",
                    xl: "10.2rem",
                  },
                  height: {
                    xs: "11rem",
                    sm: "11rem",
                    md: "13rem",
                    lg: "13rem",
                    xl: "13rem",
                  },
                  background: "#e94f64",
                  borderRadius: "5px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <WarningIcon
                  sx={{
                    fontSize: {
                      xs: "2rem",
                      sm: "2rem",
                      md: "3rem",
                      lg: "3rem",
                      xl: "3rem",
                    },
                  }}
                />
                <Typography>Image Unavailable</Typography>
              </Box>
            )}
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: {
                  xs: "0.8rem",
                  sm: "0.8rem",
                  md: "1rem",
                  lg: "1rem",
                  xl: "1rem",
                },
              }}
            >
              {c.name}
            </Typography>
          </Box>
        ))}
    </Box>
  );
};

export default Helper;
