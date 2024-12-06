"use client";
import React, { useState } from "react";
import { Table, Button, Input, Divider, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Link from "next/link";
import { FaEye } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useGetAllReceptionQuery } from "@/redux/api/receptionistApi";

const ReceptionistTableTab = () => {
  const { data } = useGetAllReceptionQuery({});
  console.log(data);
  // console.log(data);
  const [searchText, setSearchText] = useState("");

  //   Filter data based on search text
  const filteredData = data?.receptionist?.filter((pt: any) =>
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
      render: () => (
        <div className="flex gap-1">
          {/* update Button */}
          <Link href="#">
            <button className="flex items-center bg-[#556ee6] hover:bg-blue-600 text-white p-2 rounded-full  ">
              <FaEye />
            </button>
          </Link>

          {/* edit button */}
          <Link href="#">
            <button
              className="flex items-center bg-[#556ee6] hover:bg-blue-600 text-white p-2 rounded-full  "
              //   onClick={() => handleEdit(items)}
            >
              <MdEdit />
            </button>
          </Link>

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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  return (
    <div className="bg-white p-5 mx-auto">
      
      <div>
        <Table
          dataSource={filteredData}
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

export default ReceptionistTableTab;
