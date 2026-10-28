"use client";

import SpecialtiesTable from "@/components/Dashboard/Admin/Specialties/SpecialtiesTable";
import Meta from "@/components/Dashboard/Meta/MetaData";
import FullPageLoading from "@/components/Loader/FullPageLoader";
import { useGetAllSpecialtiesQuery } from "@/redux/api/specialitiesApi";
import Link from "next/link";
import React from "react";
import { BsSlash } from "react-icons/bs";

const Specialties = () => {
  const { data, isLoading } = useGetAllSpecialtiesQuery({});

  if (isLoading) {
    return <FullPageLoading />;
  }
  return (
    <>
      <Meta
        title="List of Specialties | Medico - Hospital & Clinic Management System"
        description="This is the specialties of list of Medico where admin can manage their specialties manage like update and delete, and more."
      />

      <div className="mx-5">
        <div className="flex items-center justify-between mt-2">
          <div>
            <h2 className="text-lg text-[#495057] font-semibold">
              SPECIALTIES LIST
            </h2>
          </div>
          <div className="flex items-center gap-1 text-[#495057] text-sm">
            <Link href="/admin" className="">
              Dashboard
            </Link>
            <BsSlash className="text-[#ccc]" />
            <Link href="#">Specialties</Link>
          </div>
        </div>
        <div className="mt-5">
          <Link
            href="/admin/specialties/create"
            className="text-white text-sm bg-[#556ee6] py-2 px-4 rounded-md"
          >
            + New Specialties
          </Link>
        </div>
        <div className="pt-5">
          <SpecialtiesTable data={data} />
        </div>
      </div>
    </>
  );
};

export default Specialties;
