"use client";
import React from "react";
import { Table, Button, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Link from "next/link";
import { FaEye } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useGetMyAppointmentsQuery } from "@/redux/api/appointmentApi";

const MyAppointmentTable = () => {
  const { data, isLoading, error } = useGetMyAppointmentsQuery({});
  console.log(data?.appointments);
  const dataSource = data?.appointments?.map((appointment: any) => ({
    patientName: appointment?.patient?.firstName,
    status: appointment?.status,
    paymentStatus: appointment?.paymentStatus,
    appointmentDate: appointment?.createdAt?.slice(0, 10),
    appointmentTime: appointment?.createdAt?.slice(11, 19),
  }));

  const columns = [
    {
      title: "Sr. No",
      dataIndex: "key",
      key: "key",
      sorter: (a: any, b: any) => a.key - b.key,
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "patientName",
      key: "patientName",
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
      dataIndex: "appointmentDate",
      key: "appointmentDate",
    },
    {
      title: "Time",
      dataIndex: "appointmentTime",
      key: "appointmentTime",
    },

    {
      title: "Options",
      key: "action",
      render: () => (
        <div className="flex gap-1">
          {/* update Button */}
          {/* <Link href="#">
            <button className="flex items-center bg-[#556ee6] hover:bg-blue-600 text-white p-2 rounded-full  ">
              <FaEye />
            </button>
          </Link> */}

          {/* edit button */}
          {/* <Link href="#">
            <button
              className="flex items-center bg-[#556ee6] hover:bg-blue-600 text-white p-2 rounded-full  "
              //   onClick={() => handleEdit(items)}
            >
              <MdEdit />
            </button>
          </Link> */}

          {/* delete button */}
          <button
            className="flex items-center bg-[#556ee6] hover:bg-blue-600 text-white p-2 rounded-full  "
            //   onClick={() => handleDelete(items)}
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
