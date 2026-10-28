"use client";
import Card from "@/components/Dashboard/Common/Card";
import Meta from "@/components/Dashboard/Meta/MetaData";
import FullPageLoading from "@/components/Loader/FullPageLoader";
import { useGetDoctorQuery } from "@/redux/api/doctorApi";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsSlash } from "react-icons/bs";
import {
  FaHourglassHalf,
  FaRegCheckCircle,
  FaRegMoneyBillAlt,
} from "react-icons/fa";

const DoctorDetail = ({ params }: any) => {
  const { data, isLoading } = useGetDoctorQuery(params.doctorId);

  if (isLoading) {
    return <FullPageLoading />;
  }
  return (
    <>
    <Meta
        title="Details of Doctors | Medico - Hospital & Clinic Management System"
        description="This is the doctors details page of Medico where admin can manage their doctor profile manage like update and delete, and more."
      />

    <div className="mx-8">
      <div className="flex items-center justify-between mt-2">
        <div>
          <h2 className="text-lg text-[#495057] font-semibold">
            Doctor Details
          </h2>
        </div>
        <div className="flex items-center gap-1 text-[#495057] text-sm">
          <Link href="/admin" className="">
            Dashboard
          </Link>
          <BsSlash className="text-[#ccc]" />
          <Link href="/admin/doctors">Doctor</Link>
          <BsSlash className="text-[#ccc]" />
          <Link href="#">Profile</Link>
        </div>
      </div>
      <div className="py-5 grid grid-cols-1 lg:grid-cols-3 justify-center items-center gap-4 lg:gap-8">
        <div className="col-span-1">
          <div>
            <div className="w-full mt-10 lg:mt-14 mx-auto flex justify-center items-center bg-white rounded-lg">
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
                  <div className="text-white text-sm bg-[#556ee6] py-2 px-4 rounded-md mx-auto flex justify-center">
                    {data?.registrationNumber || "Not Available"}
                  </div>
                </div>
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
                    <p className="text-gray-600 text-sm">{data?.gender}</p>
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
              title="Specialties"
              number={data?.doctorSpecialties?.length || 0}
              icon={<FaRegCheckCircle size={24} />}
            />
            <Card
              title="Schedules"
              number={data?.schedules?.length || 0}
              icon={<FaHourglassHalf size={24} />}
            />
            <Card
              title="Appointment Fee"
              number={data?.appointmentFee + "$" || 0}
              icon={<FaRegMoneyBillAlt size={24} />}
            />
          </div>
          <div className="w-full mt-5 lg:mt-8 mx-auto bg-white rounded-lg p-5">
            <p className="text-gray-600 font-semibold text-center">
              Professional Information
            </p>
            <div className="mt-[18px]">
              <div className="flex p-[18px] bg-slate-50">
                <div className="w-full">
                  <p className="text-gray-600 font-semibold text-sm">
                    Working Place:
                  </p>
                </div>
                <div className="w-full">
                  <p className="text-gray-600 text-sm capitalize">
                    {data?.currentWorkingPlace ||
                      "123 Medical Lane, Health City, NY, 10001"}
                  </p>
                </div>
              </div>
              <div className="flex p-[18px]">
                <div className="w-full">
                  <p className="text-gray-600 font-semibold text-sm">
                    Designation:
                  </p>
                </div>
                <div className="w-full">
                  <p className="text-gray-600 text-sm capitalize">
                    {data?.designation || "Assistant Doctor"}
                  </p>
                </div>
              </div>
              <div className="flex p-[18px] bg-slate-50">
                <div className="w-full">
                  <p className="text-gray-600 font-semibold text-sm">
                    Qualification :
                  </p>
                </div>
                <div className="w-full">
                  <p className="text-gray-600 text-sm">
                    {data?.qualification || "MBBS, MD"}
                  </p>
                </div>
              </div>
              <div className="flex p-[18px]">
                <div className="w-full">
                  <p className="text-gray-600 font-semibold text-sm">
                    Experience:
                  </p>
                </div>
                <div className="w-full">
                  <p className="text-gray-600 text-sm">
                    {data?.experience + " years" || "10 Years"}
                  </p>
                </div>
              </div>
              <div className="flex p-[18px] bg-slate-50">
                <div className="w-full">
                  <p className="text-gray-600 font-semibold text-sm">
                    Average Rating:
                  </p>
                </div>
                <div className="w-full">
                  <p className="text-gray-600 text-sm">
                    {data?.averageRating || "4.5"}
                  </p>
                </div>
              </div>
              <div className="flex p-[18px]">
                <div className="w-full">
                  <p className="text-gray-600 font-semibold text-sm">
                    Registration Number :
                  </p>
                </div>
                <div className="w-full">
                  <p className="text-gray-600 text-sm capitalize">
                    {data?.registrationNumber || "Not Available"}
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

export default DoctorDetail;
