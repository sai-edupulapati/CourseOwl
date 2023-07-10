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
import { csv } from '../assets/grades';
import { useState, useEffect, useRef } from 'react';
import Accordion from '@mui/material/Accordion/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import AccordionDetails from '@mui/material/AccordionDetails/AccordionDetails';
import * as d3 from 'd3'
import { schemeset } from '../assets/grades';
import StackedBarChart from './bar_chart';
import CourseList from './course_list';

const font = "'Belanosima', sans-serif"
const theme = createTheme({
    typography: {
        fontFamily: font,
        button: {textTransform: "none"}
    }
})

// npm install d3

export default function Grades() {      

    return (
        <Box sx={{ flexGrow: 1 }} bgcolor={'rgb(219, 227, 236)'} minHeight={'100vh'}>
            <NavBar></NavBar>
            <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '60px' }}>
                <ThemeProvider theme={theme}>
                    <Stack width={'70vw'} sx={{display: 'flex', alignItems: 'center'}} spacing={5}>
                        <CourseList></CourseList>
                    </Stack>
                </ThemeProvider>
            </Container>
        </Box>
    )
}