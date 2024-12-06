import DoctorTable from "@/components/Dashboard/PatientAppointment/DoctorTable";
import PrescriptionTableListInPatient from "@/components/Dashboard/PatientAppointment/Prescription/PrescriptionTableListInPatient";
import Link from "next/link";
import React from "react";
import { BsSlash } from "react-icons/bs";

const MyPrescriptinPage = () => {
  return (
    <div className="mx-5">
      <div className="flex items-center justify-between mt-2">
        <div>
          <h2 className="text-lg text-[#495057] font-semibold">
            MY PRESCRIPTION LIST
          </h2>
        </div>
        <div className="flex items-center gap-1 text-[#495057] text-sm">
          <Link href="#" className="">
            Dashboard
          </Link>
          <BsSlash className="text-[#ccc]" />
          <Link href="#">Prescription</Link>
        </div>
      </div>
      <div className="mt-5">
        <PrescriptionTableListInPatient />
      </div>
    </div>
  );
};

export default MyPrescriptinPage;
