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
//import { Courses } from '../assets/grades';
import { Courses } from '../assets/grades';
import { useState } from 'react';
export default function Grades() {

    const [query, setQuery] = useState("")

    return (
        <Box sx={{ flexGrow: 1 }}>
            <input placeholder='Enter Course' onChange={(e) => (setQuery(e.target.value))}></input>
            <ul>
                {Courses.filter((course) => (course.Course.toLowerCase().includes(query.toLowerCase()))).map((course) => (
                    <li>{course.Course}</li>
                ))}
            </ul>
        </Box>
    )
}