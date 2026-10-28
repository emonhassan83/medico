"use client";

import { Table} from "antd";
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

const AppointmentTable = ({appointments}: any) => {
  // Map data with proper keys and types
  const tableData: AppointmentData[] =
  appointments?.appointments.slice(0, 4)?.map((appointment: Appointment, index: number) => ({
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
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: "Doctor Name",
      dataIndex: "doctorName",
      key: "doctorName",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
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
      <div className="p-5  bg-white ">
        <Table
          dataSource={tableData}
          columns={columns}
          pagination={{ pageSize: 10 }}
          bordered
        />
      </div>
     
    </div>
  );
};

export default AppointmentTable;
