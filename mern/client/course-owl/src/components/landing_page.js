import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Paper, createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import Image from '../assets/home51.jpg'
import logo from '../assets/owl.png'
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';

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
//      display: 'block',
      margin: 'auto',
      width: '35px',
      top: '30px',
      left: '0',
      right: '0',
//      bottom: '0',
      position: 'absolute'
    }
};

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Paper style={styles.paperContainer} sx={{height: "100vh", paddingTop: "15px"}} elevation={0}>
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
              <Button color="inherit">Log In</Button>
          </ThemeProvider>
        </Toolbar>
      </AppBar>
      <Box paddingTop={'10vh'}>
      <ThemeProvider theme={theme}>
        <Container maxWidth={'sm'}>
        <Stack spacing={2}>
          <Typography component="div" sx={{ flexGrow: 1}} align='center' fontSize={55} fontWeight={'bold'}>
            Welcome, Students!
          </Typography>
          <Typography component="div" sx={{ flexGrow: 1}} align='center' fontSize={25}>
          Meet CourseOwl, a singular place for you to view professor reviews, build perfect schedules, connect with your peers, and plan your future!
          </Typography>
        </Stack>
        </Container>
      </ThemeProvider>
      </Box>
      </Paper>
    </Box>
  );
}