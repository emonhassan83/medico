"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Button, Table, Tag, Space, TableColumnsType } from "antd";
import { BsSlash } from "react-icons/bs";

interface AppointmentData {
  key: React.Key;
  srNo: number;
  doctorName: string;
  date: string;
  time: string;
  status: string;
}

const columns = (
  handleCancel: (key: React.Key) => void
): TableColumnsType<AppointmentData> => [
  {
    title: "Sr. No",
    dataIndex: "srNo",
    key: "srNo",
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
      const backgroundColor = status === "Pending" ? "#f1b44c" : "#f46a6a";
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
  {
    title: "Action",
    key: "action",
    render: (_: any, record: AppointmentData) => (
      <Space>
        {record.status === "Pending" && (
          <Button
            type="primary"
            style={{ backgroundColor: "#f46a6a" }}
            onClick={() => handleCancel(record.key)}
          >
            Cancel
          </Button>
        )}
      </Space>
    ),
  },
];

const dataSource: AppointmentData[] = [
  {
    key: 1,
    srNo: 1,
    doctorName: "Houston Greenfelder",
    date: "2024-11-29",
    time: "10:00:00 to 12:30:00",
    status: "Pending",
  },
  {
    key: 2,
    srNo: 2,
    doctorName: "Grace Nicolas II",
    date: "2024-11-28",
    time: "10:00:00 to 12:30:00",
    status: "Pending",
  },
  {
    key: 3,
    srNo: 3,
    doctorName: "Andre Cronin",
    date: "2024-11-27",
    time: "16:00:00 to 17:30:00",
    status: "Pending",
  },
  {
    key: 4,
    srNo: 4,
    doctorName: "Andre Cronin",
    date: "2024-11-27",
    time: "16:00:00 to 17:30:00",
    status: "Pending",
  },
  {
    key: 5,
    srNo: 5,
    doctorName: "Andre Cronin",
    date: "2024-11-27",
    time: "16:00:00 to 17:30:00",
    status: "Pending",
  },
  {
    key: 6,
    srNo: 6,
    doctorName: "Andre Cronin",
    date: "2024-11-27",
    time: "16:00:00 to 17:30:00",
    status: "Pending",
  },
  {
    key: 7,
    srNo: 7,
    doctorName: "Andre Cronin",
    date: "2024-11-27",
    time: "16:00:00 to 17:30:00",
    status: "Pending",
  },
  {
    key: 8,
    srNo: 8,
    doctorName: "Andre Cronin",
    date: "2024-11-27",
    time: "16:00:00 to 17:30:00",
    status: "Pending",
  },
  {
    key: 9,
    srNo: 9,
    doctorName: "Andre Cronin",
    date: "2024-11-27",
    time: "16:00:00 to 17:30:00",
    status: "Pending",
  },
  {
    key: 10,
    srNo: 10,
    doctorName: "Andre Cronin",
    date: "2024-11-27",
    time: "16:00:00 to 17:30:00",
    status: "Pending",
  },
  {
    key: 11,
    srNo: 11,
    doctorName: "Andre Cronin",
    date: "2024-11-27",
    time: "16:00:00 to 17:30:00",
    status: "Pending",
  },
];

const PatientAppointment = () => {
  const [appointments, setAppointments] = useState(dataSource);

  const handleCancel = (key: React.Key) => {
    const updatedAppointments = appointments.map((appointment) =>
      appointment.key === key
        ? { ...appointment, status: "Cancel" }
        : appointment
    );
    setAppointments(updatedAppointments);
  };

  return (
    <div className="mx-5">
      {/* Header Section */}
      <div className="flex items-center justify-between my-5">
        <div>
          <h2 className="text-[15px] text-[#495057] font-semibold">
            APPOINTMENT LIST
          </h2>
        </div>
        <div className="flex items-center gap-1 text-[#495057] text-sm">
          <Link href="#" className="">
            Dashboard
          </Link>
          <BsSlash className="text-[#ccc]" />
          <Link href="#">Appointment</Link>
        </div>
      </div>

      {/* Table Section */}
      <div className="p-5  bg-white ">
        <div className="border border-[#f4f2f2]">
          <Table
            dataSource={appointments}
            columns={columns(handleCancel)}
            pagination={{ pageSize: 10 }}
          />
        </div>
      </div>
    </div>
  );
};

export default PatientAppointment;
