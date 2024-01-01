import React, { useEffect, useState } from "react";
import {
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Box,
} from "@mui/material";

import { Bookmark } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import TrendingIcon from "@mui/icons-material/Whatshot";
import MovieIcon from "@mui/icons-material/Movie";
import TvIcon from "@mui/icons-material/Tv";
import Search from "../Modal/Search";

const drawerWidth = 240;

const Header = () => {
  const [blurMainContent, setBlurMainContent] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [headerBackground, setHeaderBackground] = useState("transparent");

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleScroll = () => {
    if (window.scrollY >= 100) {
      setHeaderBackground("black");
    } else {
      setHeaderBackground("transparent");
    }
  };

  useEffect(() => {
    // Attach the scroll event listener when the component mounts
    window.addEventListener("scroll", handleScroll);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const path = window.location.pathname;

  const navItems = [
    { text: "Trending", icon: <TrendingIcon />, link: "/" },
    { text: "Movies", icon: <MovieIcon />, link: "/movies" },
    { text: "TV Series", icon: <TvIcon />, link: "/tv-series" },
    { text: "Watchlist", icon: <Bookmark />, link: "/watchlist" },
  ];

  const drawer = (
    <Box>
      <Typography
        sx={{
          textTransform: "uppercase",
          fontSize: "22px",
          width: { xs: "100%", sm: "100%" },
          padding: "20px",
          color: "black",
        }}
      >
        🎬 movie saga
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItem
            button
            key={item.text}
            component="a"
            href={item.link}
            sx={{
              paddingLeft: "16px",
              background: path === item.link ? "#e6e6e6" : "transparent",
              borderRight:
                path === item.link ? " 4px solid black" : "transparent",
              color: path === item.link ? "black" : "#333333",
            }}
          >
            <ListItemIcon
              sx={{
                color: path === item.link ? "#e94f64" : "black",
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box
      sx={{
        width: "100%",
        backdropFilter: blurMainContent ? "blur(8px)" : "none",
        transition: "backdropFilter 0.5s ease",
      }}
    >
      <CssBaseline />
      <AppBar
        sx={{
          backgroundColor: headerBackground,
          color: "white",
          position: "fixed",
          top: "0",
          zIndex: "999",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <IconButton
            edge="start"
            color="black"
            aria-label="menu"
            sx={{
              marginRight: "16px",
              color: "white",
              display: {
                xs: "block",
                sm: "block",
                md: "block",
                lg: "none",
                xl: "none",
              },
            }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            sx={{
              textTransform: "uppercase",
              fontSize: "22px",
              display: {
                xs: "none",
                sm: "none",
                md: "none",
                lg: "block",
                xl: "block",
              },
              color: "white",
            }}
          >
            🎬 movie saga
          </Typography>

          <Box
            sx={{
              display: {
                xs: "none",
                sm: "none",
                md: "none",
                lg: "block",
                xl: "block",
              },
            }}
          >
            <List
              sx={{
                display: "flex",
                flexDirection: "row",
                whiteSpace: "nowrap",
              }}
            >
              {navItems.map((item) => (
                <ListItem
                  button
                  key={item.text}
                  component="a"
                  href={item.link}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    borderBottom:
                      path === item.link ? " 2px solid #e94f64" : "transparent",
                    color: path === item.link ? "#e94f64" : "white",
                  }}
                >
                  <ListItemText
                    primary={item.text}
                    sx={{ fontSize: "0.8rem" }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>

          <Search setBlurMainContent={setBlurMainContent} />
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        PaperProps={{
          sx: {
            bgcolor: "#f1f3f5",
          },
        }}
        sx={{
          width: drawerWidth,
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Header;
