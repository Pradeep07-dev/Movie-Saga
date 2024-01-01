import { Card, CardMedia, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import React from "react";
import { img_300, unavailable } from "../../config/config";

const SingleContent = ({
  id,
  poster,
  title,
  date,
  media_type,
  vote_average,
}) => {
  const navigate = useNavigate();
  return (
    <Card
      sx={{
        display: "flex",
        position: "relative",
        cursor: "pointer",
        flexDirection: "column",
        margin: "1rem",
        border: "1px solid #dee2e6",
        "&:hover": {
          border: "1px solid #e94f64",
          transition: "all 0.3s ease",
          color: "black",
          transform: "scale(1.1)",
          boxShadow: "10px",
        },
      }}
      onClick={() =>
        navigate(`/${media_type}/content?id=${id}&type=${media_type}`)
      }
    >
      <CardMedia
        component="img"
        alt={title}
        height="300"
        image={poster ? `${img_300}/${poster}` : unavailable}
        sx={{
          display: "flex",
          position: "relative",
        }}
      />
      <Typography
        sx={{
          maxWidth: "170px",
          m: 0.7,
          textAlign: "center",
        }}
      >
        {title}
      </Typography>
    </Card>
  );
};

export default SingleContent;
