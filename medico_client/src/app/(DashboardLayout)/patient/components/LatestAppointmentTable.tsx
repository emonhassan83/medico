"use client";

import { Table } from "antd";
import { Appointment } from "@/types/appointmentType";
import { ColumnsType } from "antd/es/table";

type AppointmentData = {
  key: string;
  srNo: number;
  status: string;
  doctorName: string;
  date: string;
  time: string;
};

const LatestAppointmentTable = ({ appointments, refetch }: any) => {
  // Map data with proper keys and types
  const tableData: AppointmentData[] =
    appointments?.appointments
      ?.slice(0, 4)
      ?.map((appointment: Appointment, index: number) => ({
        key: appointment.id || `${index}`, // Use _id or fallback
        srNo: index + 1,
        status: appointment.status || "N/A",
        doctorName: `${appointment?.doctor?.firstName || "N/A"} ${
          appointment?.doctor?.lastName || ""
        }`,
        date: appointment.createdAt?.slice(0, 10) || "N/A",
        time: appointment.createdAt?.slice(11, 19) || "N/A",
      })) || [];

  const columns: ColumnsType<AppointmentData> = [
    {
      title: "Sr.No",
      dataIndex: "srNo",
      key: "srNo",
      align: "center",
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: "Doctor Name",
      dataIndex: "doctorName",
      key: "doctorName",
      align: "center",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      align: "center",
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (status: string) => {
        const backgroundColor = status !== "CANCELED" ? "#f1b44c" : "#f46a6a";
        return (
          <span
            style={{
              backgroundColor: backgroundColor,
              color: "white",
              fontSize: "10px",
              border: "none",
              padding: "2px 8px",
              borderRadius: "4px",
            }}
            className="text"
          >
            {status}
          </span>
        );
      },
    },
  ];

  return (
    <div className="">
      {/* Table Section */}
      <div className="py-5 bg-white ">
        <Table
          dataSource={tableData}
          columns={columns}
          bordered
          size="small"
          scroll={{ x: "max-content" }}
          pagination={false}
        />
      </div>
    </div>
  );
};

export default LatestAppointmentTable;
