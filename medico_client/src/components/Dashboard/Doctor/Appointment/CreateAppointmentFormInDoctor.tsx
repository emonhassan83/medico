"use client";

import MedicoDatePiker from "@/components/Forms/MedicoDatePiker";
import MedicoForm from "@/components/Forms/MedicoForm";
import MedicoSelect from "@/components/Forms/MedicoSelect";
import { useCreateAppointmentMutation } from "@/redux/api/appointmentApi";
import { useGetAllDoctorsQuery } from "@/redux/api/doctorApi";
import { useGetAllSchedulesQuery } from "@/redux/api/scheduleApi";
import { FieldValues } from "react-hook-form";

export const defaultValues = {
  doctor: "",
  date: "",
  scheduleIds: "",
};

const CreateAppointmentFormInDoctor = () => {
  const [createAppointment] = useCreateAppointmentMutation();
  const { data: doctors } = useGetAllDoctorsQuery({});
  const { data: schedules } = useGetAllSchedulesQuery({
    name: "limit",
    value: 20,
  });
  console.log(schedules);

  const doctorOptions = doctors?.doctors?.map((item: any) => ({
    value: item.id,
    label: `${item.firstName} ${item.firstName}`,
  }));

  const scheduleOptions = schedules?.data?.map((item: any) => ({
    value: item.id,
    label: `${item.startDate} ${item.endDate}`,
  }));

  const handleCreateDoctor = async (values: FieldValues) => {
    console.log(values);
  };

  return (
    <>
      <MedicoForm onSubmit={handleCreateDoctor} defaultValues={defaultValues}>
        {/* Doctor Selection */}
        <div className="sm:flex items-center gap-4 mt-6">
          <MedicoSelect
            name="doctor"
            label="Select Doctor"
            options={doctorOptions}
          />
          <MedicoDatePiker name="date" label="Date" />
        </div>

        {/* Available Slot */}
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
