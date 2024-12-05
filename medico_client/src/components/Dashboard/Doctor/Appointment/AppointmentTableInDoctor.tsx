import React from "react";
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

const data: DataType[] = [
  {
    key: "1",
    SrNo: 1,
    doctorName: "John Brown",
    number: "32",
    time: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    SrNo: 2,
    doctorName: "Jim Green",
    number: "42",
    time: "London No. 1 Lake Park",
  },
  {
    key: "3",
    SrNo: 3,
    doctorName: "Joe Black",
    number: "32",
    time: "Sydney No. 1 Lake Park",
  },
];

const AppointmentTableInDoctor = () => {
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
      <div className="flex items-center gap-2 bg-white pt-5 ps-5">
        <h2 className="text-lg font-semibold">Appointment List |</h2>
        <p>{formattedDate}</p>
      </div>
      <div className=" bg-white p-5">
        <Table<DataType>
          columns={columns}
          dataSource={data}
          size="middle"
          pagination={false}
        />
      </div>
    </div>
  );
};

export default AppointmentTableInDoctor;
