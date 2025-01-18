"use client";

import Meta from "@/components/Dashboard/Meta/MetaData";
import FullPageLoading from "@/components/Loader/FullPageLoader";
import { useGetAllPatientQuery } from "@/redux/api/patientApi";
import Link from "next/link";
import React from "react";
import { BsSlash } from "react-icons/bs";
import PatientTable from "./components/PatientTable";

const ReceptionistPatientPage = () => {
  const { data, refetch, isLoading } = useGetAllPatientQuery([]);

  if (isLoading) {
    return <FullPageLoading />;
  }
  return (
    <>
     <Meta
        title="List of Patients | Medico - Hospital & Clinic Management System"
        description="This is the list of patient list page of Medico where receptionist can manage patient like update and delete, and more."
      />

    <div className="mx-5">
      <div className="flex items-center justify-between mt-2">
        <div>
          <h2 className="text-lg text-[#495057] font-semibold">PATIENT LIST</h2>
        </div>
        <div className="flex items-center gap-1 text-[#495057] text-sm">
          <Link href="/receptionist" className="">
            Dashboard
          </Link>
          <BsSlash className="text-[#ccc]" />
          <Link href="#">Patients</Link>
        </div>
      </div>
      <div className="mt-5">
        <Link
          href="/receptionist/patients/create"
          className="text-white text-sm bg-[#556ee6] py-2 px-4 rounded-md"
        >
          + New Patient
        </Link>
      </div>
      <div className="pt-5">
        <PatientTable data={data} refetch={refetch} />
      </div>
    </div>
    </>
  );
};

export default ReceptionistPatientPage;
