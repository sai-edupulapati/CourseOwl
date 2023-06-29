import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import { Backdrop, createTheme } from '@mui/material';
import { ThemeContext, ThemeProvider } from '@emotion/react';
import Image from '../assets/home51.jpg';
import logo from '../assets/owl.png';
import Stack from '@mui/material/Stack';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import PersonIcon from '@mui/icons-material/Person';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

const font = "'Belanosima', sans-serif";
const theme = createTheme({
  typography: {
    fontFamily: font,
    button: { textTransform: 'none' },
  },
});

const styles = {
  paperContainer: {
    background: `url(${Image})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    filter: 'blur(0)', // Added to prevent background blur
  },
  icon: {
    margin: 'auto',
    width: '35px',
    top: '30px',
    left: '0',
    right: '0',
    position: 'absolute',
  },
  features: {
    width: '10vw',
  },
  drawer: {
    marginTop: '80px',
    border: 'none',
    background: 'white',
    backdropFilter: 'none', // Added to prevent sidebar blur
  },
};

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const menuOptions = [
    { icon: <HomeIcon />, text: 'Home' },
    { icon: <InfoIcon />, text: 'About' },
    { icon: <PersonIcon />, text: 'Profile' },
  ];

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const sidebarHeight = 56 * menuOptions.length; // Assuming each menu option has a height of 56px

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent" elevation={0}>
        <img style={styles.icon} src={logo} alt="logo" />
        <Toolbar style={styles.paperContainer}> {/* Added style to the Toolbar */}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, justifyContent: 'left' }}
            onClick={handleMenuToggle}
          >
            <MenuIcon />
          </IconButton>
          <ThemeProvider theme={theme}>
            <Typography component="div" sx={{ flexGrow: 1 }} fontSize={30} fontWeight={'bold'}>
              CourseOwl
            </Typography>
            <button className="button-54">Log In</button>
          </ThemeProvider>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={isMenuOpen}
        onClose={handleMenuClose}
        PaperProps={{ style: { ...styles.drawer, height: sidebarHeight } }}
      >
        <List>
          {menuOptions.map((option) => (
            <ListItem button onClick={handleMenuClose} key={option.text}>
              <ListItemIcon>{option.icon}</ListItemIcon>
              <ListItemText primary={option.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Backdrop open={isMenuOpen} sx={{ zIndex: 1 }} onClick={handleMenuClose} />
    </Box>
  );
}
