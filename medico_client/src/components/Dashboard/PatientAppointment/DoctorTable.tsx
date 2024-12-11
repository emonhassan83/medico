"use client";
import React, { useState } from "react";
import { Table, Button, Input, Divider } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useGetAllDoctorsQuery } from "@/redux/api/doctorApi";

const DoctorTable = () => {
  const { data } = useGetAllDoctorsQuery({});
  // console.log(data?.doctors);
  // console.log(data?.meta);

  const [searchText, setSearchText] = useState("");

  // Filter data based on search text
  const filteredData = data?.doctors?.filter((doctor) =>
    doctor.firstName.toLowerCase().includes(searchText.toLowerCase())
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
      title: "Title",
      dataIndex: "qualification",
      key: "title",
    },
    {
      title: "Name",
      dataIndex: "firstName",
      key: "name",
    },
    {
      title: "Department",
      dataIndex: "designation",
      key: "designation",
    },
    {
      title: "Contact No",
      dataIndex: "contactNumber",
      key: "contact",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
  ];
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  return (
    <div className="bg-white p-5">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "16px",
        }}
      >
        <div>
          <Button className="mr-2 bg-[#eaeaea] outline-none">Copy</Button>
          <Button className="mr-2 bg-[#eaeaea]">Excel</Button>
          <Button className=" bg-[#eaeaea]">PDF</Button>
        </div>
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

export default DoctorTable;
