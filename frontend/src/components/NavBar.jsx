import { useState } from "react";
import { NavLink, useNavigate, useLocation, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, useMediaQuery, useTheme, Container } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { theme } from "../lib/utils/Theme";

function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const itheme = useTheme();
  const isMobile = useMediaQuery(itheme.breakpoints.down("sm"));

  const handleLogout = () => {
    // Add your logout logic here
    setIsLoggedIn(false);
  };

  const menuItems = [
    { link: "/", text: "Home" },
    { link: "/stores", text: "Stores" },
    { link: "/wellness", text: "Wellness" },
  ];

  return (
    <AppBar color="secondary" elevation={7}>
      <Container maxWidth="xl">
        <Toolbar>
        {isMobile ? (
          <>
            <Typography
              flexGrow={1}
              variant="h6">
              Jönköping City
            </Typography>
            <IconButton
              sx={{ flexGrow: 0, justifyContent: "flex-end" }}
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}
            >
              {menuItems.map((item, index) => (
              <Button
                color="inherit"
                key={index}
                component={NavLink}
                to={item.link}
                exact
                sx={{
                  bgcolor: location.pathname === item.link ? theme.palette.secondary.main : "transparent",
                  textDecorationLine: "none",
                  borderRadius: "3px",
                }}
              >
                {item.text}
              </Button>
                ))}
                <Button
                variant='text'
                color="inherit"
                component={NavLink}
                to={'/login'}
                exact
              >
                Login
              </Button>
            </Drawer>
          </>
        ) : (
          <>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              Jönköping City
            </Typography>
            {menuItems.map((item, index) => (
              <Button
                color="inherit"
                key={index}
                component={NavLink}
                to={item.link}
                exact
                variant='text'
                sx={{
                  bgcolor: location.pathname === item.link ? theme.palette.secondary.main : "transparent",
                  textDecoration: "none",
                  borderRadius: "3px",
                  marginX: "0.2rem",
                  '& .MuiTypography-root': {
                    textDecoration: 'none', // Remove underline
                  },
                }}
              >
                <Typography>{item.text}</Typography>
              </Button>
                ))}
            {isLoggedIn ? (
          <Button variant="contained" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={() => navigate("/login")}
            size="large"
            sx={{
              marginLeft: "1rem",
              backgroundColor: theme.palette.third.main,
              color: theme.palette.primary.main,
              borderRadius: "24px",
              paddingX: "3rem",
              "&:hover": {
                color: theme.palette.third.main,
              },
            }}
          >
            Login
          </Button>
        )}
          </>
        )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;
