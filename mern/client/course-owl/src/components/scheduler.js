import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const theme = createTheme({
  typography: {
    fontFamily: "'Belanosima', sans-serif",
  },
});

const CalendarPage = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const timeSlots = Array.from({ length: 28 }, (_, index) => {
    const hour = Math.floor(index / 2) + 6;
    const minutes = index % 2 === 0 ? '00' : '30';
    return `${hour}:${minutes}`;
  });

  const [selectedCourses, setSelectedCourses] = useState([]);

  const handleCourseClick = (course) => {
    setSelectedCourses((prevCourses) => [...prevCourses, course]);
  };

  const isCourseSelected = (course) => {
    return selectedCourses.some((selectedCourse) => selectedCourse.name === course.name);
  };

  const renderCourseOptions = () => {
    const courseOptions = [
      { name: 'Course A', day: 'Monday', startTime: '7:00', endTime: '8:00' },
      { name: 'Course B', day: 'Tuesday', startTime: '9:30', endTime: '11:00' },
      { name: 'Course C', day: 'Wednesday', startTime: '14:00', endTime: '16:00' },
      // Add more course options as needed
    ];

    return courseOptions.map((course) => (
      <Box
        key={course.name}
        onClick={() => handleCourseClick(course)}
        style={{ cursor: 'pointer' }}
        bgcolor={isCourseSelected(course) ? '#aaffaa' : 'inherit'}
        padding="8px"
        marginBottom="8px"
      >
        <Typography variant="body1" align="center" fontWeight="bold">
          {course.name}
        </Typography>
        <Typography variant="body2" align="center">
          {`${course.startTime} - ${course.endTime}`}
        </Typography>
      </Box>
    ));
  };

  const renderCalendarItems = () => {
    return days.map((day) => (
      <Box
        key={day}
        flex="1"
        border="1px solid #ccc"
        padding="8px"
        className="calendar-item"
        data-day={day}
      >
        <Typography variant="h6" align="center" fontWeight="bold">
          {day}
        </Typography>
        {timeSlots.map((time) => {
          const course = selectedCourses.find(
            (selectedCourse) => selectedCourse.day === day && selectedCourse.startTime === time
          );
          if (course) {
            const endTimeSlot = timeSlots[timeSlots.indexOf(time) + 1];
            return (
              <Box
                key={`${day}-${time}`}
                bgcolor="#aaffaa"
                padding="2px"
                marginBottom="2px"
              >
                <Typography variant="body2" align="center">
                  {`${time} - ${endTimeSlot}`}
                </Typography>
                <Typography variant="body2" align="center" fontWeight="bold">
                  {course.name}
                </Typography>
              </Box>
            );
          }
          return null;
        })}
      </Box>
    ));
  };

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Typography variant="h4" align="center" fontWeight="bold">
          Weekly Calendar
        </Typography>
        <Box display="flex">
          <Box minWidth="100px" padding="8px">
            <Typography variant="h6" align="center" fontWeight="bold">
              Time
            </Typography>
            {timeSlots.map((time) => (
              <Typography key={time} variant="body2" align="center">
                {time}
              </Typography>
            ))}
          </Box>
          {renderCalendarItems()}
        </Box>
        <Box>
          <Typography variant="h6" align="center" fontWeight="bold">
            Course Options
          </Typography>
          {renderCourseOptions()}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default CalendarPage;
