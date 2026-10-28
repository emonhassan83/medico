"use client";

import Meta from "@/components/Dashboard/Meta/MetaData";
import FullPageLoading from "@/components/Loader/FullPageLoader";
import LoadingContext from "@/lib/LoadingContext/LoadingContext";
import Link from "next/link";
import { useState, ReactNode } from "react";
import { BsSlash } from "react-icons/bs";

const statusList = [
  { id: 1, status: "scheduled", title: "Scheduled Appointment List" },
  { id: 2, status: "inprogress", title: "Inprogress Appointment List" },
  { id: 3, status: "completed", title: "Completed Appointment List" },
  { id: 4, status: "canceled", title: "Canceled Appointment List" },
];

const Layout = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Meta
        title="List of Appointment | Medico - Hospital & Clinic Management System"
        description="This is the list of Appointment page of Medico where admin can show all patient Appointment, and more."
      />

      <LoadingContext.Provider value={{ setLoading }}>
        <div className="relative">
          {loading && <FullPageLoading />}

          {/* Header */}
          <div className="flex justify-between px-3 mt-8 mb-10">
            <div>
              <p className="uppercase">Appointment List</p>
            </div>
            <div className="flex text-sm">
              <Link href="/admin" className="">
                Dashboard
              </Link>
              <BsSlash className="text-[#ccc]" />
              <Link href="#">Appointment</Link>
            </div>
          </div>

          {/* Status Navigation */}
          <div className="flex justify-between gap-8 px-3 my-6">
            {statusList.map((value) => (
              <div key={value.id}>
                <Link href={`/admin/appointment-list/${value.status}`}>
                  <button className="focus:text-blue-700 focus:border-b-[2px] focus:border-blue-500 pb-5 border-b text-sm">
                    {value.title}
                  </button>
                </Link>
              </div>
            ))}
          </div>

          {/* Children */}
          {children}
        </div>
      </LoadingContext.Provider>
    </>
  );
};

export default Layout;
