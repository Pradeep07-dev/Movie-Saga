import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Trending from "./Pages/Trending/Trending";
import Movies from "./Pages/Movies/Movies";
import TVSeries from "./Pages/TVSeries/TVSeries";
import Watchlist from "./Pages/Watchlist/Watchlist";
import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SingleItem from "./components/SingleItem/SingleItem";

const theme = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
});

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" exact element={<Trending />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/tv-series" element={<TVSeries />} />
      <Route path="/watchlist" element={<Watchlist />} />
      <Route path="/:media_type/content" element={<SingleItem />} />
    </Routes>
  );
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Header />
        <AppRoutes />
      </Router>
    </ThemeProvider>
  );
};

export default App;
