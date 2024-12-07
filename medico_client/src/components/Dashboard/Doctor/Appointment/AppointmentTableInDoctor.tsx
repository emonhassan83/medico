import React from "react";
import { Table } from "antd";
import { useGetAllAppointmentsQuery, useGetMyAppointmentsQuery } from "@/redux/api/appointmentApi";
import { ColumnsType } from "antd/es/table";

interface DataType {
  key: React.Key;
  doctorName: string;
  number: string;
  time: string;
  SrNo: number;
}

const AppointmentTableInDoctor = () => {
  const { data, isLoading } = useGetAllAppointmentsQuery({});
  const currentDate = new Date();

  // Format the date
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const columns: ColumnsType<DataType> = [
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
      render: (patient: any) => `${patient.firstName} ${patient.lastName}`,
    },

    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
    },

    {
      title: "Time",
      dataIndex: "createdAt",
      key: "createdAtTime",
      render: (time: string) => new Date(time).toLocaleTimeString(),
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
          dataSource={data?.appointments}
          size="middle"
          bordered
          pagination={false}
        />
      </div>
    </div>
  );
};

export default AppointmentTableInDoctor;
