"use client";

import SchedulesTabileInDoctor from "@/components/Dashboard/Doctor/Schedules/SchedulesTabileInDoctor";
import Meta from "@/components/Dashboard/Meta/MetaData";
import FullPageLoading from "@/components/Loader/FullPageLoader";
import { useGetAllSchedulesQuery } from "@/redux/api/scheduleApi";
import Link from "next/link";
import React from "react";
import { BsSlash } from "react-icons/bs";

const DoctorSchedulesPage = () => {
  const { data, isLoading } = useGetAllSchedulesQuery({});

  if (isLoading) {
    return <FullPageLoading/>
  }
  return (
    <>
    <Meta
        title="List of Schedules | Medico - Hospital & Clinic Management System"
        description="This is the list of schedules page of Medico where doctors can show all their schedules and view details information."
      />

    <div className="mx-5">
      <div className="flex items-center justify-between mt-2">
        <div>
          <h2 className="text-lg text-[#495057] font-semibold">
            DOCTOR SCHEDULES LIST
          </h2>
        </div>
        <div className="flex items-center gap-1 text-[#495057] text-sm">
          <Link href="/doctor" className="">
            Dashboard
          </Link>
          <BsSlash className="text-[#ccc]" />
          <Link href="#">Doctor Schedule</Link>
        </div>
      </div>
      <div className="mt-5">
        <Link
          href="/doctor/schedules/create"
          className="text-white text-sm bg-[#556ee6] py-2 px-4 rounded-md"
        >
          + Add Doctor Schedules
        </Link>
      </div>
      <div className="mt-5">
        <SchedulesTabileInDoctor data={data} />
      </div>
    </div>
    </>
  );
};

export default DoctorSchedulesPage;
