"use client";

import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react"; // Main package
import dayGridPlugin from "@fullcalendar/daygrid"; // For month view
import timeGridPlugin from "@fullcalendar/timegrid"; // For week/day views
import listPlugin from "@fullcalendar/list"; // For list view
import interactionPlugin from "@fullcalendar/interaction"; // For click and drag

import "./AppointmentCalender.css";
import AppointmentTableInDoctor from "./AppointmentTableInDoctor";

const CreateCalenderInDoctor = ({data}: any) => {
  // Sample events
  const [events, setEvents] = useState([
    { title: "3 Appoint", date: "2024-11-28" },
    { title: "2 Appoint", date: "2024-11-30" },
    { title: "5 Appoint", date: "2024-11-14" },
    { title: "1 Appoint", date: "2024-11-18" },
    { title: "5 Appoint", date: "2024-11-27" },
  ]);

  return (
    <div className="mt-5 flex flex-col md:flex-row  justify-between gap-10">
      <div className="bg-white p-5">
        <div className="w-full md:w-[565px] overflow-hidden">
          <FullCalendar
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              listPlugin,
              interactionPlugin,
            ]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,dayGridWeek,dayGridDay,list",
            }}
            events={events}
            eventDisplay="block" // Ensure events show as blocks
            editable={true} // Allows event drag and drop
            selectable={true} // Allows selecting time slots
            eventColor="#28a745" // Customize event color
            height="auto"
          />
        </div>
      </div>
      <AppointmentTableInDoctor data={data}/>
    </div>
  );
};

export default CreateCalenderInDoctor;
