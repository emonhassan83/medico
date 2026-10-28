"use client";

import React from "react";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import Link from "next/link";
import { FaEye } from "react-icons/fa";

const InvoiceTable = ({appointments}: any) => {
  const appointmentData = appointments?.appointments;

  const columns: ColumnsType<any> = [
    {
      title: "SL No",
      dataIndex: "key",
      key: "key",
      sorter: (a: any, b: any) => a.key - b.key,
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: "Patient Name",
      dataIndex: "patient",
      key: "patient",
      render: (patient: any) => `${patient?.firstName} ${patient?.lastName}`,
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
        <div className="flex justify-center items-center gap-1">
          <Link href={`/admin/transaction`}>
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
          dataSource={appointmentData}
          columns={columns}
          pagination={{ pageSize: appointments?.meta?.limit }}
          bordered
          size="middle"
          rowKey="id"
        />
      </div>
      <div className="relative hidden md:block">
        {appointments?.meta?.page === 1 ? (
          <div className="absolute text-[#495072] text-sm bottom-6">
            {appointments?.meta?.total <= 10 ? (
              <div>
                showing 1 to {appointments?.meta?.total} of {appointments?.meta?.total} entries
              </div>
            ) : (
              <div>
                showing 1 to {appointments?.meta?.limit} of {appointments?.meta?.total} entries
              </div>
            )}
          </div>
        ) : (
          <div className="absolute text-[#495072]  text-sm bottom-6">
            showing 1 to (({appointments?.meta?.page} - 1)* {appointments?.meta?.limit} ) of{" "}
            {appointments?.meta?.total} entries
          </div>
        )}
      </div>
    </div>
  );
};

export default InvoiceTable;
