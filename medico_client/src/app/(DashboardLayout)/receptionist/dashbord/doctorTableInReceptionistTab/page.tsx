"use client";
import React, { useState } from "react";
import { Table } from "antd";
import Link from "next/link";
import { FaEye } from "react-icons/fa";
import { useGetAllDoctorsQuery } from "@/redux/api/doctorApi";

const DoctorTableInReceptionistTab = () => {
  const { data } = useGetAllDoctorsQuery({});
  // console.log(data);
  const [searchText, setSearchText] = useState("");

  //   Filter data based on search text
  const filteredData = data?.doctors?.filter((pt: any) =>
    pt.firstName.toLowerCase().includes(searchText.toLowerCase())
  );
  const columns = [
    {
      title: "Sr. No",
      dataIndex: "key",
      key: "key",
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "firstName",
      key: "firstName",
      sorter: (a: any, b: any) =>
        a.firstName.toLowerCase().localeCompare(b.firstName.toLowerCase()),
    },
    {
      title: "Contact No",
      dataIndex: "contactNumber",
      key: "contactNumber",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a: any, b: any) =>
        a.email.toLowerCase().localeCompare(b.email.toLowerCase()),
    },
    {
      title: "Appointment Fee",
      dataIndex: "appointmentFee",
      key: "appointmentFee",
      sorter: (a: any, b: any) => a.appointmentFee - b.appointmentFee,
    },

    {
      title: "Options",
      key: "action",
      render: () => (
        <div className="flex gap-1">
          <Link href="#">
            <button className="flex items-center bg-[#556ee6] hover:bg-blue-600 text-white p-2 rounded-full  ">
              <FaEye />
            </button>
          </Link>
        </div>
      ),
    },
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  return (
    <div className="bg-white p-5">
      

      <div>
        <Table
          dataSource={filteredData}
          columns={columns}
          bordered
          rowKey="id"
        />
      </div>
      
    </div>
  );
};

export default DoctorTableInReceptionistTab;
