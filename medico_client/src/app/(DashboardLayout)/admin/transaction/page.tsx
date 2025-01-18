"use client";

import TransectionTableInAdmin from "@/components/Dashboard/Admin/Transection/TransectionTableInAdmin";
import Meta from "@/components/Dashboard/Meta/MetaData";
import FullPageLoading from "@/components/Loader/FullPageLoader";
import { useGetAllAppointmentsQuery } from "@/redux/api/appointmentApi";
import Link from "next/link";
import { BsSlash } from "react-icons/bs";

const AdminTransactionPage = () => {
  const { data, isLoading } = useGetAllAppointmentsQuery({});

  if (isLoading) {
    return <FullPageLoading />;
  }
  return (
    <>
      <Meta
        title="List of Transaction | Medico - Hospital & Clinic Management System"
        description="This is the list of transaction page of Medico where admin can show all patient transaction, and more."
      />

      <div className="mx-5">
        <div className="flex items-center justify-between mt-2">
          <div>
            <h2 className="text-lg text-[#495057] font-semibold">
              TRANSACTION LIST
            </h2>
          </div>
          <div className="flex items-center gap-1 text-[#495057] text-sm">
            <Link href="/admin" className="">
              Dashboard
            </Link>
            <BsSlash className="text-[#ccc]" />
            <Link href="#">Transaction</Link>
          </div>
        </div>
        <div className="mt-5">
          <TransectionTableInAdmin data={data} />
        </div>
      </div>
    </>
  );
};

export default AdminTransactionPage;
