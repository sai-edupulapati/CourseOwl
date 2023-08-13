import React, { useState, useRef, useEffect } from 'react';
import { DayPilot, DayPilotCalendar } from "@daypilot/daypilot-lite-react";
import "./CalendarStyles.css";
import Papa from 'papaparse';
import moment from 'moment';

import { useApp } from './RealmApp';
import * as Realm from "realm-web";

import { useCollection } from "/Users/kushagragovil/Documents/GitHub/CourseOwl/mern/client/course-owl/src/hooks/useCollection.jsx";



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



  const [eventButtons, setEventButtons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);

  ////////////////////////////////////////////////////////////////////////////////////
  const [fetchedEvents, setFetchedEvents] = useState([]);
  ////////////////////////////////////////////////////////////////////////////////////


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
      F: "2023-10-06",
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

  ////////////////////////////////////////////////////////////////////////////////////

  const fetchEvents = async () => {
    try {
      if (!app.currentUser) {
        console.error('User not logged in.');
        return;
      }
  
      const currentUserId = app.currentUser.id;
  
      // Fetch events from the collection based on the current user's ID
      const response = await collection.find({ userId: currentUserId });
  
      // Set the fetched events in state
      setFetchedEvents(response);
      console.log("Fetched events:", response);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };
  
  useEffect(() => {
    console.log("Fetched events:", fetchedEvents);
  }, [fetchedEvents]);
  
  //////////////////////////////////////////////////////////////////////////////////////

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
        originButtonId: originButtonId,
      });
    });
  
    // Update the events state with the new event
    setEvents(prevEvents => [
      ...prevEvents,
      {
        start: start.format('YYYY-MM-DDTHH:mm:ss'),
        end: end.format('YYYY-MM-DDTHH:mm:ss'),
        id: DayPilot.guid(),
        text: event.text,
        durationBarWidth: "10000000px",
        originButtonId: originButtonId,
      }
    ]);
  };
  
  const handleEventDelete = async args => {

    const dp = calendarRef.current.control;
    const e = args.e;
    const originButtonId = e.data.originButtonId;

    console.log(dp.event)

    // Create a new array without events with matching originButtonId
    const updatedEvents = [];
    for (let i = 0; i < dp.events.list.length; i++) {
        const event = dp.events.list[i];
        if (event.originButtonId !== originButtonId) {
            console.log(event)
            updatedEvents.push(event);
        }
    }

    updatedEvents.push([])

    // Update the dp.events.list with the modified events list
    calendarRef.current.control.events.list = updatedEvents;

    console.log(calendarRef.current.control.events.list)

    // Update the state with the modified events list
    setEvents([calendarRef.current.control.events.list]);

};

const collection = useCollection({
  cluster: "mongodb-atlas", // The cluster name from your atlasConfig
  db: "Schedule_Data", // Replace with your actual database name
  collection: "User_Selections" // Replace with your actual collection name
});

const app = useApp(); 




const handleSubmitSchedule = async () => {
  try {
    
    // Assuming you have access to the Realm app instance via useApp() hook

    // Check if the user is logged in
    if (!app.currentUser) {
      console.error('User not logged in.');
      return;
    }

    // Get the current user's ID
    const currentUserId = app.currentUser.id;
    console.log(calendarRef.current.control.events.list)

    // Retrieve the event data from the calendar
    const eventData = calendarRef.current.control.events.list.map(event => {
      return {
        start: event.start,
        end: event.end,
        id: event.id,
        text: event.text,
        durationBarWidth: "10000000px",
        originButtonId: event.originButtonId,
      };
    });

    // Combine the user's ID with the event data
    const data = {
      userId: currentUserId,
      events: eventData,
      // Add other data fields here as needed
    };

    // Insert the data into the collection
    await collection.insertOne(data);

    console.log("Data inserted successfully!");
  } catch (error) {
    console.error("Error writing to MongoDB:", error);
  }
};


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
    onEventDelete: handleEventDelete,
    headerDateFormat: "dddd" // Set the format to display the day of the week
  });

  return (
    <div style={styles.wrap}>
      <div style={styles.main}>
        <h1>Schedule Builder</h1> {/* Added heading */}
        <DayPilotCalendar
          {...calendarConfig}
          ref={calendarRef}
          durationBarWidth={1590} // Adjust the width value as needed
          //events={events}
        />
        <button onClick={handleSubmitSchedule}>Submit Schedule</button> {/* New button */}
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

// events line is the problem. Make a button asking you have previous schedule saved. Ask if you want to use
// If yes, then fetch and update. If no, delete record in database and make new.

export default Calendar;