"use client";

import InvoiceTableOfDoctor from "@/components/Dashboard/Doctor/Invoice/InvoiceTableOfDoctor";
import FullPageLoading from "@/components/Loader/FullPageLoader";
import { useGetMyAppointmentsQuery } from "@/redux/api/appointmentApi";
import Link from "next/link";
import { BsSlash } from "react-icons/bs";

const DoctorInvoicePage = () => {
  const { data, isLoading } = useGetMyAppointmentsQuery({});

  if (isLoading) {
    return <FullPageLoading />;
  }
  return (
    <div className="mx-5">
      <div className="flex items-center justify-between mt-2">
        <div>
          <h2 className="text-lg text-[#495057] font-semibold">INVOICE LIST</h2>
        </div>
        <div className="flex items-center gap-1 text-[#495057] text-sm">
          <Link href="#" className="">
            Dashboard
          </Link>
          <BsSlash className="text-[#ccc]" />
          <Link href="#">Invoice</Link>
        </div>
      </div>
      <div className="mt-5">
        <InvoiceTableOfDoctor data={data} />
      </div>
    </div>
  );
};

export default DoctorInvoicePage;
