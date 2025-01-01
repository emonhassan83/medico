"use client";
import React, { useState, useEffect } from "react";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";

interface DataType {
  key: React.Key;
  doctorName: string;
  number: string;
  time: string;
  SrNo: number;
}

const AppointmentTableInDoctor = ({ date }: any) => {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().slice(0, 10)
  ); // Defaults to today

  useEffect(() => {
    if (date?.length > 0) {
      const fDate = new Date(date[0]?.schedule?.startDate?.slice(0, 10));
      const formattedDate = fDate?.toISOString().slice(0, 10);
      setSelectedDate(formattedDate);
    }
  }, [date]);

  const tableData: any =
    date
      ?.filter(
        (d: any) => d?.schedule?.startDate?.slice(0, 10) === selectedDate
      )
      .map((d: any, index: number) => ({
        key: d.id || `${index}`,
        srNo: index + 1,
        patient: `${d?.patient?.firstName || "N/A"} ${
          d?.patient?.lastName || ""
        }`,
        paymentStatus: `${d?.payment?.status || "N/A"}`,
        number: `${d?.patient?.contactNumber || "N/A"}`,
        time: d.schedule?.startDate?.slice(11, 19) || "N/A",
      })) || [];

  const fDate = new Date(selectedDate);
  const formattedDate = fDate?.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const columns: ColumnsType<DataType> = [
    {
      title: "SL No",
      dataIndex: "key",
      key: "key",
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: "Patient Name",
      dataIndex: "patient",
      key: "patient",
    },
    {
      title: "Patient Number",
      dataIndex: "number",
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
    },
    {
      title: "Time",
      dataIndex: "time",
    },
  ];

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 bg-white pt-5 ps-5">
        <h2 className="text-lg font-semibold">Appointment List |</h2>
        <p>{formattedDate}</p>
      </div>
      <div className=" bg-white p-5">
        <Table<DataType>
          columns={columns}
          dataSource={tableData}
          size="middle"
          bordered
          pagination={false}
        />
      </div>
    </div>
  );
};

export default AppointmentTableInDoctor;
