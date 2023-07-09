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

const font = "'Belanosima', sans-serif"
const theme = createTheme({
    typography: {
        fontFamily: font,
        button: {textTransform: "none"}
    }
})

// npm install d3

let array = csv.split("\n")
let array2 = []
let array3 = []

array.forEach(function(line) {
    array2.push(line.split(",").slice(7,30).map(Number))
    array3.push(line.split(","))
})

const attributeIndex = 31
const groupedData = array3.reduce((groups, item) => {
    const attribute = item[attributeIndex];
    
    if (!groups[attribute]) {
      groups[attribute] = [];
    }
    
    groups[attribute].push(item);
    
    return groups;
  }, {});

console.log(groupedData)

export default function Grades() {

    const [query, setQuery] = useState("")
    const [courseData, setCourseData] = useState(Courses.slice(0, 10))
    const svgRef = useRef()


    useEffect(() => {
        const filterCourses = async () => {
            setCourseData(Courses.filter((course) => (course.Course.toLowerCase().includes(query.toLowerCase()))).slice(0,10))
        }
        filterCourses();
    }, [query])    

    useEffect(() => {

        courseData.forEach((course) => {
            const courseIndex = parseInt(course.Index)
           
            var data = array2[courseIndex]
            
            var count = 0
            var count2 = 0

            data.forEach((item) => {
                if (item > 0) {
                    count += 1
                }
            })

            var svg = d3.select("#svg" + course.Index)

            let g = svg.append("g").attr("transform", "translate(150, 120)")

            var pie = d3.pie()

            var arc = d3.arc().innerRadius(0).outerRadius(100)

            var arcs = g.selectAll("arc").data(pie(data)).enter().append("g")

            arcs.append("path").attr("fill", (data, i) => {
                let value = data.data
                if(value == 0) {
                    return
                }
                let ind = Math.round((count2 / count) * schemeset.length)
                count2 += 1
                return schemeset[ind];
            }).attr("d", arc)

        })
    }, [courseData])

    useEffect(() => {
        courseData.forEach((course) => {
            
        })
    })

    return (
        <Box sx={{ flexGrow: 1 }} bgcolor={'rgb(219, 227, 236)'} minHeight={'100vh'}>
            <NavBar></NavBar>
            <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '60px' }}>
                <ThemeProvider theme={theme}>
                    <Stack width={'70vw'} sx={{display: 'flex', alignItems: 'center'}} spacing={5}>
                        <TextField label="Enter Course" variant="standard" fullWidth onChange={(e) => (setQuery(e.target.value))}/>
                        <ul style={{listStyleType: 'none'}}>
                            {courseData.map((course) => (
                                <li style={{ paddingBottom: '2vh' }} key={course.Index}>
                                    <Stack width={"70vw"}>
                                        <Accordion sx={{ bgcolor: "rgb(0, 174, 196, 0.2)" }} className='button-54'>
                                            <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                            >
                                                <Typography>{course.Course}: {course.Title}</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography>
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                                                </Typography>
                                                <svg width={"300"} height={"300"} id={"svg" + course.Index}></svg>
                                            </AccordionDetails>
                                        </Accordion>
                                    </Stack>
                                </li>
                            ))}
                        </ul>
                    </Stack>
                </ThemeProvider>
            </Container>
        </Box>
    )
}