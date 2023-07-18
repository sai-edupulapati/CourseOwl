import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Backdrop, createTheme, Button } from '@mui/material';
import { ThemeContext, ThemeProvider } from '@emotion/react';
import Image from '../assets/home51.jpg';
import logo from '../assets/owl.png';
import Stack from '@mui/material/Stack';
import { useApp } from './RealmApp';
import { useState, useEffect } from 'react';

const font = "'Belanosima', sans-serif";
const theme = createTheme({
  typography: {
    fontFamily: font,
    button: { textTransform: 'none' },
  },
});

// updated to have log in button

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
  const app = useApp()

  const [buttonText, setButtonText] = useState("Log In")

  useEffect(() => {
    if (app.currentUser.id != "") {
      console.log(app.currentUser.id)
      setButtonText("Log Out")
    } else {
      setButtonText("Log In")
    }
  }, [])  

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const boxStyle = {
    paddingLeft: '20px',
    paddingRight: '10px'
  };

  const handleSubmit = async () => {
    if (app.currentUser.id != "") {
      await app.logOut()
      window.location.href("/")
    } else {
      window.location.href("/login")
    }
  }

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <img style={styles.icon} src={logo} alt="logo"></img>
      <Toolbar>
        <ThemeProvider theme={theme}>
          <Typography component="div" sx={{ flexGrow: 1 }} fontSize={30} fontWeight={'bold'}>
            CourseOwl
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Stack direction="row" spacing={2}>
            <Button
              color="inherit"
              aria-haspopup="true"
              onClick={handleClick}
              sx={{ pl: 2, pr: 2 }}
            >
              Menu Item 1
            </Button>
            <Button
              color="inherit"
              aria-haspopup="true"
              onClick={handleClick}
              sx={{ pl: 2, pr: 2 }}
            >
              Menu Item 2
            </Button>
            <Button
              color="inherit"
              aria-haspopup="true"
              onClick={handleClick}
              sx={{ pl: 2, pr: 2 }}
            >
              Menu Item 3
            </Button>
          </Stack>
          <div style={boxStyle}>
          {/* Added a box to properly pad */}
          </div>
          <button className='button-54' onClick={handleSubmit}>{buttonText}</button>
        </ThemeProvider>
      </Toolbar>
      <Backdrop open={Boolean(anchorEl)} sx={{ zIndex: 1 }}>
        {/* Your blurred background content goes here */}
      </Backdrop>
    </AppBar>
  );
}