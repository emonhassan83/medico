"use client";

import React from "react";
import { Table } from "antd";
import Link from "next/link";
import { MdEdit } from "react-icons/md";

const SpecialtiesTable = ({ data }: any) => {
  const columns = [
    {
      title: "Sr. No",
      dataIndex: "key",
      key: "key",
      sorter: (a: any, b: any) => a.key - b.key,
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text: any) =>
        text?.length > 150 ? `${text.slice(0, 100)}...` : text,
      width: "40%",
    },
    {
      title: "Options",
      key: "action",
      render: (data: any) => (
        <div className="flex gap-1">
          {/* edit button */}
          <Link href={`/admin/specialties/${data?.id}`}>
            <button className="flex items-center bg-[#556ee6] hover:bg-blue-600 text-white p-2 rounded-full  ">
              <MdEdit />
            </button>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white p-5">
      <div>
        <Table
          dataSource={data?.data}
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
                showing 1 to {data?.meta?.total} of ({data?.meta?.total})
                entries
              </div>
            ) : (
              <div>
                showing 1 to {data?.meta?.limit} of {data?.meta?.total - 1}
                entries
              </div>
            )}
          </div>
        ) : (
          <div className="absolute text-[#495072]  text-sm bottom-6">
            showing 1 to (({data?.meta?.page})* {data?.meta?.limit} ) of{" "}
            {data?.meta?.total} entries
          </div>
        )}
      </div>
    </div>
  );
};

export default SpecialtiesTable;
