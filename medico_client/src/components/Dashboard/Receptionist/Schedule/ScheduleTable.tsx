import React from "react";
import { Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { useDeleteScheduleMutation } from "@/redux/api/scheduleApi";
import { MdDelete } from "react-icons/md";
import dayjs from "dayjs";
import { toast } from "sonner";

interface DataType {
  key: React.Key;
  id: string;
  startDate: string;
  endDate: string;
  startTime: number;
  endTime: string;
  scheduleStatus: string;
  isBooked: boolean;
}

const ScheduleTable = ({ data }: any) => {
  const [deleteSchedule] = useDeleteScheduleMutation();
  // console.log(data);

  const handleDeleteSchedule = async (id: string) => {
    try {
      const res = await deleteSchedule(id);
      // console.log(res);

      if (res) {
        toast.success("Schedule deleted successfully!");
      }
    } catch (err: any) {
      toast.error(err.message);
      console.error(err.message);
    }
  };

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
            onClick={() => handleDeleteSchedule(record.id)}
            disabled={record.isBooked}
            className={`flex items-center p-2 rounded-full ${
              record.isBooked
                ? "bg-gray-400 text-gray-500 cursor-not-allowed"
                : "bg-[#556ee6] hover:bg-blue-600 text-white"
            }`}
          >
            <MdDelete
              style={{
                color: record.isBooked ? "rgba(255, 255, 255, 0.5)" : "white",
              }}
            />
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

export default ScheduleTable;
