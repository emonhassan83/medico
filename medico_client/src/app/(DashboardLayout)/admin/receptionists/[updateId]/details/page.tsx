"use client";

import Meta from "@/components/Dashboard/Meta/MetaData";
import FullPageLoading from "@/components/Loader/FullPageLoader";
import { useGetReceptionistQuery } from "@/redux/api/receptionistApi";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsSlash } from "react-icons/bs";

const ReceptionistDetails = ({ params }: any) => {
  const { data, isLoading } = useGetReceptionistQuery(params.updateId);

  if (isLoading) {
    return <FullPageLoading/>;
  }

  return (
    <>
    <Meta
        title="Receptionist Details | Medico - Hospital & Clinic Management System"
        description="This is the receptionist details page of Medico where admin can show all their information."
      />

    <div className="mx-8">
      <div className="flex items-center justify-between mt-2">
        <div>
          <h2 className="text-lg text-[#495057] font-semibold">
            Receptionist Details
          </h2>
        </div>
        <div className="flex items-center gap-1 text-[#495057] text-sm">
          <Link href="#/admin" className="">
            Dashboard
          </Link>
          <BsSlash className="text-[#ccc]" />
          <Link href="/admin/receptionists">Receptionist</Link>
          <BsSlash className="text-[#ccc]" />
          <Link href="#">Details</Link>
        </div>
      </div>
      <div className="py-5 justify-center items-center gap-4 lg:gap-8">
        <div className="">
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
                      Registered:
                    </p>
                  </div>
                  <div className="w-full">
                    <p className="text-gray-600 text-sm">
                      {data?.createdAt?.slice(0, 10)}
                    </p>
                  </div>
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

export default ReceptionistDetails;
