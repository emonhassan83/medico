"use client";

import React from "react";
import { Table } from "antd";
import { useGetMyAppointmentsQuery } from "@/redux/api/appointmentApi";
import { ColumnsType } from "antd/es/table";
import Link from "next/link";

const InvoiceTableOfDoctor = ({ data }: any) => {
  const appointments = data?.appointments;
  console.log(appointments);

  const columns: ColumnsType<any> = [
    {
      title: "SL No",
      dataIndex: "key",
      key: "key",
      sorter: (a: any, b: any) => a.key - b.key,
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: "Billing Name",
      dataIndex: "patient",
      key: "patient",
      render: (patient: any) => `${patient.firstName} ${patient.lastName}`,
    },
    {
      title: "Transition Date",
      dataIndex: "createdAt",
      key: "appointmentDate",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Transition Id",
      dataIndex: "payment",
      key: "payment",
      render: (payment: any) => <div>{payment?.transactionId}</div>,
    },

    {
      title: "Amount",
      dataIndex: "payment",
      key: "payment",
      render: (payment: any) => <div>{payment?.amount}</div>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_: any, record: any) =>
        record.paymentStatus === "PAID" || record.status === "INPROGRESS"
          ? "PAID"
          : "UNPAID",
    },
    {
      title: "Option",
      dataIndex: "option",
      key: "option",
      align: "center",
      render: (_: any, data: any) => (
        <div className="flex justify-center">
          <Link href={`/doctor/invoice/${data?.id}`}>
            <button className="flex items-center bg-[#556ee6] hover:bg-blue-600 text-white py-1 px-2 rounded-full  ">
              View Details
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
          dataSource={appointments}
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

export default InvoiceTableOfDoctor;
