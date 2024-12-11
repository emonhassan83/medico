"use client";

import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react"; // Main package
import dayGridPlugin from "@fullcalendar/daygrid"; // For month view
import timeGridPlugin from "@fullcalendar/timegrid"; // For week/day views
import listPlugin from "@fullcalendar/list"; // For list view
import interactionPlugin from "@fullcalendar/interaction"; // For click and drag

import "./AppointmentCalender.css";
import AppointmentTableInDoctor from "./AppointmentTableInDoctor";
import { useGetMyAppointmentsQuery } from "@/redux/api/appointmentApi";

const formatDate = (dateString: any) => {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0]; // Returns date in "YYYY-MM-DD" format
};

interface Appointment {
  id: string;
  doctor: {
    firstName: string;
    lastName: string;
  };
  schedule: {
    startDate: string;
  };
}

<<<<<<< HEAD
<<<<<<< HEAD
const CreateCalenderInDoctor = ({data}: any) => {
  // Sample events
  const [events, setEvents] = useState([
    { title: "3 Appoint", date: "2024-11-28" },
    { title: "2 Appoint", date: "2024-11-30" },
    { title: "5 Appoint", date: "2024-11-14" },
    { title: "1 Appoint", date: "2024-11-18" },
    { title: "5 Appoint", date: "2024-11-27" },
  ]);
=======
=======
>>>>>>> c8fd4a23e1cc9f7b3915b60236c8c21613dd3d32
const CreateCalenderInDoctor = () => {
  const { data } = useGetMyAppointmentsQuery({});
  const [events, setEvents] = useState<any[]>([]);
  const [date, setDate] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      // Type for the grouped appointments
      const groupedAppointments: Record<string, Appointment[]> =
        data?.appointments.reduce(
          (acc: Record<string, Appointment[]>, appointment: Appointment) => {
            const date = formatDate(appointment.schedule.startDate);

            if (!acc[date]) {
              acc[date] = [];
            }

            acc[date].push(appointment);
            return acc;
          },
          {}
        );

      // Create events from the grouped data
      const appointEvents = Object.keys(groupedAppointments).map((date) => {
        const appointmentsForTheDay = groupedAppointments[date];
        return {
          title: `${appointmentsForTheDay.length} appointments`,
          start: `${date}`, // Start time for the whole day
          end: `${date}`, // End time for the whole day
          id: date, // Using date as unique ID for the event
        };
      });

      setEvents(appointEvents);

      const date = new Date();
      const fDate = formatDate(date);

      const todaysAppointment = data?.appointments.filter(
        (d: any) => d?.schedule?.startDate.slice(0, 10) === fDate
      );
      setDate(todaysAppointment);
    }
  }, [data]);

  const handleEvent = (info: any) => {
    const fDate: string = info?.event?._def?.publicId;
    if (!fDate) return;

    const todaysAppointment: Appointment[] =
      data?.appointments.filter(
        (d: Appointment) => d?.schedule?.startDate.slice(0, 10) === fDate
      ) || [];

    setDate(todaysAppointment);
  };
<<<<<<< HEAD
>>>>>>> cc229d2b932c38bada57f659c9ab8be5a9986f08
=======
>>>>>>> c8fd4a23e1cc9f7b3915b60236c8c21613dd3d32

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
            eventClick={(info) => handleEvent(info)}
          />
        </div>
      </div>
<<<<<<< HEAD
<<<<<<< HEAD
      <AppointmentTableInDoctor data={data}/>
=======
      <AppointmentTableInDoctor date={date} />
>>>>>>> cc229d2b932c38bada57f659c9ab8be5a9986f08
=======
      <AppointmentTableInDoctor date={date} />
>>>>>>> c8fd4a23e1cc9f7b3915b60236c8c21613dd3d32
    </div>
  );
};

export default CreateCalenderInDoctor;
