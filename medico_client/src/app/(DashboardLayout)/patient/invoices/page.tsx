import InvoiceTableOfPatient from "@/components/Dashboard/PatientAppointment/Invoice/InvoiceTableOfPatient";
import Link from "next/link";
import { BsSlash } from "react-icons/bs";

const PatientInvoicesPage = () => {
  return (
    <div>
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
      <div>
        <InvoiceTableOfPatient />
      </div>
    </div>
  );
};

export default PatientInvoicesPage;
