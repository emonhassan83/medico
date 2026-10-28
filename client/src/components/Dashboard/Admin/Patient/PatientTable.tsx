"use client";

import React, { useState } from "react";
import { Table, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useDeletePatientMutation } from "@/redux/api/patientApi";
import Link from "next/link";
import { FaEye } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { toast } from "sonner";
import FullPageLoading from "@/components/Loader/FullPageLoader";

const PatientTable = ({ data, refetch }: any) => {
  const [deletePatient, { isLoading }] = useDeletePatientMutation();
  const [searchText, setSearchText] = useState("");

  const filteredData = data?.patients?.filter((pt: any) =>
    pt.firstName.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleDeleteRow = async (id: string) => {
    try {
      const res = await deletePatient(id).unwrap();
      
      if (res?.id) {
        toast.success("Delete patient successfully");
        refetch();
      }
    } catch (err: any) {
      toast.error(err?.message);
      console.error(err?.message);
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
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Options",
      key: "action",
      render: (data: any) => (
        <div className="flex gap-1">
          <Link href={`/admin/patients/${data?.id}`}>
            <button className="flex items-center bg-[#556ee6] hover:bg-blue-600 text-white p-2 rounded-full  ">
              <FaEye />
            </button>
          </Link>

          <Link href={`/admin/patients/${data?.id}/edit`}>
            <button className="flex items-center bg-[#556ee6] hover:bg-blue-600 text-white p-2 rounded-full  ">
              <MdEdit />
            </button>
          </Link>

          {/* delete button */}
          <button
            className={`flex items-center p-2 rounded-full text-white 
              ${
                data?.email === "ethan.miller@example.com"
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#556ee6] hover:bg-blue-600"
              }`}
            onClick={() => handleDeleteRow(data?.id)}
            disabled={data?.email === "ethan.miller@example.com"}
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

export default PatientTable;
