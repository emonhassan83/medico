"use client";
import { useGetSinglePatientQuery } from "@/redux/api/patientApi";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsSlash } from "react-icons/bs";

const PatientDetail = ({ params }: any) => {
  const { data } = useGetSinglePatientQuery(params.id);
  console.log(data);
  return (
    <div className="mx-8">
      <div className="flex items-center justify-between mt-2">
        <div>
          <h2 className="text-lg text-[#495057] font-semibold">
            Patient Profile
          </h2>
        </div>
        <div className="flex items-center gap-1 text-[#495057] text-sm">
          <Link href="#" className="">
            Dashboard
          </Link>
          <BsSlash className="text-[#ccc]" />
          <Link href="#">Patient</Link>
          <BsSlash className="text-[#ccc]" />
          <Link href="#">Profile</Link>
        </div>
      </div>
      {/* <div className="my-5 grid grid-cols-1 lg:grid-cols-3 justify-center items-center gap-4 lg:gap-8">
        <div className="col-span-1 border p-5"></div>
        <div className="col-span-1 lg:col-span-2 border p-5"></div>
      </div> */}
      <div className="w-full lg:w-1/3 mt-10 lg:mt-20 mx-auto flex justify-center items-center bg-white rounded-lg">
        <div>
          <Image
            src={
              data?.profilePhoto ||
              "https://avatar.iran.liara.run/public/boy?username=Ash"
            }
            alt={(data?.name as string) || "userimage"}
            className="max-w-full h-auto rounded-full border-4 p-1 border-indigo-500 mx-auto -mt-16"
            width="120"
            height="120"
          />
          <div className="my-5">
            <Link
              href={`/admin/patients/${params.id}/edit`}
              className="text-white text-sm bg-[#556ee6] py-2 px-4 rounded-md mx-auto flex justify-center"
            >
              Edit Profile
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/3 mt-5 lg:mt-8 mx-auto bg-white rounded-lg p-5">
        <p className="text-gray-600 font-semibold">Personal Informantion</p>
        <div className="mt-5 divide-y-2">
          <div className="flex py-2">
            <div className="w-full">
              <p className="text-gray-600 font-semibold text-sm">Full Name:</p>
            </div>
            <div className="w-full">
              <p className="text-gray-600 text-sm capitalize">
                {data?.firstName} {data?.lastName}
              </p>
            </div>
          </div>
          <div className="flex py-2">
            <div className="w-full">
              <p className="text-gray-600 font-semibold text-sm">Contact No:</p>
            </div>
            <div className="w-full">
              <p className="text-gray-600 text-sm capitalize">
                {data?.contactNumber}
              </p>
            </div>
          </div>
          <div className="flex py-2">
            <div className="w-full">
              <p className="text-gray-600 font-semibold text-sm">Email:</p>
            </div>
            <div className="w-full">
              <p className="text-gray-600 text-sm capitalize">{data?.email}</p>
            </div>
          </div>
          <div className="flex py-2">
            <div className="w-full">
              <p className="text-gray-600 font-semibold text-sm">Address: </p>
            </div>
            <div className="w-full">
              <p className="text-gray-600 text-sm capitalize">{data?.address}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetail;
