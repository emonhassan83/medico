import MyAppointmentTable from "@/components/Dashboard/Doctor/Appointment/MyAppointmentTable";
import Link from "next/link";
import React from "react";
import { BsSlash } from "react-icons/bs";

const AppointmentList = () => {
  return (
    <div className="mx-5">
      <div className="flex items-center justify-between mt-2">
        <div>
          <h2 className="text-lg text-[#495057] font-semibold">
            MY APPOINTMENT LIST
          </h2>
        </div>
        <div className="flex items-center gap-1 text-[#495057] text-sm">
          <Link href="#" className="">
            Dashboard
          </Link>
          <BsSlash className="text-[#ccc]" />
          <Link href="#">Appointments</Link>
        </div>
      </div>
      <div className="pt-5">
        <MyAppointmentTable />
      </div>
    </div>
  );
};

export default AppointmentList;
