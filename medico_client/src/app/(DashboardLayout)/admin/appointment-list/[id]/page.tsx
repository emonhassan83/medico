"use client";
import { useEffect, useState } from "react";
import { Button, Table } from "antd";
import { useAppointmentStatusChangeMutation, useDeleteAppointmentMutation } from "@/redux/api/appointmentApi";
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
  doctorId: string;
  scheduleId: string;
  videoCallingId: string;
  status: AppointmentStatus;
  paymentStatus: PaymentStatus;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  doctor: Doctor;
  patient: Patient;
}

const AppointmentDynamicPage = ({ params }: { params: { id: string } }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const paramsValue = params.id.toUpperCase();
  const [appointmentStatusChange] = useAppointmentStatusChangeMutation();
  const [deleteAppointment] = useDeleteAppointmentMutation();

  useEffect(() => {
    const handle = async () => {
      const token = localStorage.getItem("accessToken");
      const headers: HeadersInit = token ? { Authorization: `${token}` } : {};

      const res = await fetch(
        `http://localhost:5000/api/v1/appointment?status=${paramsValue}`,
        { headers }
      );
      const data = await res.json();
      setAppointments(data.data);
    };
    handle();
  }, [paramsValue]);

  const columns: ColumnsType<Appointment> = [
    {
      title: "Sr. No",
      dataIndex: "index",
      key: "index",
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: "Doctor Name",
      dataIndex: "doctor",
      key: "doctor",
      render: (doctor: Doctor) => `${doctor.firstName} ${doctor.lastName}`,
    },
    {
      title: "Patient Name",
      dataIndex: "patient",
      key: "patient",
      render: (patient: Patient) => `${patient.firstName} ${patient.lastName}`,
    },
    {
      title: "Patient Contact No",
      dataIndex: ["patient", "contactNumber"],
      key: "contactNumber",
    },
    {
      title: "Patient Email",
      dataIndex: ["patient", "email"],
      key: "email",
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
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
      render: (status: AppointmentStatus) => {
        switch (status) {
          case "SCHEDULED":
            return (
              <div className="flex justify-center">
                <Button color="primary" variant="filled" size="small" style={{ marginRight: 8 }}>
                  Inprogress
                </Button>
                <Button color="default" variant="filled" size="small" style={{ marginRight: 8 }}>
                  Canceled
                </Button>
                <Button color="danger" variant="filled" size="small">
                  Delete
                </Button>
              </div>
            );
          case "INPROGRESS":
            return (
              <div className="flex justify-center">
                <Button color="default" variant="filled" size="small" style={{ marginRight: 8 }}>
                  Canceled
                </Button>
                <Button color="danger" variant="filled" size="small">
                  Delete
                </Button>
              </div>
            );
          case "COMPLETED":
            return (
              <Button color="danger" variant="filled" size="small">
                Delete
              </Button>
            );
          case "CANCELED":
            return (
              <Button color="danger" variant="filled" size="small">
                Delete
              </Button>
            );
          default:
            return null;
        }
      },
    }
  ];

  return (
    <div className="container">
      <Table
        dataSource={appointments}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default AppointmentDynamicPage;
