"use client";

import { useContext, useEffect, useState } from "react";
import { Button, Table } from "antd";
import {
  useAppointmentStatusChangeMutation,
  useDeleteAppointmentMutation,
} from "@/redux/api/appointmentApi";
import { ColumnsType } from "antd/es/table";
import { toast } from "sonner";
import LoadingContext from "@/lib/LoadingContext/LoadingContext";
import Meta from "@/components/Dashboard/Meta/MetaData";

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
  const { setLoading } = useContext(LoadingContext)!;
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const paramsValue = params.id.toUpperCase();
  const [appointmentStatusChange] = useAppointmentStatusChangeMutation();
  const [deleteAppointment] = useDeleteAppointmentMutation();

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("accessToken");
        const headers: HeadersInit = token ? { Authorization: `${token}` } : {};

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/appointment?status=${paramsValue}`,
          { headers }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch appointments");
        }

        const data = await res.json();
        setAppointments(data.data);
      } catch (err: any) {
        toast.error(err.message || "An error occurred while fetching data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [paramsValue, setLoading]);

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
      render: (status: AppointmentStatus, item) => {
        switch (status) {
          case "SCHEDULED":
            return (
              <div className="flex justify-center">
                <Button
                  onClick={() => handleChangeStatus(item.id, "INPROGRESS")}
                  color="primary"
                  variant="filled"
                  size="small"
                  style={{ marginRight: 8 }}
                >
                  Inprogress
                </Button>
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
            );
          case "INPROGRESS":
            return (
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
            );
          case "COMPLETED":
            return (
              <Button
                onClick={() => handleDeleteAppointment(item.id)}
                color="danger"
                variant="filled"
                size="small"
              >
                Delete
              </Button>
            );
          case "CANCELED":
            return (
              <Button
                onClick={() => handleDeleteAppointment(item.id)}
                color="danger"
                variant="filled"
                size="small"
              >
                Delete
              </Button>
            );
          default:
            return null;
        }
      },
    },
  ];

  return (
    <div className="container">
      <Meta
        title="List of Appointment | Medico - Hospital & Clinic Management System"
        description="This is the list of Appointment page of Medico where admin can show all patient Appointment, and more."
      />

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
