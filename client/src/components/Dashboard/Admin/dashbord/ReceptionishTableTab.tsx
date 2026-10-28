"use client";

import React, { useState } from "react";
import { Table } from "antd";
import Link from "next/link";
import { FaEye } from "react-icons/fa";

const ReceptionistTableTab = ({ receptionists }: any) => {
  const [searchText, setSearchText] = useState("");

  //   Filter data based on search text
  const filteredData = receptionists?.receptionist?.filter((pt: any) =>
    pt.firstName.toLowerCase().includes(searchText.toLowerCase())
  );
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
      title: "Options",
      key: "action",
      render: (data: any) => (
        <Link href={`/admin/receptionists/${data?.id}/details`}>
          <button className="flex items-center bg-[#556ee6] hover:bg-blue-600 text-white p-2 rounded-full  ">
            <FaEye />
          </button>
        </Link>
      ),
    },
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  return (
    <div className="bg-white p-5 mx-auto">
      <Table
        dataSource={filteredData}
        columns={columns}
        bordered
        size="small"
        scroll={{ x: "max-content" }}
        rowKey="id"
      />
    </div>
  );
};

export default ReceptionistTableTab;
