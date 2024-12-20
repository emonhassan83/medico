"use client";

import React, { useEffect, useState } from "react";
import { Table } from "antd";
import Link from "next/link";
import { FaEye } from "react-icons/fa";
import { useGetAllPrescriptionQuery } from "@/redux/api/prescriptionApi";
import { useGetMyProfileQuery } from "@/redux/api/userApi";

const PrescriptionTable = () => {
  const [dataSource, setDataSource] = useState<any>([]);
  const { data, isLoading } = useGetAllPrescriptionQuery([]);
  const { data: profile, isLoading: isProfileLoading } = useGetMyProfileQuery(
    {}
  );

  useEffect(() => {
    if (data) {
      const fData = data?.prescription.filter(
        (d: any) => d?.patient?.id === profile?.id
      );

      const dataSource = fData?.map((prescription: any) => ({
        instructions: prescription?.instructions,
        doctorName: prescription?.doctor?.firstName,
        appointmentDate: prescription?.appointment?.createdAt?.slice(
          0,
          10
        ),
        appointmentTime: prescription?.appointment?.createdAt?.slice(
          11,
          19
        ),
        id: prescription?.id,
      }));

      setDataSource(dataSource);
    }
  }, [data, profile?.id]);

  const columns = [
    {
      title: "Sr. No",
      dataIndex: "key",
      key: "key",
      sorter: (a: any, b: any) => a.key - b.key,
      render: (_: any, __: any, index: number) => index + 1,
    },

    {
      title: "Doctor Name",
      dataIndex: "doctorName",
      key: "doctorName",
    },
    {
      title: "Appointment Date",
      dataIndex: "appointmentDate",
      key: "appointmentDate",
    },
    {
      title: "Appointment Time",
      dataIndex: "appointmentTime",
      key: "appointmentTime",
    },
    {
      title: "Options",
      key: "action",
      render: (data: any) => (
        <div className="flex gap-1">
          <Link href={`/patient/prescription/${data?.id}`}>
            <button className="flex items-center bg-[#556ee6] hover:bg-blue-600 text-white py-1 px-2 rounded-3xl">
             View
            </button>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white p-5">
      <div>
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={{ pageSize: data?.meta?.limit }}
          bordered
          rowKey="id"
        />
      </div>
      <div className="relative hidden md:block">
        {data?.meta?.page === 1 ? (
          <div className="absolute text-[#495072] text-sm bottom-6">
            {data?.meta?.total <= 10 ? (
              <div>
                showing 1 to {data?.meta?.total} of {data?.meta?.total} entries
              </div>
            ) : (
              <div>
                showing 1 to {data?.meta?.limit} of {data?.meta?.total} entries
              </div>
            )}
          </div>
        ) : (
          <div className="absolute text-[#495072]  text-sm bottom-6">
            showing 1 to (({data?.meta?.page} - 1)* {data?.meta?.limit} ) of{" "}
            {data?.meta?.total} entries
          </div>
        )}
      </div>
    </div>
  );
};

export default PrescriptionTable;
