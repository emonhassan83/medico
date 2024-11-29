import React from "react";
import { Table } from "antd";
import type { TableColumnsType } from "antd";

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
  SrNo: number;
}

const columns: TableColumnsType<DataType> = [
  {
    title: "SrNo",
    dataIndex: "SrNo",
  },
  {
    title: "Doctor Name",
    dataIndex: "doctorName",
  },
  {
    title: "Doctor Number",
    dataIndex: "age",
  },
  {
    title: "Time",
    dataIndex: "address",
  },
];

const data: DataType[] = [
  {
    key: "1",
    SrNo: 1,
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    SrNo: 2,
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    SrNo: 3,
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
  },
];

const AppointmentTable = () => {
  // Get the current date
  const date = new Date();

  // Format the date
  const formattedDate = date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  return (
    <div className="w-full">
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-semibold">Appointment List |</h2>
        <p>{formattedDate}</p>
      </div>
      <Table<DataType> columns={columns} dataSource={data} size="middle" />
    </div>
  );
};

export default AppointmentTable;
