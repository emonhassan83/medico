"use client";
import React, { useState } from "react";
import { Table } from "antd";
import Link from "next/link";
import { FaEye } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import {
  useGetAllPrescriptionQuery,
  useGetMyPrescriptionQuery,
} from "@/redux/api/prescriptionApi";

const PrescriptionTableListInPatient = () => {
  // const { data } = useGetAllPrescriptionQuery({});
  // console.log(data);
  const { data } = useGetMyPrescriptionQuery({});
  // console.log(data);

  const dataSource = data?.prescription?.map((singlePresecription: any) => ({
    instructions: singlePresecription?.instructions,
    doctorName: singlePresecription?.doctor?.firstName,
    appointmentDate: singlePresecription?.appointment?.createdAt?.slice(0, 10),
    appointmentTime: singlePresecription?.appointment?.createdAt?.slice(11, 19),
  }));

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
      title: "Instructions",
      dataIndex: "instructions",
      key: "instructions",
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

export default PrescriptionTableListInPatient;
