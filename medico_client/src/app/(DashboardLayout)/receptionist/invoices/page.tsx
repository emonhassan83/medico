"use client";

import InvoiceTableOfReception from "@/components/Dashboard/Receptionist/Invoice/InvoiceTableOfReception";
import FullPageLoading from "@/components/Loader/FullPageLoader";
import { useGetAllAppointmentsQuery } from "@/redux/api/appointmentApi";
import Link from "next/link";
import { BsSlash } from "react-icons/bs";

const ReceptionistInvoicesPage = () => {
  const { data, isLoading } = useGetAllAppointmentsQuery({});

  if (isLoading){
    return <FullPageLoading/>;
  }
  return (
    <div className="mx-5">
      <div className="flex items-center justify-between mt-2">
        <div>
          <h2 className="text-xl text-[#495057] font-semibold">INVOICE LIST</h2>
        </div>
        <div className="flex items-center gap-1 text-[#495057] text-lg">
          <Link href="#" className="">
            Dashboard
          </Link>
          <BsSlash className="text-[#ccc]" />
          <Link href="#">Invoice</Link>
        </div>
      </div>
      <div className="mt-5">
        <InvoiceTableOfReception data={data} />
      </div>
    </div>
  );
};

export default ReceptionistInvoicesPage;
