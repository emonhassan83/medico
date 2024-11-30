"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Button, Table, Tag, Space, TableColumnsType } from "antd";
import { BsSlash } from "react-icons/bs";
import {
  useAppointmentStatusChangeMutation,
  useGetAllAppointmentsQuery,
} from "@/redux/api/appointmentApi";
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

const PatientAppointment = () => {
  // const [appointments, setAppointments] = useState(dataSource);
  const [appointmentStatusChange] = useAppointmentStatusChangeMutation();
  const { data, refetch } = useGetAllAppointmentsQuery({});
  console.log(data?.appointments);

  // Map data with proper keys and types
  const tableData: AppointmentData[] =
    data?.appointments?.map((appointment: Appointment, index: number) => ({
      key: appointment.id || `${index}`, // Use _id or fallback
      srNo: index + 1,
      status: appointment.status || "N/A",
      doctorName: `${appointment?.doctor?.firstName || "N/A"} ${
        appointment?.doctor?.lastName || ""
      }`,
      date: appointment.createdAt?.slice(0, 10) || "N/A",
      time: appointment.createdAt?.slice(11, 19) || "N/A",
    })) || [];
  // console.log(tableData);

  //update status function in here
  const handleCancel = async (appointmentId: string) => {
    console.log(appointmentId);
    try {
      await appointmentStatusChange({
        id: appointmentId,
        status: "CANCELED",
      }).unwrap();
      refetch(); // Explicitly fetch the latest data
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

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
    {
      title: "Action",
      key: "action",
      render: (_: any, record: AppointmentData) => (
        <Space>
          {record.status !== "CANCELED" && (
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
        <Table
          dataSource={tableData}
          columns={columns}
          pagination={{ pageSize: 10 }}
          bordered
        />
      </div>
      <div className="relative hidden md:block p-5">
        {data?.meta?.page === 1 ? (
          <div className="absolute text-[#495072] text-sm bottom-20">
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
          <div className="absolute text-[#495072]  text-sm bottom-20">
            showing 1 to (({data?.meta?.page} - 1)* {data?.meta?.limit} ) of{" "}
            {data?.meta?.total} entries
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientAppointment;