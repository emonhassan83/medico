"use client";
import React, { useState } from "react";
import { Table, Button, Input, Divider, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import {
  useDeletePatientMutation,
  useGetAllPatientQuery,
} from "@/redux/api/patientApi";
import Link from "next/link";
import { FaEye } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { toast } from "sonner";

const PatientTableAdmin = () => {
  const { data, refetch } = useGetAllPatientQuery([]);
  const [deletePatient] = useDeletePatientMutation();
  const [searchText, setSearchText] = useState("");

console.log(data)
  
  //   Filter data based on search text
  const filteredData = data?.patients?.filter((pt: any) =>
    pt.firstName.toLowerCase().includes(searchText.toLowerCase())
  );

  ///delete operation---------------------------------
  const handleDeletRow = async (id: string) => {
    console.log(id);
    try {
      const res = await deletePatient(id).unwrap();
      console.log(res);
      if (res?.id) {
        toast.success("Delete patient successfully");
        refetch();
      }
    } catch (err) {
      toast.error("Somthing went wrong");
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
          {/* update Button */}
          <Link href={`/admin/patients/${data?.id}`}>
            <button className="flex items-center bg-[#556ee6] hover:bg-blue-600 text-white p-2 rounded-full  ">
              <FaEye />
            </button>
          </Link>

          {/* edit button */}
          <Link href={`/admin/patients/${data?.id}/edit`}>
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
            onClick={() => handleDeletRow(data?.id)}
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

export default PatientTableAdmin;
