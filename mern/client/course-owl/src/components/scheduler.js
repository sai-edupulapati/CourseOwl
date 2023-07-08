import React, { useState, useRef, useEffect } from 'react';
import { DayPilot, DayPilotCalendar, DayPilotNavigator } from "@daypilot/daypilot-lite-react";
import "./CalendarStyles.css";

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
  const [eventsVisible, setEventsVisible] = useState(false); // State to track if events are visible

  useEffect(() => {
    const initialEvents = [
      {
        id: 1,
        text: "Event 1",
        start: ["2023-10-02T11:00:00", "2023-10-04T11:00:00"],
        end: ["2023-10-02T13:00:00", "2023-10-04T13:00:00"]
      },
      {
        id: 2,
        text: "Event 2",
        start: ["2023-10-03T09:30:00"],
        end: ["2023-10-03T11:30:00"],
        backColor: "#6aa84f"
      },
      {
        id: 3,
        text: "Event 3",
        start: ["2023-10-03T12:00:00"],
        end: ["2023-10-03T15:00:00"],
        backColor: "#f1c232"
      },
      {
        id: 4,
        text: "Event 4",
        start: ["2023-10-01T11:30:00"],
        end: ["2023-10-01T14:30:00"],
        backColor: "#cc4125"
      },
    ];

    const startDate = "2023-10-02";

    calendarRef.current.control.update({ startDate });

    // Create event buttons
    const buttons = initialEvents.map(event => (
      <button
        key={event.id}
        style={styles.eventButton}
        onClick={() => handleEventButtonClick(event)}
      >
        {event.text}
      </button>
    ));

    setEventButtons(buttons);
  }, []);

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
}

export default Calendar;
