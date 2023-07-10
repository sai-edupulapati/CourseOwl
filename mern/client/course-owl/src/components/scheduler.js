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
    width: "200px",
    padding: "10px"
  },
  eventButton: {
    marginBottom: "5px"
  }
};

const Calendar = () => {
  const calendarRef = useRef();

  const [calendarConfig, setCalendarConfig] = useState({
    viewType: "Week",
    startDate: "2023-10-02", // Set the calendar start date
    durationBarVisible: false,
    timeRangeSelectedHandling: "Enabled",
    onTimeRangeSelected: async args => {
      const dp = calendarRef.current.control;
      const modal = await DayPilot.Modal.prompt("Create a new event:", "Event 1");
      dp.clearSelection();
      if (!modal.result) { return; }
      dp.events.add({
        start: args.start,
        end: args.end,
        id: DayPilot.guid(),
        text: modal.result
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
        const startTime = moment(`10-03-2023 ${row['Published Start']}`, 'MM-DD-YYYY h:mma').format('YYYY-MM-DDTHH:mm:ss');
        const endTime = moment(`10-03-2023 ${row['Published End']}`, 'MM-DD-YYYY h:mma').format('YYYY-MM-DDTHH:mm:ss');
  
        return {
          text: name,
          start: startTime,
          end: endTime,
          id: DayPilot.guid()
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
    dp.events.add({
      start: event.start,
      end: event.end,
      id: DayPilot.guid(),
      text: event.text
    });
  };

  return (
    <div style={styles.wrap}>
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
      <div style={styles.main}>
        <DayPilotCalendar {...calendarConfig} ref={calendarRef} />
      </div>
    </div>
  );
};

export default Calendar;
