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
import NavBar from './navbar'
import NavB from './scheduler'

import { useApp } from './RealmApp';
import * as Realm from "realm-web";

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

export default function ButtonAppBar() {
  const app = useApp();
  if (app.currentUser) {
    console.log(app.currentUser.id);
  } else {
    console.log("No user");
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Paper style={styles.paperContainer} sx={{height: "90vh", paddingTop: "15px"}} elevation={0}>
      <NavBar></NavBar>
      <Box paddingTop={'13vh'}>
      <ThemeProvider theme={theme}>
        <Container maxWidth={'sm'}>
        <Stack spacing={6}>
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
      
      <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '60px' }}>
        <button className='button-54' onClick={() => {window.location.href = '/scheduler'}}>Learn More</button>
      </Container>
      
      </Paper>
      {/* <Paper sx={{ height: '100vh' }}> */}
        <Stack paddingTop={'10vh'} spacing={'8vh'} display={'flex'} alignItems={'center'} justifyContent={'center'} paddingBottom={'10vh'}>
          <ThemeProvider theme={theme}>
            <Typography component="div" sx={{ flexGrow: 1}} align='center' fontSize={55} fontWeight={'bold'}>
              Grades? We've got you covered...
            </Typography>
          </ThemeProvider>
          <Stack direction={'row'} spacing={'5vw'} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '30px' }}>
            <Stack display={'flex'} alignItems={'center'} justifyContent={'center'} spacing={'10vh'}>
              <img src={review} alt='review' style={styles.features}></img>
              <ThemeProvider theme={theme}>
                <Stack display={'flex'} alignItems={'center'} justifyContent={'center'} spacing={'0.5vh'} width={'10vw'}>
                  <Typography component="div" sx={{ flexGrow: 1}} align='center' fontSize={30} fontWeight={'bold'}>
                    Review Professors
                  </Typography>
                  <Typography component="div" sx={{ flexGrow: 1}} align='center' fontSize={15}>
                    See what others have said about your future professors, and provide us with your own feedback!
                  </Typography>
                </Stack>
              </ThemeProvider>
            </Stack>
            <Stack display={'flex'} alignItems={'center'} justifyContent={'center'} spacing={'10vh'}>
              <img src={chat} alt='chat' style={styles.features}></img>           
              <ThemeProvider theme={theme}>
                <Stack display={'flex'} alignItems={'center'} justifyContent={'center'} spacing={'0.5vh'} width={'10vw'}>
                  <Typography component="div" sx={{ flexGrow: 1}} align='center' fontSize={30} fontWeight={'bold'}>
                    Connect With Peers
                  </Typography>
                  <Typography component="div" sx={{ flexGrow: 1}} align='center' fontSize={15}>
                    CourseOwl has open chat rooms for every course being offered this current semester,
                    sorted based on department.
                  </Typography>
                </Stack>
              </ThemeProvider>
            </Stack>
            <Stack display={'flex'} alignItems={'center'} justifyContent={'center'} spacing={'10vh'}>
              <img src={grades} alt='grades' style={styles.features}></img>
              <ThemeProvider theme={theme}>
                <Stack display={'flex'} alignItems={'center'} justifyContent={'center'} spacing={'0.5vh'} width={'10vw'}>
                  <Typography component="div" sx={{ flexGrow: 1}} align='center' fontSize={30} fontWeight={'bold'}>
                    View Past Grades
                  </Typography>
                  <Typography component="div" sx={{ flexGrow: 1}} align='center' fontSize={15}>
                    Check how the final grade distributions have been historically for the classes you want to take in the future.
                  </Typography>
                </Stack>
              </ThemeProvider>
            </Stack>
            <Stack display={'flex'} alignItems={'center'} justifyContent={'center'} spacing={'10vh'}>
              <img src={schedule} alt='schedule' style={styles.features}></img>           
              <ThemeProvider theme={theme}>
                <Stack display={'flex'} alignItems={'center'} justifyContent={'center'} spacing={'0.5vh'} width={'10vw'}>
                  <Typography component="div" sx={{ flexGrow: 1}} align='center' fontSize={30} fontWeight={'bold'}>
                    Build Your Schedule
                  </Typography>
                  <Typography component="div" sx={{ flexGrow: 1}} align='center' fontSize={15}>
                    Add classes you plan on taking this semester, and track classes based on availability of seats.
                  </Typography>
                </Stack>
              </ThemeProvider>
            </Stack>
            
          </Stack>
          <button className='button-54'>Join Us</button>
        </Stack>
        <Stack className='faq' paddingTop={'10vh'} spacing={2} display={'flex'} alignItems={'center'} paddingBottom={'10vh'}>
          <Stack display={'flex'} alignItems={'center'} justifyContent={'center'} spacing={'5vh'}>
            <ThemeProvider theme={theme}>
              <Typography component="div" sx={{ flexGrow: 1}} align='center' fontSize={55} fontWeight={'bold'}>
                More About CourseOwl
              </Typography>
              <Container>
                <ControlledAccordions></ControlledAccordions>
              </Container>
            </ThemeProvider>
          </Stack>
        </Stack>

        <Container>
          <ThemeProvider theme={theme}>
            <Typography component="div" sx={{ flexGrow: 1}} align='center' fontSize={27} fontWeight={'bold'} paddingTop={'5vh'}>
              CourseOwl
            </Typography>
            <Typography component="div" sx={{ flexGrow: 1}} align='center' fontSize={13} fontWeight={'bold'} paddingTop={'5px'}>
              Made by Purdue Students
            </Typography>
            <Typography component="div" sx={{ flexGrow: 1}} align='left' fontWeight={'bold'} fontSize={22} paddingTop={'1vh'}>
              Contact Us
            </Typography>
            <Stack direction={'row'} alignItems={'center'}>
              <Typography component="div" sx={{ flexGrow: 1}} align='left' fontSize={18} paddingTop={'1vh'}>
                Sai Edupulapati
              </Typography>
              <Typography component="div" sx={{ flexGrow: 1}} align='right' fontSize={18} paddingTop={'1vh'}>
                vedupula@purdue.edu
              </Typography>
              <img src={github} alt='github' width={'20'}></img>
              <img src={linkedin} alt='link' width={'20'}></img>
            </Stack>
            <Stack direction={'row'} alignItems={'center'}>
              <Typography component="div" sx={{ flexGrow: 1}} align='left' fontSize={18} paddingTop={'1vh'}>
                Kushagra Govil
              </Typography>
              <Typography component="div" sx={{ flexGrow: 1}} align='right' fontSize={18} paddingTop={'1vh'}>
                kgovil@purdue.edu
              </Typography>
              <img src={github} alt='github' width={'20'} height={'20'}></img>
              <img src={linkedin} alt='link' width={'20'} height={'20'}></img>
            </Stack>
            <Stack direction={'row'} paddingBottom={'5vh'} alignItems={'center'}>
              <Typography component="div" sx={{ flexGrow: 1}} align='left' fontSize={18} paddingTop={'1vh'}>
                Jay Mehta
              </Typography>
              <Typography component="div" sx={{ flexGrow: 1}} align='right' fontSize={18} paddingTop={'1vh'}>
                mehta208@purdue.edu
              </Typography>
              <img src={github} alt='github' width={'20'} height={'20'}></img>
              <img src={linkedin} alt='link' width={'20'} height={'20'}></img>
            </Stack>
          </ThemeProvider>
        </Container>

        {/* <Stack height={'30vh'} spacing={2} display={'flex'} alignItems={'center'} paddingTop={'5vh'}>
          <Stack alignItems={'center'} display={'flex'}>
          <ThemeProvider theme={theme}>
            <Typography component="div" sx={{ flexGrow: 1}} align='center' fontSize={23} fontWeight={'bold'}>
                CourseOwl
            </Typography>
          </ThemeProvider>
          </Stack>
        </Stack> */}
    </Box>
  );
}
