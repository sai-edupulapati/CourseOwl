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

const font = "'Belanosima', sans-serif"
const theme = createTheme({
    typography: {
        fontFamily: font,
        button: {textTransform: "none"}
    }
})

// npm install d3

let array = csv.split("\\n").map(function (line) {
    return line.split(",").splice(6,29);
});

export default function Grades() {

    const [query, setQuery] = useState("")
    const [courseData, setCourseData] = useState(Courses.slice(0, 10))
    const svgRef = useRef()


    useEffect(() => {
        const filterCourses = async () => {
            setCourseData(Courses.filter((course) => (course.Course.toLowerCase().includes(query.toLowerCase()))).splice(0,10))
        }
        filterCourses();
    }, [query])    

    useEffect(() => {
        courseData.forEach((course) => {
            const w = 300;
            const h = 300;
            const radius = w / 2;
            const svg = d3.select(svgRef.current).attr('width', w).attr('height', h).style('overflow', 'visible');
            const formattedData = d3.pie().value(d => d.A)(courseData);
            const arcGenerator = d3.arc().innerRadius(0).outerRadius(radius);
            const color = d3.scaleOrdinal().range(d3.schemeSet1);
            svg.selectAll().data(formattedData).join('path').attr('d', arcGenerator).attr('fill', d => color(d.value)).style('opacity', 0.7)
        })
    }, [courseData])

    return (
        <Box sx={{ flexGrow: 1 }} bgcolor={'rgb(219, 227, 236)'} minHeight={'100vh'}>
            <NavBar></NavBar>
            <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '60px' }}>
                <ThemeProvider theme={theme}>
                    <Stack width={'70vw'} sx={{display: 'flex', alignItems: 'center'}} spacing={5}>
                        <TextField label="Enter Course" variant="standard" fullWidth onChange={(e) => (setQuery(e.target.value))}/>
                        <ul style={{listStyleType: 'none'}}>
                            {courseData.map((course) => (
                                <li style={{ paddingBottom: '2vh' }}>      <Accordion sx={{ width: '80vw' }} elevation={3}>
                                <AccordionSummary sx={{ backgroundColor: 'rgb(219, 227, 236)' }}
                                  expandIcon={<ExpandMoreIcon />}
                                  aria-controls="panel1a-content"
                                  id="panel1a-header"
                                >
                                  <Typography>{course.Course}: {course.Title}</Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{ backgroundColor: 'rgb(219, 227, 236)' }}>
                                  <Typography>
                                    Instructor: {course.Instructor}
                                    <svg ref={svgRef}></svg>
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