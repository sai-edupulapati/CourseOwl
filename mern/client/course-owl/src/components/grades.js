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
import NavBar from './navbar';
import TextField from '@mui/material/TextField/TextField';
//import { Courses } from '../assets/grades';
import { Courses } from '../assets/grades';
import { useState } from 'react';
import Accordion from '@mui/material/Accordion/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import AccordionDetails from '@mui/material/AccordionDetails/AccordionDetails';

const font = "'Belanosima', sans-serif"
const theme = createTheme({
    typography: {
        fontFamily: font,
        button: {textTransform: "none"}
    }
})


export default function Grades() {

    const [query, setQuery] = useState("")

    return (
        <Box sx={{ flexGrow: 1 }}>
            <NavBar></NavBar>
            <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '60px' }}>
                <ThemeProvider theme={theme}>
                    <Stack width={'70vw'} sx={{display: 'flex', alignItems: 'center'}} spacing={5}>
                        <TextField label="Enter Course" variant="standard" fullWidth onChange={(e) => (setQuery(e.target.value))}/>
                        <ul style={{listStyleType: 'none'}}>
                            {Courses.filter((course) => (course.Course.toLowerCase().includes(query.toLowerCase()))).map((course) => (
                                // <li>{course.Course}</li>
                                <li style={{ paddingBottom: '2vh' }}>      <Accordion sx={{ width: '80vw' }}>
                                <AccordionSummary
                                  expandIcon={<ExpandMoreIcon />}
                                  aria-controls="panel1a-content"
                                  id="panel1a-header"
                                >
                                  <Typography>{course.Course}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <Typography>
                                    This should be filled with course information.
                                  </Typography>
                                </AccordionDetails>
                              </Accordion></li>
                            ))}
                        </ul>
                    </Stack>
                </ThemeProvider>
            </Container>
            {/* <input placeholder='Enter Course' onChange={(e) => (setQuery(e.target.value))}></input>
            <ul>
                {Courses.filter((course) => (course.Course.toLowerCase().includes(query.toLowerCase()))).map((course) => (
                    <li>{course.Course}</li>
                ))}
            </ul> */}
        </Box>
    )
}