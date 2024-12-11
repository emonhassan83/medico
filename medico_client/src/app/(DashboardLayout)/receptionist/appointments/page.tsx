import CreateCalenderInReception from "@/components/Dashboard/Receptionist/Appointment/CreateCalenderInReception";
import Link from "next/link";
import { BsSlash } from "react-icons/bs";

const AppointmentPageOfDoctor = () => {
  return (
    <div className="mx-5">
      <div className="flex items-center justify-between mt-2">
        <div>
          <h2 className="text-lg text-[#495057] font-semibold">
            All Appointment
          </h2>
        </div>
        <div className="flex items-center gap-1 text-[#495057] text-sm">
          <Link href="/receptionist" className="">
            Dashboard
          </Link>
          <BsSlash className="text-[#ccc]" />
          <Link href="#">Appointment</Link>
        </div>
      </div>
      
      <div>
        <CreateCalenderInReception />
      </div>
    </div>
  );
};

export default AppointmentPageOfDoctor;
