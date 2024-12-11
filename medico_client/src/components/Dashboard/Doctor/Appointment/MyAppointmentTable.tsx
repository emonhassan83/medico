"use client";

import React from "react";
import { Table, Button } from "antd";
import {
  useAppointmentStatusChangeMutation,
  useDeleteAppointmentMutation,
} from "@/redux/api/appointmentApi";
import { toast } from "sonner";
import { ColumnsType } from "antd/es/table";

type AppointmentStatus = "SCHEDULED" | "COMPLETED" | "CANCELED" | "INPROGRESS";
type PaymentStatus = "PAID" | "UNPAID";

interface Doctor {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePhoto: string;
  contactNumber: string;
  address: string;
  registrationNumber: string;
  experience: number;
  gender: "MALE" | "FEMALE" | "OTHER";
  appointmentFee: number;
  qualification: string;
  currentWorkingPlace: string;
  designation: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  averageRating: number;
}

interface Patient {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePhoto: string;
  contactNumber: string;
  address: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Appointment {
  id: string;
  patientId: string;
  // doctorId: string;
  // scheduleId: string;
  // videoCallingId: string;
  status: AppointmentStatus;
  paymentStatus: PaymentStatus;
  // notes: string | null;
  createdAt: string;
  updatedAt: string;
  // doctor: Doctor;
  // patient: Patient;
}

const MyAppointmentTable = ({data}: any) => {
  const [appointmentStatusChange] = useAppointmentStatusChangeMutation();
  const [deleteAppointment] = useDeleteAppointmentMutation();

  const appointments = data?.appointments;

  const handleChangeStatus = async (id: string, status: string) => {
    try {
      const res = await appointmentStatusChange({ id, status }).unwrap();

      if (res?.id) {
        toast.success("Appointment status changed successfully!");
      }
    } catch (err: any) {
      toast.error(err.message);
      console.error(err.message);
    }
  };

  const handleDeleteAppointment = async (id: string) => {
    try {
      const res = await deleteAppointment(id);

      if (res) {
        toast.success("Appointment deleted successfully!");
      }
    } catch (err: any) {
      toast.error(err.message);
      console.error(err.message);
    }
  };

  const columns: ColumnsType<Appointment> = [
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
      render: (patient: Patient) => `${patient.firstName} ${patient.lastName}`,
    },
    {
      title: "Appointment Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
    },
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

    {
      title: "Action",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (status: AppointmentStatus, item) => (
        <div className="flex justify-center">
          <Button
            onClick={() => handleChangeStatus(item.id, "CANCELED")}
            color="default"
            variant="filled"
            size="small"
            style={{ marginRight: 8 }}
          >
            Canceled
          </Button>
          <Button
            onClick={() => handleDeleteAppointment(item.id)}
            color="danger"
            variant="filled"
            size="small"
          >
            Delete
          </Button>
        </div>
      ),
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

export default MyAppointmentTable;
