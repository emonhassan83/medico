"use client";

import Link from "next/link";
import { ArrowLeftOutlined } from "@ant-design/icons";
import MedicoForm from "@/components/Forms/MedicoForm";
import { toast } from "sonner";
import { FieldValues } from "react-hook-form";
import { Button } from "antd";
import MedicoDatePiker from "@/components/Forms/MedicoDatePiker";
import MedicoTimePicker from "@/components/Forms/MedicoTimePicker";
import { useCreateScheduleMutation } from "@/redux/api/scheduleApi";
import dayjs from "dayjs";
import FullPageLoading from "@/components/Loader/FullPageLoader";
import Meta from "@/components/Dashboard/Meta/MetaData";

const CreateSchedules = () => {
  const [createSchedule, { isLoading }] = useCreateScheduleMutation();

  const handleCreateSchedule = async (values: FieldValues) => {
    try {
      const formattedValues = {
        startDate: dayjs(values.startDate).format("YYYY-MM-DD"),
        endDate: dayjs(values.endDate).format("YYYY-MM-DD"),
        startTime: dayjs(values.startTime).format("HH:mm"),
        endTime: dayjs(values.endTime).format("HH:mm"),
      };

      const res = await createSchedule(formattedValues).unwrap();

      if (res) {
        toast.success("Schedule created successfully!");
      }
    } catch (err: any) {
      toast.error(err.message);
      console.error(err.message);
    }
  };

  const defaultValues = {
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
  };

  if (isLoading) {
    return <FullPageLoading />;
  }

  return (
    <>
    <Meta
        title="Create of Schedule | Medico - Hospital & Clinic Management System"
        description="This is the create schedules page of Medico where receptionist can create all their schedules and view details information."
      />

      {/* Header Section */}
      <div className="mx-4 flex items-center justify-between mt-4">
        <h2 className="text-lg text-[#495057] font-semibold">
          Add New Schedules
        </h2>
        <div className="flex items-center gap-1 text-[#495057] text-sm">
          <Link href="/doctor">Dashboard</Link>/
          <Link href="/doctor/schedules">Schedules</Link>/
          <Link href="#">Add New Schedules</Link>
        </div>
      </div>

      <div className="mt-5 ml-4">
        <Link
          href="/doctor/schedules"
          className="text-white text-sm bg-[#556ee6] py-2 px-4 rounded-md"
        >
          <ArrowLeftOutlined className="mr-1" /> Back to Schedules List
        </Link>
      </div>

      {/* Doctor Form */}
      <div className="px-4 sm:px-8 mt-8">
        {/* Section Header */}
        <div className="w-full border border-gray-200 rounded-md border-l-blue-500 px-4 py-4 mb-6">
          Add Schedule
        </div>

        <MedicoForm
          onSubmit={handleCreateSchedule}
          defaultValues={defaultValues}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <MedicoDatePiker label="Start Date" name="startDate" />
            <MedicoDatePiker label="End Date" name="endDate" />
            <MedicoTimePicker label="Start Time" name="startTime" />
            <MedicoTimePicker label="End Time" name="endTime" />
          </div>
          <Button
            htmlType="submit"
            size="large"
            className="my-4 rounded-md bg-[#485EC4] px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-full md:w-auto"
          >
            Add Schedule
          </Button>
        </MedicoForm>
      </div>
    </>
  );
};

export default CreateSchedules;
