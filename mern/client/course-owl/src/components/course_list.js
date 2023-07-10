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


const data = [
    { category: 'A', value1: 10, value2: 15, value3: 20 },
    { category: 'B', value1: 5, value2: 8, value3: 12 },
    { category: 'C', value1: 12, value2: 6, value3: 18 },
    { category: 'D', value1: 8, value2: 10, value3: 16 }
];

let array = csv.split("\n")
let array2 = []
let array3 = []
let distinctCourses = []

array.forEach(function(line) {
    array2.push(line.split(",").slice(7,30).map(Number))
    array3.push(line.split(","))
    if (!distinctCourses.includes(line.split(",").slice(-1)[0])) {
        distinctCourses.push(line.split(",").slice(-1)[0])
    }
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
const groupedData2 = Object.entries(groupedData).slice(1)

const groupedData3 = []
groupedData2.forEach(function(courseInfo) {
    const newArray = {
        course: courseInfo[0],
        data: courseInfo[1]
    }
    groupedData3.push(newArray)
})

groupedData3.forEach(function(courseInfo) {
    const newdatafull = []
    courseInfo.data.forEach(function(dataPoint) {
        const newdata = []
        dataPoint.forEach(function(info) {
            const parsedItem = parseFloat(info)
            if (isNaN(parsedItem)) {
                newdata.push(info)
            } else {
                newdata.push(parsedItem)
            }
        })
        newdatafull.push(newdata)
    })
    courseInfo.data = newdatafull
})
console.log(groupedData3)


export default function CourseList() {

    const [query, setQuery] = useState("")
    const [courseData, setCourseData] = useState(groupedData3.slice(0, 10))
    const svgRef = useRef()

    useEffect(() => {
        const filterCourses = async () => {
            setCourseData(groupedData3.filter((courseInfo) => (courseInfo.course.toLowerCase().includes(query.toLowerCase()))).slice(0,10))
        }
        filterCourses();
    }, [query])  

    // useEffect(() => {

    //     courseData.forEach((course) => {
    //         const courseIndex = parseInt(course.Index)
           
    //         var data = array2[courseIndex]
            
    //         var count = 0
    //         var count2 = 0

    //         data.forEach((item) => {
    //             if (item > 0) {
    //                 count += 1
    //             }
    //         })

    //         var svg = d3.select("#svg" + course.Index)

    //         let g = svg.append("g").attr("transform", "translate(150, 120)")

    //         var pie = d3.pie()

    //         var arc = d3.arc().innerRadius(0).outerRadius(100)

    //         var arcs = g.selectAll("arc").data(pie(data)).enter().append("g")

    //         arcs.append("path").attr("fill", (data, i) => {
    //             let value = data.data
    //             if(value == 0) {
    //                 return
    //             }
    //             let ind = Math.round((count2 / count) * schemeset.length)
    //             count2 += 1
    //             return schemeset[ind];
    //         }).attr("d", arc)

    //     })
    // }, [courseData])

    return (
        <Box>
            <TextField sx={{ width: '70vw'}} label="Enter Course" variant="standard" fullWidth onChange={(e) => (setQuery(e.target.value))}/>
            <ul style={{listStyleType: 'none'}}>
                {courseData.map((courseInfo) => ((
                    <li style={{ paddingBottom: '2vh' }}>
                        <Stack width={"70vw"}>
                            <Accordion sx={{ bgcolor: "rgb(0, 174, 196, 0.2)" }} className='button-54'>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography>{courseInfo.course}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                        malesuada lacus ex, sit amet blandit leo lobortis eget.
                                    </Typography>
                                    <svg width={"300"} height={"300"} id={"svg"}></svg>
                                    <StackedBarChart data={data}></StackedBarChart>
                                </AccordionDetails>
                            </Accordion>
                        </Stack>
                    </li>
                )))}
            </ul>
        </Box>
    )
}