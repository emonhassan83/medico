"use client";

import React, { useState } from "react";
import { Table, Button, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Link from "next/link";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useDeleteReceptionistMutation } from "@/redux/api/receptionistApi";
import { toast } from "sonner";
import FullPageLoading from "@/components/Loader/FullPageLoader";
import { FaEye } from "react-icons/fa";

const ReceptionistTable = ({ data, refetch }: any) => {
  const [deleteReceptionist, { isLoading }] = useDeleteReceptionistMutation();
  const [searchText, setSearchText] = useState("");
  
  //   Filter data based on search text
  const filteredData = data?.receptionist?.filter((pt: any) =>
    pt.firstName.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleDeleteRow = async (id: string) => {
    try {
      const res = await deleteReceptionist(id).unwrap();
      // console.log(res);
      if (res?.id) {
        toast.success("Delete reception successfully");
        refetch();
      }
    } catch (err: any) {
      toast.error(err?.message);
      console.error("Something went wrong", err?.message);
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
        <div className="flex gap-1">
          <Link href={`/admin/receptionists/${data?.id}/details`}>
            <button className="flex items-center bg-[#556ee6] hover:bg-blue-600 text-white p-2 rounded-full  ">
              <FaEye />
            </button>
          </Link>

          <Link href={`/admin/receptionists/${data?.id}`}>
            <button className="flex items-center bg-[#556ee6] hover:bg-blue-600 text-white p-2 rounded-full">
              <MdEdit />
            </button>
          </Link>

          {/* delete button */}
          <button
            className={`flex items-center p-2 rounded-full text-white 
              ${
                data?.email === "sophia.taylor@example.com"
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#556ee6] hover:bg-blue-600"
              }`}
            onClick={() => handleDeleteRow(data?.id)}
            disabled={data?.email === "sophia.taylor@example.com"}
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

  if (isLoading) {
    return <FullPageLoading />;
  }

  return (
    <div className="bg-white p-5">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "16px",
        }}
      >
        {/* <div>
          <Button className="mr-2 bg-[#eaeaea] outline-none">Copy</Button>
          <Button className="mr-2 bg-[#eaeaea]">Excel</Button>
          <Button className=" bg-[#eaeaea]">PDF</Button>
        </div> */}
        <Input
          placeholder="Search by name"
          prefix={<SearchOutlined />}
          style={{ width: "200px" }}
          value={searchText}
          onChange={handleSearch}
        />
      </div>

      <div>
        <Table
          dataSource={filteredData}
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

export default ReceptionistTable;
