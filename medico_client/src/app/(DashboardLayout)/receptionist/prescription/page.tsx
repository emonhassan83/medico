<<<<<<< HEAD
// import PrescriptionListTable from "@/components/Dashboard/Receptionist/Prescription/PrescriptionListTable";
=======
import PatientTable from "@/components/Dashboard/Admin/Patient/PatientTable";
>>>>>>> fdb210484cdfd4c190e094a0a125f9e6be95060e
import PrescriptionListTable from "@/components/Dashboard/Receptionist/Prescription/PrescriptionListTable";
import Link from "next/link";
import React from "react";
import { BsSlash } from "react-icons/bs";

const PrescriptionList = () => {
  return (
    <div className="mx-5">
      <div className="flex items-center justify-between mt-2">
        <div>
          <h2 className="text-lg text-[#495057] font-semibold">
            PRESCRIPTION LIST
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
      {/* <div className="mt-5">
        <Link
          href="/receptionist/patients/create"
          className="text-white text-sm bg-[#556ee6] py-2 px-4 rounded-md"
        >
          + New Patient
        </Link>
      </div> */}
      <div className="pt-5">
        <PrescriptionListTable />
      </div>
    </div>
  );
};

export default PrescriptionList;
