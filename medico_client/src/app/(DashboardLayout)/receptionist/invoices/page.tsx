"use client";

import Meta from "@/components/Dashboard/Meta/MetaData";
import InvoiceTableOfReception from "@/components/Dashboard/Receptionist/Invoice/InvoiceTableOfReception";
import FullPageLoading from "@/components/Loader/FullPageLoader";
import { useGetAllAppointmentsQuery } from "@/redux/api/appointmentApi";
import Link from "next/link";
import { BsSlash } from "react-icons/bs";

const ReceptionistInvoicesPage = () => {
  const { data, isLoading } = useGetAllAppointmentsQuery({});

  if (isLoading) {
    return <FullPageLoading />;
  }
  return (
    <>
    <Meta
        title="List of Invoice | Medico - Hospital & Clinic Management System"
        description="This is the list of invoice page of Medico where receptionist can show all patient invoice, and more."
      />

    <div className="mx-5">
      <div className="flex items-center justify-between mt-2">
        <div>
          <h2 className="text-lg text-[#495057] font-semibold">INVOICE LIST</h2>
        </div>
        <div className="flex items-center gap-1 text-[#495057] text-sm">
          <Link href="/receptionist" className="">
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
    </>
  );
};

export default ReceptionistInvoicesPage;
