import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, useMediaQuery, useTheme } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { theme } from "../../lib/utils/Theme";

/**
 * NavBar component that renders a responsive navigation bar.
 * Uses Material UI components and React hooks.
 *
 * Renders different UI for mobile vs desktop:
 * - Mobile: Hamburger icon to open drawer with menu items
 * - Desktop: Menu items displayed horizontally
 *
 * Shows Login button if not logged in, Logout if logged in.
 * Handles login state and navigation.
 */
function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
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
    <AppBar elevation={7}>
      <Toolbar>
        {isMobile ? (
          <>
            <IconButton
              sx={{ flexGrow: 1, justifyContent: "flex-start" }}
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="left"
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}
            >
              <List>
                {menuItems.map((item, index) => (
                  <ListItem
                    key={index}
                    component={NavLink}
                    to={item.link}
                    exact
                  >
                    <Typography>{item.text}</Typography>
                  </ListItem>
                ))}
              </List>
            </Drawer>
          </>
        ) : (
          <>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Jönköping City
            </Typography>
            {menuItems.map((item, index) => (
              <Button
                color="inherit"
                key={index}
                component={NavLink}
                to={item.link}
                exact
              >
                <Typography>{item.text}</Typography>
              </Button>
            ))}
          </>
        )}
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
              backgroundColor: "white",
              color: theme.palette.primary.main,
              borderRadius: "24px",
              paddingX: "3rem",
            }}
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
