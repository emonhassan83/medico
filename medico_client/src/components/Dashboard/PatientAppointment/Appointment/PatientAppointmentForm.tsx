"use client";

import MedicoForm from "@/components/Forms/MedicoForm";
import MedicoSelect from "@/components/Forms/MedicoSelect";
import { useCreateAppointmentMutation } from "@/redux/api/appointmentApi";
import {
  useGetAllDoctorsQuery,
  useGetDoctorQuery,
} from "@/redux/api/doctorApi";
import dayjs from "dayjs";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";


const PatientAppointmentForm = () => {
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(null);
  const { data } = useGetAllDoctorsQuery([]);
  const { data: doctorData } = useGetDoctorQuery(selectedDoctorId || "", {
    skip: !selectedDoctorId,
  });
  const [createAppointment] = useCreateAppointmentMutation();

  const doctorsOptions = data?.doctors?.map((item: any) => ({
    value: item.id,
    label: `${item.firstName}  ${item.lastName}`,
  }));

  const scheduleOptions = doctorData?.schedules?.map((item: any) => ({
    value: item?.scheduleId,
    label:
      dayjs(item.schedule?.startDate).format("h:mm A") +
      " - " +
      dayjs(item.schedule?.endDate).format("h:mm A") +
      " - " +
      dayjs(item?.schedule?.endDate).format("YYYY-MM-DD"),
  }));

  const handleCreateDoctor = async (values: FieldValues) => {
    try {
      const res = await createAppointment(values).unwrap();
      
      if (res.id) {
        toast.success("Appointment created successfully!")
      }
    } catch (err: any) {
      toast.error(err.message);
      console.error(err.message);
    }
  };

  const handleDoctorChange = (doctorId: string) => {
    setSelectedDoctorId(doctorId);
  };

  
const defaultValues = {
  doctorId: "",
  scheduleId: "",
};

  return (
    <>
      <MedicoForm onSubmit={handleCreateDoctor} 
      defaultValues={defaultValues}
      >
        <MedicoSelect
          name="doctorId"
          label="Select Doctors"
          options={doctorsOptions}
          onChange={(value) => {
            handleDoctorChange(value);
          }}
        />

        <MedicoSelect
          name="scheduleId"
          label="Available Slot"
          options={scheduleOptions}
          disabled={!scheduleOptions?.length}
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

export default PatientAppointmentForm;
