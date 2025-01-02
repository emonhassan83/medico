"use client";
import React, { useState, useEffect } from "react";
import { Table } from "antd";
import type { TableColumnsType } from "antd";

interface DataType {
  key: React.Key;
  doctorName: string;
  number: string;
  time: string;
  SrNo: number;
}

const columns: TableColumnsType<DataType> = [
  {
    title: "SrNo",
    dataIndex: "SrNo",
    render: (_: any, __: any, index: number) => index + 1,
  },
  {
    title: "Doctor Name",
    dataIndex: "doctorName",
  },
  {
    title: "Doctor Number",
    dataIndex: "number",
  },
  {
    title: "Time",
    dataIndex: "time",
  },
];

const AppointmentTable = ({ date }: { date: any }) => {
  // State to store the selected date
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
        doctorName: `${d?.doctor?.firstName || "N/A"} ${
          d?.doctor?.lastName || ""
        }`,
        number: `${d?.doctor?.contactNumber || "N/A"}`,
        time: d.schedule?.startDate?.slice(11, 19) || "N/A",
      })) || [];

  const fDate = new Date(selectedDate);
  const formattedDate = fDate?.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="w-full p-5 bg-white">
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-semibold">Appointment List |</h2>
        <p>{formattedDate}</p> {/* Display the formatted date */}
      </div>
      <div>
        <Table<DataType>
          columns={columns}
          dataSource={tableData}
          bordered
          size="small"
          scroll={{ x: "max-content" }}
          pagination={false}
        />
      </div>
    </div>
  );
};

export default AppointmentTable;
