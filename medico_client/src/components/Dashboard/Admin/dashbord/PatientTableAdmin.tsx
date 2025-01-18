"use client";

import React, { useState } from "react";
import { Table } from "antd";
import { useDeletePatientMutation } from "@/redux/api/patientApi";
import Link from "next/link";
import { FaEye } from "react-icons/fa";
import { toast } from "sonner";

const PatientTableAdmin = ({ patients, refetch }: any) => {
  const [searchText, setSearchText] = useState("");
  const [deletePatient] = useDeletePatientMutation();

  //* Filter data based on search text
  const filteredData = patients?.patients?.filter((pt: any) =>
    pt.firstName.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleDeletePatient = async (id: string) => {
    try {
      const res = await deletePatient(id).unwrap();

      if (res?.id) {
        toast.success("Delete patient successfully!");
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
          {/* update Button */}
          <Link href={`/receptionist/patients/${data?.id}`}>
            <button className="flex items-center bg-[#556ee6] hover:bg-blue-600 text-white p-2 rounded-full  ">
              <FaEye />
            </button>
          </Link>

          {/* edit button */}
          {/* <Link href={`/admin/patients/${data?.id}/edit`}>
            <button
              className="flex items-center bg-[#556ee6] hover:bg-blue-600 text-white p-2 rounded-full  "
              //   onClick={() => handleEdit(items)}
            >
              <MdEdit />
            </button>
          </Link> */}

          {/* delete button */}
          {/* <button
            className="flex items-center bg-[#556ee6] hover:bg-blue-600 text-white p-2 rounded-full  "
            onClick={() => handleDeletePatient(data?.id)}
          >
            <RiDeleteBin6Fill />
          </button> */}
        </div>
      ),
    },
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  return (
    <div className="bg-white p-5">
      <Table
        dataSource={filteredData}
        columns={columns}
        bordered
        size="small"
        scroll={{ x: "max-content" }}
        pagination={false}
        rowKey="id"
      />
    </div>
  );
};

export default PatientTableAdmin;
