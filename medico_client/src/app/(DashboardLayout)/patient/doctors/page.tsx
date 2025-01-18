"use client";

import Meta from "@/components/Dashboard/Meta/MetaData";
import DoctorTable from "@/components/Dashboard/PatientAppointment/DoctorTable";
import FullPageLoading from "@/components/Loader/FullPageLoader";
import { useGetAllDoctorsQuery } from "@/redux/api/doctorApi";
import Link from "next/link";
import React from "react";
import { BsSlash } from "react-icons/bs";

const DoctorList = () => {
  const { data, isLoading } = useGetAllDoctorsQuery({});

  if (isLoading) {
    return <FullPageLoading />;
  }
  return (
    <>
      <Meta
        title="List of Doctors | Medico - Hospital & Clinic Management System"
        description="This is the list of doctors page of Medico where patients can show all doctors and their details information."
      />

      <div className="mx-5">
        <div className="flex items-center justify-between mt-2">
          <div>
            <h2 className="text-lg text-[#495057] font-semibold">
              DOCTOR LIST
            </h2>
          </div>
          <div className="flex items-center gap-1 text-[#495057] text-sm">
            <Link href="/patient" className="">
              Dashboard
            </Link>
            <BsSlash className="text-[#ccc]" />
            <Link href="#">Doctors</Link>
          </div>
        </div>
        <div className="mt-5">
          <DoctorTable data={data} />
        </div>
      </div>
    </>
  );
};

export default DoctorList;
