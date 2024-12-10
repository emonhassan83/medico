import TransectionTableInAdmin from "@/components/Dashboard/Admin/Transection/TransectionTableInAdmin";
import Link from "next/link";
import { BsSlash } from "react-icons/bs";

const AdminTransactionPage = () => {
  return (
    <div className="mx-5">
      <div className="flex items-center justify-between mt-2">
        <div>
          <h2 className="text-lg text-[#495057] font-semibold">
            TRANSECTION LIST
          </h2>
        </div>
        <div className="flex items-center gap-1 text-[#495057] text-sm">
          <Link href="#" className="">
            Dashboard
          </Link>
          <BsSlash className="text-[#ccc]" />
          <Link href="#">Transection</Link>
        </div>
      </div>
      <div className="mt-5">
        <TransectionTableInAdmin />
      </div>
    </div>
  );
};

export default AdminTransactionPage;
