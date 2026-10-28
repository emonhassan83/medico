"use client";

import MyAppointmentTable from "@/components/Dashboard/Doctor/Appointment/MyAppointmentTable";
import Meta from "@/components/Dashboard/Meta/MetaData";
import FullPageLoading from "@/components/Loader/FullPageLoader";
import { useGetMyAppointmentsQuery } from "@/redux/api/appointmentApi";
import Link from "next/link";
import React from "react";
import { BsSlash } from "react-icons/bs";

const AppointmentList = () => {
  const { data, isLoading } = useGetMyAppointmentsQuery({});

  if (isLoading) {
    return <FullPageLoading/>;
  }

  return (
    <>
    <Meta
        title="List Appointment | Medico - Hospital & Clinic Management System"
        description="This is the doctor list appointment of Medico where doctors can manage and show their appointments."
      />

    <div className="mx-5">
      <div className="flex items-center justify-between mt-2">
        <div>
          <h2 className="text-lg text-[#495057] font-semibold">
            MY APPOINTMENT LIST
          </h2>
        </div>
        <div className="flex items-center gap-1 text-[#495057] text-sm">
          <Link href="/doctor" className="">
            Dashboard
          </Link>
          <BsSlash className="text-[#ccc]" />
          <Link href="#">Appointments</Link>
        </div>
      </div>
      <div className="pt-5">
        <MyAppointmentTable data={data}/>
      </div>
    </div>
    </>
  );
};

export default AppointmentList;
