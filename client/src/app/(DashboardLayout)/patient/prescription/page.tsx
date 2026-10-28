"use client";

import Meta from "@/components/Dashboard/Meta/MetaData";
import PrescriptionTableListInPatient from "@/components/Dashboard/PatientAppointment/Prescription/PrescriptionTableListInPatient";
import FullPageLoading from "@/components/Loader/FullPageLoader";
import { useGetAllPrescriptionQuery } from "@/redux/api/prescriptionApi";
import { useGetMyProfileQuery } from "@/redux/api/userApi";
import Link from "next/link";
import React from "react";
import { BsSlash } from "react-icons/bs";

const MyPrescriptionPage = () => {
  const { data, isLoading } = useGetAllPrescriptionQuery([]);
  const { data: profile, isLoading: isProfileLoading } = useGetMyProfileQuery(
    {}
  );

  if (isLoading || isProfileLoading) {
    return <FullPageLoading />;
  }
  return (
    <>
      <Meta
        title="List of Prescription | Medico - Hospital & Clinic Management System"
        description="This is the list of prescription page of Medico where patients can show all their prescription and view details information."
      />

      <div className="mx-5">
        <div className="flex items-center justify-between mt-2">
          <div>
            <h2 className="text-lg text-[#495057] font-semibold">
              MY PRESCRIPTION LIST
            </h2>
          </div>
          <div className="flex items-center gap-1 text-[#495057] text-sm">
            <Link href="/patient" className="">
              Dashboard
            </Link>
            <BsSlash className="text-[#ccc]" />
            <Link href="#">Prescription</Link>
          </div>
        </div>
        <div className="mt-5">
          <PrescriptionTableListInPatient data={data} profile={profile} />
        </div>
      </div>
    </>
  );
};

export default MyPrescriptionPage;
