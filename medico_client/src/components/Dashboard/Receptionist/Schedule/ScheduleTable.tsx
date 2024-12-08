import React from "react";
import { Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import {
  useDeleteScheduleMutation,
  useGetAllSchedulesQuery,
} from "@/redux/api/scheduleApi";
import { MdDelete } from "react-icons/md";
import dayjs from "dayjs";

interface DataType {
  key: React.Key;
  startDate: string;
  endDate: string;
  startTime: number;
  endTime: string;
  scheduleStatus: string;
  isBooked: boolean;
}

const ScheduleTable = () => {
  const { data, isLoading } = useGetAllSchedulesQuery([]);
  // console.log(data);

  const formattedData = data?.data?.map((item: any, index: number) => {
    const isBooked =
      item.doctorSchedules?.length > 0 &&
      item.doctorSchedules.some((schedule: any) => schedule.isBooked);

    return {
      key: index + 1,
      id: item.id,
      startDate: dayjs(item.startDate).format("YYYY-MM-DD"),
      endDate: dayjs(item.endDate).format("YYYY-MM-DD"),
      startTime: dayjs(item.startDate).format("h:mm A"),
      endTime: dayjs(item.endDate).format("h:mm A"),
      scheduleStatus: isBooked ? "Booked" : "Not Booked",
      isBooked: isBooked,
    };
  });

  const columns: ColumnsType<DataType> = [
    {
      title: "SL No",
      dataIndex: "key",
      key: "key",
      sorter: (a: any, b: any) => a.key - b.key,
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
    },

    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
    },
    {
      title: "endTime",
      dataIndex: "endTime",
      key: "endTime",
    },
    {
      title: "Schedule Status",
      dataIndex: "scheduleStatus",
      key: "scheduleStatus",
      render: (status: string) => (
        <Tag color={status === "Booked" ? "green" : "red"}>{status}</Tag>
      ),
    },
    {
      title: "Options",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-1">
          <button
            disabled={record.isBooked}
            className="flex items-center bg-[#556ee6] hover:bg-blue-600 text-white p-2 rounded-full"
          >
            <MdDelete />
          </button>
        </div>
      ),
    },
  ];
  return (
    <div className="w-full">
      <div className="flex items-center gap-2 bg-white pt-5 ps-5">
        <h2 className="text-lg font-semibold">Schedule List</h2>
      </div>
      <div className=" bg-white p-5">
        <Table<DataType>
          columns={columns}
          dataSource={formattedData}
          size="middle"
          bordered
        />
      </div>
    </div>
  );
};

export default ScheduleTable;
