"use client";

import Meta from "@/components/Dashboard/Meta/MetaData";
import CreateAppointmentForm from "@/components/Dashboard/PatientAppointment/CreateAppointmentForm";
import Link from "next/link";
import React from "react";
import { BsSlash } from "react-icons/bs";
import { TiArrowLeft } from "react-icons/ti";

const CreateAppointment = () => {
  return (
    <>
      <Meta
        title="Create Appointment | Medico - Hospital & Clinic Management System"
        description="This is the patient create appointment of Medico where patients can create their appointments."
      />

      <div className="mx-5">
        <div className="flex items-center justify-between mt-5">
          <div>
            <h2 className="text-lg text-[#495057] font-semibold">
              Book Appointment
            </h2>
          </div>
          <div className="flex items-center gap-1 text-[#495057] text-sm">
            <Link href="#" className="">
              Dashboard
            </Link>
            <BsSlash className="text-[#ccc]" />
            <Link href="#">Booked Appointment</Link>
          </div>
        </div>
        <div className="mt-5">
          <Link
            href="/patient/appointments"
            className="flex items-center gap-2 w-[100px] text-white text-sm bg-[#556ee6] hover:bg-blue-700 py-3 px-3 rounded-md"
          >
            <TiArrowLeft className="text-lg" /> Back
          </Link>
        </div>
        <div className="bg-white mt-5 ">
          <div className=" p-5">
            <div className="border border-l-4 border-l-[#556ee6]  py-2">
              <h2 className="text-lg text-[#495057] font-normal ms-7">
                Book Appointment
              </h2>
            </div>
            <CreateAppointmentForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateAppointment;
