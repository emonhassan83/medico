"use client";

import MedicoForm from "@/components/Forms/MedicoForm";
import MedicoSelect from "@/components/Forms/MedicoSelect";
import { useCreateAppointmentMutation } from "@/redux/api/appointmentApi";
import { useCreateDoctorScheduleMutation } from "@/redux/api/doctorScheduleApi";
import {
  useCreateScheduleMutation,
  useGetAllSchedulesQuery,
} from "@/redux/api/scheduleApi";
import dayjs from "dayjs";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

const CreateAppointmentFormInDoctor = () => {
  const [createAppointment] = useCreateAppointmentMutation();
  const [createSchedule] = useCreateScheduleMutation();
  const [createDoctorSchedule] = useCreateDoctorScheduleMutation();
  const { data: schedules } = useGetAllSchedulesQuery([]);

  // console.log(schedules);

  const dateOptions = schedules?.data?.map((item: any) => ({
    value: item.id,
    label: dayjs(item.startDate).format("YYYY-MM-DD"),
  }));

  // Formatting scheduleOptions
  const scheduleOptions = schedules?.data?.map((item: any) => ({
    value: item.id,
    label:
      dayjs(item.startDate).format("h:mm A") +
      " - " +
      dayjs(item.endDate).format("h:mm A"),
  }));

  const handleCreateSchedule = async (values: FieldValues) => {
    // console.log(values);
    try {
      const payload = {
        scheduleIds: values.scheduleIds,
      };

      console.log("Sending payload:", payload);

      const response = await createDoctorSchedule(payload).unwrap();
      if (response) {
        toast.success("Appointment created successfully!");
      }
    } catch (error: any) {
      console.error("Error:", error);
      toast.error(error?.data?.message || "Failed to create appointment.");
    }
  };

 const defaultValues = {
  date: "",
  scheduleIds: "",
};

  return (
    <>
      <MedicoForm onSubmit={handleCreateSchedule} 
      defaultValues={defaultValues}
      >
        <MedicoSelect name="date" label="Select Date" options={dateOptions} />
        <MedicoSelect
          name="scheduleIds"
          label="Available Slot"
          mode="multiple"
          options={scheduleOptions}
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-[180px] bg-[#556ee6] text-white py-2 px-2 rounded hover:bg-blue-700 text-sm"
        >
          Create Appointment
        </button>
      </MedicoForm>
    </>
  );
};

export default CreateAppointmentFormInDoctor;
