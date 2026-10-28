"use client";

import PatientTable from "@/components/Dashboard/Admin/Patient/PatientTable";
import PatientTableInDoctor from "@/components/Dashboard/Doctor/Patient/PatientTableInDoctor";
import Meta from "@/components/Dashboard/Meta/MetaData";
import FullPageLoading from "@/components/Loader/FullPageLoader";
import { useGetAllPatientQuery } from "@/redux/api/patientApi";
import Link from "next/link";
import React from "react";
import { BsSlash } from "react-icons/bs";

const PatientPage = () => {
  const { data, refetch, isLoading } = useGetAllPatientQuery([]);

  if (isLoading) {
    return <FullPageLoading />;
  }
  return (
    <>
    <Meta
        title="List of Patients | Medico - Hospital & Clinic Management System"
        description="This is the list of patients page of Medico where patients can show all patients and their details information."
      />

    <div className="mx-5">
      <div className="flex items-center justify-between mt-2">
        <div>
          <h2 className="text-lg text-[#495057] font-semibold">PATIENT LIST</h2>
        </div>
        <div className="flex items-center gap-1 text-[#495057] text-sm">
          <Link href="/doctors" className="">
            Dashboard
          </Link>
          <BsSlash className="text-[#ccc]" />
          <Link href="#">Patients</Link>
        </div>
      </div>
      <div className="pt-5">
        <PatientTableInDoctor data={data} refetch={refetch} />
      </div>
    </div>
    </>
  );
};

export default PatientPage;
