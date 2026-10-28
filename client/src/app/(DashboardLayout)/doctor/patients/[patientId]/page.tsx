"use client";

import Card from "@/components/Dashboard/Common/Card";
import Meta from "@/components/Dashboard/Meta/MetaData";
import FullPageLoading from "@/components/Loader/FullPageLoader";
import { useGetSinglePatientQuery } from "@/redux/api/patientApi";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsSlash } from "react-icons/bs";
import {
  FaHourglassHalf,
  FaRegCheckCircle,
  FaRegMoneyBillAlt,
} from "react-icons/fa";

const PatientDetail = ({ params }: any) => {
  const { data, isLoading } = useGetSinglePatientQuery(params.patientId);

  if (isLoading) {
    return <FullPageLoading />;
  }
  return (
    <>
      <Meta
        title="Details Patient| Medico - Hospital & Clinic Management System"
        description="This is the details of patient list page of Medico where doctor can view details of patient and more."
      />

      <div className="mx-8">
        <div className="flex items-center justify-between mt-2">
          <div>
            <h2 className="text-lg text-[#495057] font-semibold">
              Patient Profile
            </h2>
          </div>
          <div className="flex items-center gap-1 text-[#495057] text-sm">
            <Link href="/doctor" className="">
              Dashboard
            </Link>
            <BsSlash className="text-[#ccc]" />
            <Link href="/doctor/patients">Patient</Link>
            <BsSlash className="text-[#ccc]" />
            <Link href="#">Profile</Link>
          </div>
        </div>
        <div className="py-5 grid grid-cols-1 lg:grid-cols-3 justify-center items-center gap-4 lg:gap-8">
          <div className="col-span-1">
            <div>
              <div className="w-full mt-10 lg:mt-14 mx-auto flex justify-center items-center bg-white rounded-lg">
                <div className="p-2">
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
                  {/* <div className="my-5">
                    <Link
                      href={`/admin/patients/${params.id}/edit`}
                      className="text-white text-sm bg-[#556ee6] py-2 px-4 rounded-md mx-auto flex justify-center"
                    >
                      Edit Profile
                    </Link>
                  </div> */}
                </div>
              </div>
              <div className="w-full mt-5 lg:mt-8 mx-auto bg-white rounded-lg p-5">
                <p className="text-gray-600 font-semibold text-center">
                  Personal Information
                </p>
                <div className="mt-5 divide-y-2">
                  <div className="flex py-2">
                    <div className="w-full">
                      <p className="text-gray-600 font-semibold text-sm">
                        Full Name:
                      </p>
                    </div>
                    <div className="w-full">
                      <p className="text-gray-600 text-sm capitalize">
                        {data?.firstName} {data?.lastName}
                      </p>
                    </div>
                  </div>
                  <div className="flex py-2">
                    <div className="w-full">
                      <p className="text-gray-600 font-semibold text-sm">
                        Contact No:
                      </p>
                    </div>
                    <div className="w-full">
                      <p className="text-gray-600 text-sm capitalize">
                        {data?.contactNumber}
                      </p>
                    </div>
                  </div>
                  <div className="flex py-2">
                    <div className="w-full">
                      <p className="text-gray-600 font-semibold text-sm">
                        Email:
                      </p>
                    </div>
                    <div className="w-full">
                      <p className="text-gray-600 text-sm">{data?.email}</p>
                    </div>
                  </div>
                  <div className="flex py-2">
                    <div className="w-full">
                      <p className="text-gray-600 font-semibold text-sm">
                        Address:
                      </p>
                    </div>
                    <div className="w-full">
                      <p className="text-gray-600 text-sm capitalize">
                        {data?.address}
                      </p>
                    </div>
                  </div>
                  <div className="flex py-2">
                    <div className="w-full">
                      <p className="text-gray-600 font-semibold text-sm">
                        Gender:
                      </p>
                    </div>
                    <div className="w-full">
                      <p className="text-gray-600 text-sm">
                        {data?.patientHealthData?.gender}
                      </p>
                    </div>
                  </div>
                  <div className="flex py-2">
                    <div className="w-full">
                      <p className="text-gray-600 font-semibold text-sm">
                        Registered:
                      </p>
                    </div>
                    <div className="w-full">
                      <p className="text-gray-600 text-sm">{data?.createdAt}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-1 lg:col-span-2 h-full">
            <div className="grid grid-cols-3 gap-7">
              <Card
                title="Appointments"
                number={data?.medicalReport?.length || 0}
                icon={<FaRegCheckCircle size={24} />}
              />
              <Card
                title="Pending Bills"
                number={`$57`}
                icon={<FaHourglassHalf size={24} />}
              />
              <Card
                title="Total Bill"
                number={`$57`}
                icon={<FaRegMoneyBillAlt size={24} />}
              />
            </div>
            <div className="w-full mt-5 lg:mt-8 mx-auto bg-white rounded-lg p-5">
              <p className="text-gray-600 font-semibold text-center">
                Medical Informantion
              </p>
              <div className="mt-[18px]">
                <div className="flex p-[18px] bg-slate-50">
                  <div className="w-full">
                    <p className="text-gray-600 font-semibold text-sm">
                      Height:
                    </p>
                  </div>
                  <div className="w-full">
                    <p className="text-gray-600 text-sm capitalize">
                      {data?.patientHealthData?.height || "5'9"}
                    </p>
                  </div>
                </div>
                <div className="flex p-[18px]">
                  <div className="w-full">
                    <p className="text-gray-600 font-semibold text-sm">
                      Weight:
                    </p>
                  </div>
                  <div className="w-full">
                    <p className="text-gray-600 text-sm capitalize">
                      {data?.patientHealthData?.weight || "73kg"}
                    </p>
                  </div>
                </div>
                <div className="flex p-[18px] bg-slate-50">
                  <div className="w-full">
                    <p className="text-gray-600 font-semibold text-sm">
                      Blood Group:
                    </p>
                  </div>
                  <div className="w-full">
                    <p className="text-gray-600 text-sm">
                      {data?.patientHealthData?.bloodGroup || "A_POSITIVE"}
                    </p>
                  </div>
                </div>
                <div className="flex p-[18px]">
                  <div className="w-full">
                    <p className="text-gray-600 font-semibold text-sm">
                      Date of Birth:
                    </p>
                  </div>
                  <div className="w-full">
                    <p className="text-gray-600 text-sm capitalize">
                      {data?.patientHealthData?.dateOfBirth || "05-02-1999"}
                    </p>
                  </div>
                </div>
                <div className="flex p-[18px] bg-slate-50">
                  <div className="w-full">
                    <p className="text-gray-600 font-semibold text-sm">
                      Past Surgeries:
                    </p>
                  </div>
                  <div className="w-full">
                    <p className="text-gray-600 text-sm">
                      {data?.patientHealthData?.hasPastSurgeries ? "Yes" : "No"}
                    </p>
                  </div>
                </div>
                <div className="flex p-[18px]">
                  <div className="w-full">
                    <p className="text-gray-600 font-semibold text-sm">
                      Smoking Status:
                    </p>
                  </div>
                  <div className="w-full">
                    <p className="text-gray-600 text-sm capitalize">
                      {data?.patientHealthData?.smokingStatus
                        ? "Smoker"
                        : "Non-smoker"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PatientDetail;
