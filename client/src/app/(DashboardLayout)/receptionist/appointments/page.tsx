"use client";

import Meta from "@/components/Dashboard/Meta/MetaData";
import CreateCalenderInReception from "@/components/Dashboard/Receptionist/Appointment/CreateCalenderInReception";
import FullPageLoading from "@/components/Loader/FullPageLoader";
import { useGetAllAppointmentsQuery } from "@/redux/api/appointmentApi";
import Link from "next/link";
import { BsSlash } from "react-icons/bs";

const AppointmentPageOfDoctor = () => {
  const { data, isLoading } = useGetAllAppointmentsQuery({});

  if (isLoading) {
    return <FullPageLoading />;
  }
  return (
   <>
   <Meta
        title="Book Appointment | Medico - Hospital & Clinic Management System"
        description="This is the receptionist list appointment of Medico where a can show receptionist their appointments with calender date."
      />

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
        <CreateCalenderInReception data={data} />
      </div>
    </div>
   </>
  );
};

export default AppointmentPageOfDoctor;
