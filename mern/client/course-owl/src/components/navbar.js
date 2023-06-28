import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Backdrop, createTheme } from '@mui/material';
import { ThemeContext, ThemeProvider } from '@emotion/react';
import Image from '../assets/home51.jpg';
import logo from '../assets/owl.png';
import Stack from '@mui/material/Stack';

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
};

export default function NavBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <img style={styles.icon} src={logo} alt="logo"></img>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2, justifyContent: 'left' }}
          onClick={handleClick}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          MenuListProps={{ 'aria-labelledby': 'basic-button' }}
        >
          <MenuItem onClick={handleClose}>Menu Item 1</MenuItem>
          <MenuItem onClick={handleClose}>Menu Item 2</MenuItem>
          <MenuItem onClick={handleClose}>Menu Item 3</MenuItem>
        </Menu>
        <ThemeProvider theme={theme}>
          <Typography component="div" sx={{ flexGrow: 1 }} fontSize={30} fontWeight={'bold'}>
            CourseOwl
          </Typography>
          <button className="button-54">Log In</button>
        </ThemeProvider>
      </Toolbar>
      <Backdrop open={Boolean(anchorEl)} sx={{ zIndex: 1 }}>
        {/* Your blurred background content goes here */}
      </Backdrop>
    </AppBar>
  );
}
