import React, { useState } from 'react';
import {
  Typography,
  Container,
  Grid,
  Paper,
  createTheme,
  ThemeProvider,
} from '@mui/material';

// Set your font and color scheme
const font = "'Belanosima', sans-serif";
const theme = createTheme({
  typography: {
    fontFamily: font,
    button: { textTransform: 'none' },
  },
  palette: {
    primary: {
      main: '#YourPrimaryColor',
    },
    secondary: {
      main: '#YourSecondaryColor',
    },
  },
});

const CalendarPage = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Define your course data with days, timings, and course names
  const courses = [
    { day: 'Monday', time: '10:00 AM - 12:00 PM', name: 'Course A' },
    { day: 'Tuesday', time: '2:00 PM - 4:00 PM', name: 'Course B' },
    { day: 'Wednesday', time: '9:00 AM - 11:00 AM', name: 'Course C' },
    // Add more courses here
  ];

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <Typography component="h1" variant="h4" align="center">
          Weekly Calendar
        </Typography>
        <Grid container spacing={2} marginTop={3}>
          {/* Render the calendar grid */}
          <Grid item xs={12}>
            <Paper>
              {/* Render each day and time slot */}
              <Grid container>
                <Grid item xs={2} />
                <Grid item xs={10} container spacing={2}>
                  <Grid item xs={2}>
                    <Typography variant="subtitle1">Time</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant="subtitle1">Monday</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant="subtitle1">Tuesday</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant="subtitle1">Wednesday</Typography>
                  </Grid>
                  {/* Add more days here */}
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          {/* Render the course selection */}
          <Grid item xs={12}>
            <Paper>
              <Typography component="h2" variant="h6" align="center">
                Course Selection
              </Typography>
              <Grid container spacing={2} padding={2}>
                {/* Render each course */}
                {courses.map((course, index) => (
                  <Grid item xs={3} key={index}>
                    <Paper
                      elevation={selectedCourse === course ? 3 : 0}
                      onClick={() => handleCourseSelect(course)}
                      sx={{
                        padding: '8px',
                        cursor: 'pointer',
                        backgroundColor:
                          selectedCourse === course
                            ? theme.palette.primary.main
                            : 'transparent',
                      }}
                    >
                      <Typography
                        variant="body1"
                        align="center"
                        color={
                          selectedCourse === course
                            ? 'white'
                            : 'textPrimary'
                        }
                      >
                        {course.name}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
          {/* Render the selected course */}
          {selectedCourse && (
            <Grid item xs={12}>
              <Paper>
                <Typography component="h3" variant="subtitle1" align="center">
                  Selected Course: {selectedCourse.name}
                </Typography>
                <Typography variant="body1" align="center">
                  Day: {selectedCourse.day}
                </Typography>
                <Typography variant="body1" align="center">
                  Time: {selectedCourse.time}
                </Typography>
              </Paper>
            </Grid>
          )}
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default CalendarPage;
