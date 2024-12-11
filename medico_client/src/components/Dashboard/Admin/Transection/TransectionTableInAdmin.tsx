"use client";

import React from "react";
import { Table, Button } from "antd";
import { useGetAllAppointmentsQuery } from "@/redux/api/appointmentApi";
import { ColumnsType } from "antd/es/table";

const TransectionTableInAdmin = () => {
  const { data, isLoading } = useGetAllAppointmentsQuery({});
  const appointments = data?.appointments;

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
      title: "Transaction No",
      dataIndex: "payment",
      key: "payment",
      render: (payment: any) =>
        <div>{payment?.transactionId}</div>
    },
    {
      title: "Amount($)",
      dataIndex: "payment",
      key: "payment",
      render: (payment: any) =>
        <div>{payment?.amount}</div>
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "appointmentDate",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Time",
      dataIndex: "createdAt",
      key: "createdAtTime",
      render: (time: string) => new Date(time).toLocaleTimeString(),
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
          size="middle"
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

export default TransectionTableInAdmin;
