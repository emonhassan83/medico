"use client";

import Meta from "@/components/Dashboard/Meta/MetaData";
import DoctorTableInReceptionist from "@/components/Dashboard/Receptionist/Doctor/DoctorTableInReceptionist";
import FullPageLoading from "@/components/Loader/FullPageLoader";
import { useGetAllDoctorsQuery } from "@/redux/api/doctorApi";
import Link from "next/link";
import React from "react";
import { BsSlash } from "react-icons/bs";

const Doctor = () => {
  const { data, isLoading } = useGetAllDoctorsQuery({});

  if (isLoading) {
    return <FullPageLoading />;
  }
  return (
    <>
    <Meta
        title="List of Doctors | Medico - Hospital & Clinic Management System"
        description="This is the doctors of list of Medico where admin can manage their doctor profile manage like update and delete, and more."
      />

    <div className="mx-5">
      <div className="flex items-center justify-between mt-2">
        <div>
          <h2 className="text-lg text-[#495057] font-semibold">DOCTOR LIST</h2>
        </div>
        <div className="flex items-center gap-1 text-[#495057] text-sm">
          <Link href="/receptionist" className="">
            Dashboard
          </Link>
          <BsSlash className="text-[#ccc]" />
          <Link href="#">Doctors</Link>
        </div>
      </div>

      <div className="pt-5">
        <DoctorTableInReceptionist data={data} />
      </div>
    </div>
    </>
  );
};

export default Doctor;
