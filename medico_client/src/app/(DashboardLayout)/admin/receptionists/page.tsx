"use client";

import ReceptionistTable from "@/components/Dashboard/Admin/Receptionist/ReceptionistTable";
import Meta from "@/components/Dashboard/Meta/MetaData";
import FullPageLoading from "@/components/Loader/FullPageLoader";
import { useGetAllReceptionQuery } from "@/redux/api/receptionistApi";
import Link from "next/link";
import React from "react";
import { BsSlash } from "react-icons/bs";

const Receptionist = () => {
  const { data, refetch, isLoading } = useGetAllReceptionQuery({});

  if (isLoading) {
    return <FullPageLoading />;
  }
  return (
    <>
      <Meta
        title="List of Receptionist | Medico - Hospital & Clinic Management System"
        description="This is the receptionist of list of Medico where admin can manage their receptionist profile manage like update and delete, and more."
      />

      <div className="mx-5">
        <div className="flex items-center justify-between mt-2">
          <div>
            <h2 className="text-lg text-[#495057] font-semibold">
              RECEPTIONIST LIST
            </h2>
          </div>
          <div className="flex items-center gap-1 text-[#495057] text-sm">
            <Link href="/admin" className="">
              Dashboard
            </Link>
            <BsSlash className="text-[#ccc]" />
            <Link href="#">Receptionists</Link>
          </div>
        </div>
        <div className="mt-5">
          <Link
            href="/admin/receptionists/create"
            className="text-white text-sm bg-[#556ee6] py-2 px-4 rounded-md"
          >
            + New Receptionist
          </Link>
        </div>
        <div className="pt-5">
          <ReceptionistTable data={data} refetch={refetch} />
        </div>
      </div>
    </>
  );
};

export default Receptionist;
