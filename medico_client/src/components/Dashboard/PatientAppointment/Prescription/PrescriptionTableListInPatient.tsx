"use client";

import React, { useEffect, useState } from "react";
import { Table } from "antd";
import Link from "next/link";
import { FaEye } from "react-icons/fa";

const PrescriptionTableListInPatient = ({ data, profile }: any) => {
  const [dataSource, setDataSource] = useState<any>([]);

  useEffect(() => {
    if (data) {
      const fData = data?.prescription.filter(
        (d: any) => d?.patient?.id === profile?.id
      );

      const dataSource = fData?.map((singlePresecription: any) => ({
        instructions: singlePresecription?.instructions,
        doctorName: singlePresecription?.doctor?.firstName,
        appointmentDate: singlePresecription?.appointment?.createdAt?.slice(
          0,
          10
        ),
        appointmentTime: singlePresecription?.appointment?.createdAt?.slice(
          11,
          19
        ),
        id: singlePresecription?.id,
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
            <button className="flex items-center bg-[#556ee6] hover:bg-blue-600 text-white p-2 rounded-full  ">
              <FaEye />
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
          size="small"
          scroll={{ x: "max-content" }}
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

export default PrescriptionTableListInPatient;
