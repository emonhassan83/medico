import CreateCalenderInDoctor from "@/components/Dashboard/Doctor/Appointment/CreateCalenderInDoctor";
import CreateCalender from "@/components/Dashboard/PatientAppointment/CreateCalender";
import Link from "next/link";
import React from "react";
import { BsSlash } from "react-icons/bs";

const AppointmentPageOfDoctor = () => {
  return (
    <div className="mx-5">
      <div className="flex items-center justify-between mt-2">
        <div>
          <h2 className="text-lg text-[#495057] font-semibold">
            Book Appointment
          </h2>
        </div>
        <div className="flex items-center gap-1 text-[#495057] text-sm">
          <Link href="#" className="">
            Dashboard
          </Link>
          <BsSlash className="text-[#ccc]" />
          <Link href="#">Appointment</Link>
        </div>
      </div>
      <div className="mt-5">
        <Link
          href="/doctor/appointments/create"
          className="text-white text-sm bg-[#556ee6] py-2 px-4 rounded-md"
        >
          + New Appointment
        </Link>
      </div>
      <div>
        <CreateCalenderInDoctor />
      </div>
    </div>
  );
};

export default AppointmentPageOfDoctor;
