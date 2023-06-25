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
import Image from '../assets/home.jpg'


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
        backgroundSize: 'cover'
    }
};

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color='transparent' elevation={0}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <ThemeProvider theme={theme}>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} align='center' fontSize={25}>
                CourseOwl
              </Typography>
              <Button color="inherit">Log In</Button>
          </ThemeProvider>
        </Toolbar>
      </AppBar>
      <Paper style={styles.paperContainer} sx={{height: "100vh"}}>
      </Paper>
    </Box>
  );
}