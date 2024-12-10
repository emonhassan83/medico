"use client";

import React from "react";
import { Table, Button } from "antd";
import { useGetAllAppointmentsQuery } from "@/redux/api/appointmentApi";
import { toast } from "sonner";
import { ColumnsType } from "antd/es/table";

// type AppointmentStatus = "SCHEDULED" | "COMPLETED" | "CANCELED" | "INPROGRESS";
// type PaymentStatus = "PAID" | "UNPAID";

// interface Doctor {
//   id: string;
//   email: string;
//   firstName: string;
//   lastName: string;
//   profilePhoto: string;
//   contactNumber: string;
//   address: string;
//   registrationNumber: string;
//   experience: number;
//   gender: "MALE" | "FEMALE" | "OTHER";
//   appointmentFee: number;
//   qualification: string;
//   currentWorkingPlace: string;
//   designation: string;
//   isDeleted: boolean;
//   createdAt: string;
//   updatedAt: string;
//   averageRating: number;
// }

// interface Patient {
//   id: string;
//   email: string;
//   firstName: string;
//   lastName: string;
//   profilePhoto: string;
//   contactNumber: string;
//   address: string;
//   isDeleted: boolean;
//   createdAt: string;
//   updatedAt: string;
// }

// interface Appointment {
//   id: string;
//   patientId: string;
//   // doctorId: string;
//   // scheduleId: string;
//   // videoCallingId: string;
//   status: AppointmentStatus;
//   paymentStatus: PaymentStatus;
//   // notes: string | null;
//   createdAt: string;
//   updatedAt: string;
//   // doctor: Doctor;
//   // patient: Patient;
// }

const TransectionTableInAdmin = () => {
  const { data, isLoading } = useGetAllAppointmentsQuery({});
  // console.log(data);
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
      title: "Transection No",
      dataIndex: "###",
      key: "###",
    },
    {
      title: "Ammount($)",
      dataIndex: "###",
      key: "###",
    },
    // {
    //   title: "Appointment Status",
    //   dataIndex: "status",
    //   key: "status",
    // },
    // {
    //   title: "Payment Status",
    //   dataIndex: "paymentStatus",
    //   key: "paymentStatus",
    // },
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
