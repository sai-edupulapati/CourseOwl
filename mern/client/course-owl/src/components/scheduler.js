import React, { useState, useRef } from 'react';
import { DayPilot, DayPilotCalendar } from "@daypilot/daypilot-lite-react";
import "./CalendarStyles.css";
import Papa from 'papaparse';

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
  const fileInputRef = useRef(null);

  const [calendarConfig, setCalendarConfig] = useState({
    viewType: "Week",
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
  const [eventsVisible, setEventsVisible] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: handleFileRead
      });
    }
  };

  const handleFileRead = (results) => {
    const parsedEvents = results.data.map(row => {
      const name = row['Name'];
      const start = row['Published Start'];
      const end = row['Published End'];

      return {
        text: name,
        start: [start],
        end: [end],
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
  };

  const handleEventButtonClick = event => {
    const dp = calendarRef.current.control;
    for (let i = 0; i < event.start.length; i++) {
      dp.events.add({
        start: event.start[i],
        end: event.end[i],
        id: DayPilot.guid(),
        text: event.text
      });
    }
  };

  const handleShowEvents = () => {
    setEventsVisible(true);
  };

  return (
    <div style={styles.wrap}>
      <div style={styles.eventList}>
        <input type="file" accept=".csv" onChange={handleFileChange} ref={fileInputRef} />
        <button onClick={() => fileInputRef.current.click()}>Upload CSV</button>
        <button onClick={handleShowEvents}>Show Events</button>
        {eventsVisible && eventButtons}
      </div>
      <div style={styles.main}>
        <DayPilotCalendar
          {...calendarConfig}
          ref={calendarRef}
        />
      </div>
    </div>
  );
};

export default Calendar;
