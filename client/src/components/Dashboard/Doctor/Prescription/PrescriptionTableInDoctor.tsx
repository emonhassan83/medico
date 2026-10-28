"use client";
import React from "react";
import { Table } from "antd";
import Link from "next/link";
import { FaEye } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useDeletePrescriptionMutation } from "@/redux/api/prescriptionApi";
import { toast } from "sonner";

const PrescriptionTableInDoctor = ({ data }: any) => {
  const [deletePrescription] = useDeletePrescriptionMutation();

  const dataSource = data?.prescription?.map((prescription: any) => ({
    id: prescription?.id,
    patientName: prescription?.patient?.firstName,
    doctorName: prescription?.doctor?.firstName,
    appointmentDate: prescription?.appointment?.createdAt?.slice(0, 10),
    appointmentTime: prescription?.appointment?.createdAt?.slice(11, 19),
  }));

  const handleDeletePrescription = async (id: string) => {
    try {
      const res = await deletePrescription(id).unwrap();

      if (res?.id) {
        toast.success("Prescription deleted successfully!");
      }
    } catch (err: any) {
      toast.error(err.message);
      console.error(err.message);
    }
  };

  const columns = [
    {
      title: "Sr. No",
      dataIndex: "key",
      key: "key",
      sorter: (a: any, b: any) => a.key - b.key,
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: "Patient Name",
      dataIndex: "patientName",
      key: "patientName",
    },
    {
      title: "Doctor Name",
      dataIndex: "doctorName",
      key: "doctorName",
    },
    {
      title: "Appointment Date",
      dataIndex: "appointmentDate",
      key: "appointmentDate",
    },
    {
      title: "Appointment Time",
      dataIndex: "appointmentTime",
      key: "appointmentTime",
    },

    {
      title: "Options",
      key: "action",
      render: (items: any) => (
        <div className="flex gap-1">
          <Link href={`/doctor/prescription/${items?.id}`}>
            <button className="flex items-center bg-[#556ee6] hover:bg-blue-600 text-white p-2 rounded-full  ">
              <FaEye />
            </button>
          </Link>
          <button
            className="flex items-center bg-[#556ee6] hover:bg-blue-600 text-white p-2 rounded-full  "
            onClick={() => handleDeletePrescription(items?.id)}
          >
            <RiDeleteBin6Fill />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white p-5">
      <div>
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={{ pageSize: data?.meta?.limit }}
          bordered
          size="small"
          scroll={{ x: "max-content" }}
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

export default PrescriptionTableInDoctor;
