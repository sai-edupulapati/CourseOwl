import React, { useState, useRef } from 'react';
import { DayPilot, DayPilotCalendar } from "@daypilot/daypilot-lite-react";
import "./CalendarStyles.css";
import Papa from 'papaparse';
import moment from 'moment';

const styles = {
  wrap: {
    display: "flex"
  },
  main: {
    flexGrow: "1"
  },
  eventList: {
    flex: "0 0 200px",
    padding: "10px",
    height: "400px", // Set a fixed height
    overflow: "auto" // Enable scrolling
  },
  eventButton: {
    display: "block",
    width: "100%",
    marginBottom: "5px"
  }
};

const Calendar = () => {
  const calendarRef = useRef();

  const [calendarConfig, setCalendarConfig] = useState({
    viewType: "Week",
    startDate: "2023-10-02",
    durationBarVisible: true, // Show the duration bar
    cellDuration: 5, // Set the cell duration to 5 minutes
    timeRangeSelectedHandling: "Enabled",
    durationBarWidth: 1000,
    onTimeRangeSelected: async args => {
      const dp = calendarRef.current.control;
      const modal = await DayPilot.Modal.prompt("Create a new event:", "Event 1");
      dp.clearSelection();
      if (!modal.result) { return; }
      dp.events.add({
        start: args.start,
        end: args.end,
        id: DayPilot.guid(),
        text: modal.result,
        durationBarWidth: 1000
      });
    },
    eventDeleteHandling: "Update",
    onEventClick: async args => {
      const dp = calendarRef.current.control;
      const modal = await DayPilot.Modal.prompt("Update event text:", args.e.text());
      if (!modal.result) { return; }
      const e = args.e;
      e.data.text = modal.result;
      dp.events.update(e);
    },
    headerDateFormat: "dddd" // Set the format to display the day of the week
  });

  const [eventButtons, setEventButtons] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = async () => {
    const filePaths = [
      "/events.csv", // Assuming the file is in the public directory
      "/eventsCS.csv"
    ];
  
    setLoading(true);
  
    const dayOfWeekToDateString = {
      M: "2023-10-02",
      T: "2023-10-03",
      W: "2023-10-04",
      Th: "2023-10-05",
      F: "2023-10-05",
    };
  
    const promises = filePaths.map(filePath => {
      return fetch(filePath)
        .then(response => response.text())
        .then(csvData => {
          return new Promise((resolve, reject) => {
            Papa.parse(csvData, {
              header: true,
              complete: (results) => resolve(results.data),
              error: reject
            });
          });
        });
    });
  
    try {
      const results = await Promise.all(promises);
      const parsedEvents = results.flat().map(row => {
        const name = row['Name'];


        const daysOfWeekString = row['Day Of Week'];

        // Split the days of the week by 2 characters at a time and account for 'Th'
        const daysOfWeek = [];
        for (let i = 0; i < daysOfWeekString.length; i += 2) {
          if (daysOfWeekString[i + 1] === 'h') {
            daysOfWeek.push(daysOfWeekString.substr(i, 2));
          } else {
            daysOfWeek.push(daysOfWeekString[i]);
            i--;
          }
        }
        console.log(daysOfWeek);


        const startTime = row['Published Start'];
        const endTime = row['Published End'];
  
        // Create a single event object for all days of the week
        return {
          text: name,
          daysOfWeek,
          start: startTime,
          end: endTime,
          id: DayPilot.guid(),
          durationBarWidth: 1000,
        };
      });
  
      setEventButtons(
        parsedEvents.map(event => (
          <button
            key={event.id}
            style={styles.eventButton}
            onClick={() => handleEventButtonClick(event)}
          >
            {event.text}
          </button>
        ))
      );
  
      setLoading(false);
    } catch (error) {
      console.error("Error loading events:", error);
      setLoading(false);
    }
  };
  

  const handleEventButtonClick = event => {
    const dp = calendarRef.current.control;
    const start = moment(event.start, 'h:mma');
    const end = moment(event.end, 'h:mma');

    // Define the local mapping for days of the week
    const dayOfWeekToDateString = {
      M: "2023-10-02",
      T: "2023-10-03",
      W: "2023-10-04",
      Th: "2023-10-05",
      F: "2023-10-06",
    };

    // Get the days of the week from the event data
    const daysOfWeek = event.daysOfWeek;

    // Generate a unique ID for the origin button
    const originButtonId = DayPilot.guid();

    // Iterate through each day of the week and add the event to the calendar
    daysOfWeek.forEach(dayOfWeek => {
      const date = dayOfWeekToDateString[dayOfWeek];
      const dayStart = moment(`${date} ${start.format('HH:mm')}`, 'YYYY-MM-DD HH:mm');
      const dayEnd = moment(`${date} ${end.format('HH:mm')}`, 'YYYY-MM-DD HH:mm');

      dp.events.add({
        start: dayStart.format('YYYY-MM-DDTHH:mm:ss'),
        end: dayEnd.format('YYYY-MM-DDTHH:mm:ss'),
        id: DayPilot.guid(),
        text: event.text,
        durationBarWidth: "10000000px",
        originButtonId: originButtonId, // Add the ID of the origin button to the event data
      });
    });
  };

  const handleEventDelete = async args => {
    const dp = calendarRef.current.control;
    const e = args.e;
    const originButtonId = e.data.originButtonId;

    // Find all events with the same origin button ID and remove them
    dp.events.all().forEach(event => {
      if (event.data.originButtonId === originButtonId) {
        dp.events.remove(event);
      }
    });
  };

  return (
    <div style={styles.wrap}>
      <div style={styles.main}>
        <h1>Schedule Builder</h1> {/* Added heading */}
        <DayPilotCalendar
          {...calendarConfig}
          ref={calendarRef}
          durationBarWidth={1590} // Adjust the width value as needed
        />
      </div>
      <div style={styles.eventList}>
        <button onClick={handleFileChange}>Load CSV</button>
        {loading ? (
          <p>Loading events...</p>
        ) : (
          eventButtons.length > 0 ? (
            eventButtons
          ) : (
            <p>No events loaded.</p>
          )
        )}
      </div>
    </div>
  );
};

export default Calendar;

