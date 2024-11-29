import React from "react";

interface Appointment {
  id: number;
  doctorName: string;
  patientName: string;
  contactNo: string;
  email: string;
  date: string;
  time: string;
}

interface TableProps {
  appointments: Appointment[];
}

const AppointmentTable: React.FC<TableProps> = ({ appointments }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2 text-left">Sr. No</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Doctor Name</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Patient Name</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Patient Contact No</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Patient Email</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Time</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment, index) => (
            <tr key={appointment.id} className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
              <td className="border border-gray-300 px-4 py-2">{appointment.doctorName}</td>
              <td className="border border-gray-300 px-4 py-2">{appointment.patientName}</td>
              <td className="border border-gray-300 px-4 py-2">{appointment.contactNo}</td>
              <td className="border border-gray-300 px-4 py-2">{appointment.email}</td>
              <td className="border border-gray-300 px-4 py-2">{appointment.date}</td>
              <td className="border border-gray-300 px-4 py-2">{appointment.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentTable;
