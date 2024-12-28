"use client";

import React, { useEffect, useState } from "react";
import { Table } from "antd";
import Link from "next/link";
import { useGetMyProfileQuery } from "@/redux/api/userApi";

const PrescriptionTable = ({prescriptions}: any) => {
  const [dataSource, setDataSource] = useState<any>([]);
  const { data: profile, isLoading: isProfileLoading } = useGetMyProfileQuery(
    {}
  );

  useEffect(() => {
    if (prescriptions) {
      const fData = prescriptions?.prescription.filter(
        (d: any) => d?.patient?.id === profile?.id
      );

      const dataSource = fData?.map((prescription: any) => ({
        instructions: prescription?.instructions,
        doctorName: prescription?.doctor?.firstName,
        appointmentDate: prescription?.appointment?.createdAt?.slice(
          0,
          10
        ),
        appointmentTime: prescription?.appointment?.createdAt?.slice(
          11,
          19
        ),
        id: prescription?.id,
      }));

      setDataSource(dataSource);
    }
  }, [prescriptions, profile?.id]);

  const columns = [
    {
      title: "Sr. No",
      dataIndex: "key",
      key: "key",
      sorter: (a: any, b: any) => a.key - b.key,
      render: (_: any, __: any, index: number) => index + 1,
    },

    {
      title: "Doctor Name",
      dataIndex: "doctorName",
      key: "doctorName",
    },
    {
      title: "Appointment Date",
      dataIndex: "appointmentDate",
      key: "appointmentDate",
    },
    {
      title: "Appointment Time",
      dataIndex: "appointmentTime",
      key: "appointmentTime",
    },
    {
      title: "Options",
      key: "action",
      render: (data: any) => (
        <div className="flex gap-1">
          <Link href={`/patient/prescription/${data?.id}`}>
            <button className="flex items-center bg-[#556ee6] hover:bg-blue-600 text-white py-1 px-2 rounded-3xl">
             View
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
          dataSource={dataSource}
          columns={columns}
          pagination={{ pageSize: prescriptions?.meta?.limit }}
          bordered
          rowKey="id"
        />
      </div>
      <div className="relative hidden md:block">
        {prescriptions?.meta?.page === 1 ? (
          <div className="absolute text-[#495072] text-sm bottom-6">
            {prescriptions?.meta?.total <= 10 ? (
              <div>
                showing 1 to {prescriptions?.meta?.total} of {prescriptions?.meta?.total} entries
              </div>
            ) : (
              <div>
                showing 1 to {prescriptions?.meta?.limit} of {prescriptions?.meta?.total} entries
              </div>
            )}
          </div>
        ) : (
          <div className="absolute text-[#495072]  text-sm bottom-6">
            showing 1 to (({prescriptions?.meta?.page} - 1)* {prescriptions?.meta?.limit} ) of{" "}
            {prescriptions?.meta?.total} entries
          </div>
        )}
      </div>
    </div>
  );
};

export default PrescriptionTable;
