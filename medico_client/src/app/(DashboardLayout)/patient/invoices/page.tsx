"use client";

import Meta from "@/components/Dashboard/Meta/MetaData";
import InvoiceTableOfPatient from "@/components/Dashboard/PatientAppointment/Invoice/InvoiceTableOfPatient";
import FullPageLoading from "@/components/Loader/FullPageLoader";
import { useGetMyAppointmentsQuery } from "@/redux/api/appointmentApi";
import Link from "next/link";
import { BsSlash } from "react-icons/bs";

const PatientInvoicesPage = () => {
  const { data, isLoading } = useGetMyAppointmentsQuery({});

  if (isLoading) {
    return <FullPageLoading />;
  }
  return (
    <>
      <Meta
        title="List of Invoices | Medico - Hospital & Clinic Management System"
        description="This is the list of invoices page of Medico where patients can show all their invoices and view details information."
      />

      <div className="mx-5">
        <div className="flex items-center justify-between mt-2">
          <div>
            <h2 className="text-xl text-[#495057] font-semibold">
              INVOICE LIST
            </h2>
          </div>
          <div className="flex items-center gap-1 text-[#495057] text-sm">
          <Link href="/patient" className="">
            Dashboard
          </Link>
          <BsSlash className="text-[#ccc]" />
          <Link href="#">Invoice</Link>
        </div>
        </div>
        <div className="mt-5">
          <InvoiceTableOfPatient data={data} />
        </div>
      </div>
    </>
  );
};

export default PatientInvoicesPage;
