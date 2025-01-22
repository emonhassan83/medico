"use client";

import Meta from "@/components/Dashboard/Meta/MetaData";
import FullPageLoading from "@/components/Loader/FullPageLoader";
import { useGetAllPrescriptionQuery } from "@/redux/api/prescriptionApi";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsSlash } from "react-icons/bs";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";

const PrescriptionDetails = ({ params }: any) => {
  const { data, isLoading } = useGetAllPrescriptionQuery({});
  const [filter, setFilter] = useState<any>({});

  useEffect(() => {
    if (data) {
      const fData = data?.prescription.find((d: any) => d.id === params?.id);
      setFilter(fData);
    }
  }, [data, params]);

  if (isLoading) {
    return <FullPageLoading />;
  }
  return (
    <>
    <Meta
        title="Details Prescription | Medico - Hospital & Clinic Management System"
        description="This is the details of prescription page of Medico where doctors can show all their details prescription and view details information."
      />

    <div className="mx-5 pb-4">
      <div className="flex items-center justify-between mt-2">
        <div>
          <h2 className="text-lg text-[#495057] font-semibold">
            PRESCRIPTION LIST
          </h2>
        </div>
        <div className="flex items-center gap-1 text-[#495057] text-sm">
          <Link href="/doctor" className="">
            Dashboard
          </Link>
          <BsSlash className="text-[#ccc]" />
          <Link href="/doctor/prescription">Prescription List</Link>
          <BsSlash className="text-[#ccc]" />
          <Link href="#">Prescription Details</Link>
        </div>
      </div>
      <div className="mt-5">
        <Link
          href="/doctor/prescription"
          className="text-white text-sm bg-[#556ee6] py-2 px-4 rounded-md"
        >
          Back to Prescription List
        </Link>
      </div>
      <div className="mt-4 lg:mt-8 p-5 bg-white">
        <div className="text-xl font-medium flex justify-center items-center gap-1">
          <Image
            src="/Logo.png"
            className="font-extrabold"
            width={50}
            height={40}
            alt="Logo"
          />
          <p className="text-[#b2b2b2] font-bold text-2xl uppercase tracking-[0.1em] text-center">
            Medico
          </p>
        </div>
        <div className="my-4 lg:my-8 flex justify-between items-start">
          <div className="text-gray-800">
            <p className="font-semibold">Dr.</p>
            <p>
              {filter?.doctor?.firstName} {filter?.doctor?.lastName}
            </p>
            <p className="flex items-center gap-2">
              <FaPhoneAlt /> {filter?.doctor?.contactNumber}
            </p>
            <p className="flex items-center gap-2">
              <FaEnvelope />
              {filter?.doctor?.email}
            </p>
          </div>
          <div className="text-gray-800">
            <p className="font-semibold">Patient</p>
            <p>
              {filter?.patient?.firstName} {filter?.patient?.lastName}
            </p>
            <p className="flex items-center gap-2">
              <FaPhoneAlt /> {filter?.patient?.contactNumber}
            </p>
            <p className="flex items-center gap-2">
              <FaEnvelope />
              {filter?.patient?.email}
            </p>
          </div>
          <div className="text-gray-800">
            <p className="font-semibold">
              Prescription Date:{" "}
              <span className="font-light">
                {filter?.createdAt?.slice(0, 10)}{" "}
                {filter?.createdAt?.slice(11, 19)}
              </span>
            </p>
            <p className="font-semibold">
              Appointment Date:{" "}
              <span className="font-light">
                {filter?.appointment?.createdAt?.slice(0, 10)}{" "}
                {filter?.appointment?.createdAt?.slice(11, 19)}
              </span>
            </p>
            <p className="font-semibold">
              Follow-up Date:{" "}
              <span className="font-light">
                {filter?.followUpDate?.slice(0, 10)}{" "}
                {filter?.followUpDate?.slice(11, 19)}
              </span>
            </p>
          </div>
        </div>
        <div
          className="blog p-4"
          dangerouslySetInnerHTML={{ __html: filter.instructions }}
        />
      </div>
    </div>
    </>
  );
};

export default PrescriptionDetails;
