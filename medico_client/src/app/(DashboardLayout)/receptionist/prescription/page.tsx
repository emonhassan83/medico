"use client";

import Meta from "@/components/Dashboard/Meta/MetaData";
import PrescriptionListTable from "@/components/Dashboard/Receptionist/Prescription/PrescriptionListTable";
import FullPageLoading from "@/components/Loader/FullPageLoader";
import { useGetAllPrescriptionQuery } from "@/redux/api/prescriptionApi";
import Link from "next/link";
import React from "react";
import { BsSlash } from "react-icons/bs";

const PrescriptionList = () => {
  const { data, isLoading } = useGetAllPrescriptionQuery({});

  if (isLoading) {
    return <FullPageLoading />;
  }
  return (
    <>
    <Meta
        title="List of Prescription | Medico - Hospital & Clinic Management System"
        description="This is the list of prescription page of Medico where receptionist can show all their prescription and view details information."
      />

    <div className="mx-5">
      <div className="flex items-center justify-between mt-2">
        <div>
          <h2 className="text-lg text-[#495057] font-semibold">
            PRESCRIPTION LIST
          </h2>
        </div>
        <div className="flex items-center gap-1 text-[#495057] text-sm">
          <Link href="/receptionist" className="">
            Dashboard
          </Link>
          <BsSlash className="text-[#ccc]" />
          <Link href="#">Prescription</Link>
        </div>
      </div>

      <div className="pt-5">
        <PrescriptionListTable data={data} />
      </div>
    </div>
    </>
  );
};

export default PrescriptionList;
