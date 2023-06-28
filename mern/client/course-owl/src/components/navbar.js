import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Paper, createTheme } from '@mui/material';
import { ThemeContext, ThemeProvider } from '@emotion/react';
import Image from '../assets/home51.jpg'
import logo from '../assets/owl.png'
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import schedule from '../assets/chat2.png'
import grades from '../assets/like3.png'
import chat from '../assets/like4.png'
import review from '../assets/like2.png'
import ControlledAccordions from './faq_dropdown';
import github from '../assets/github.png'
import linkedin from '../assets/in.png'

const font = "'Belanosima', sans-serif"
const theme = createTheme({
    typography: {
        fontFamily: font,
        button: {textTransform: "none"}
    }
})

const styles = {
    paperContainer: {
        background: `url(${Image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    },
    icon: {
      margin: 'auto',
      width: '35px',
      top: '30px',
      left: '0',
      right: '0',
      position: 'absolute'
    },
    features: {
      width: '10vw'
    }
};

export default function NavBar() {
    return (
        <AppBar position="static" color='transparent' elevation={0}>
        <img style={styles.icon} src={logo} alt='logo'></img>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, justifyContent: 'left' }}
          >
            <MenuIcon />
          </IconButton>
          <ThemeProvider theme={theme}>
              <Typography component="div" sx={{ flexGrow: 1 }} fontSize={30} fontWeight={'bold'}>
                CourseOwl
              </Typography>
              <button className='button-54'>Log In</button>
          </ThemeProvider>
        </Toolbar>
      </AppBar>
    )
}
