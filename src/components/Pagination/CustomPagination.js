import { Box, Pagination } from "@mui/material";
import React from "react";

const CustomPagination = ({ setPage, pageNumber }) => {
  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        paddingTop: "20px",
        paddingBottom: "20px",
        "& .MuiPaginationItem-root": {
          backgroundColor: "white",
          color: "black",
        },
        "& .MuiPaginationItem-root.Mui-selected": {
          backgroundColor: "#e94f64",
          color: "white",
        },
        "& .MuiPaginationItem-root.Mui-selected:hover": {
          backgroundColor: "#e94f64",
          color: "white",
        },
        "& .MuiPaginationItem-root:hover": {
          backgroundColor: "white",
          color: "black",
        },
      }}
    >
      <Pagination count={pageNumber} onChange={handleChange} />
    </Box>
  );
};

export default CustomPagination;
