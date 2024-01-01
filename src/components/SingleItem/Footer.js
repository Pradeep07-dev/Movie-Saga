import { Box, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <Box
      sx={{
        padding: "1rem ",
        margin: "1rem",
        textAlign: "center",
        fontSize: {
          xs: "0.5rem",
          sm: "0.7rem",
          md: "0.8rem",
          lg: "1rem",
          xl: "1rem",
        },
        color: "white",
        borderTop: "1.5px solid white",
      }}
    >
      <Box>
        <Typography>
          Copyright &copy; 2023
          <span style={{ color: "#e94f64" }}> @PradeepReddy07_dev. </span>
          All Rights Reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
