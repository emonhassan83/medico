import PatientTable from "@/components/Dashboard/Admin/Patient/PatientTable";
import Link from "next/link";
import React from "react";
import { BsSlash } from "react-icons/bs";

const ReceptionistPatientPage = () => {
  return (
    <div className="mx-5">
      <div className="flex items-center justify-between mt-2">
        <div>
          <h2 className="text-lg text-[#495057] font-semibold">PATIENT LIST</h2>
        </div>
        <div className="flex items-center gap-1 text-[#495057] text-sm">
          <Link href="#" className="">
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
        <PatientTable />
      </div>
    </div>
  );
};

export default ReceptionistPatientPage;
