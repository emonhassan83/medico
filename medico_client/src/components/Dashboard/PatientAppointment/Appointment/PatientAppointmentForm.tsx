"use client";

import MedicoForm from "@/components/Forms/MedicoForm";
import MedicoSelect from "@/components/Forms/MedicoSelect";
import {
  useGetAllDoctorsQuery,
  useGetDoctorQuery,
} from "@/redux/api/doctorApi";
import dayjs from "dayjs";
import { useState } from "react";
import { FieldValues } from "react-hook-form";

export const defaultValues = {
  doctorId: "",
  scheduleIds: "",
};

const PatientAppointmentForm = () => {
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(null);
  const { data } = useGetAllDoctorsQuery([]);
  const { data: doctorData } = useGetDoctorQuery(selectedDoctorId || "", {
    skip: !selectedDoctorId,
  });

  const doctorsOptions = data?.doctors?.map((item: any) => ({
    value: item.id,
    label: `${item.firstName}  ${item.lastName}`,
  }));
  
  const scheduleOptions = doctorData?.schedules?.map((item: any) => ({
    value: item.id,
    label:
      dayjs(item.startDate).format("h:mm A") +
      " - " +
      dayjs(item.endDate).format("h:mm A"),
  }));

  const handleCreateDoctor = async (values: FieldValues) => {
    console.log(values);
  };

  const handleDoctorChange = (doctorId: string) => {
    setSelectedDoctorId(doctorId);
  };

  return (
    <>
      <MedicoForm onSubmit={handleCreateDoctor} defaultValues={defaultValues}>
        <MedicoSelect
          name="doctorId"
          label="Select Doctors"
          options={doctorsOptions}
          onChange={handleDoctorChange}
        />
        <MedicoSelect
          name="scheduleId"
          label="Available Slot"
          options={scheduleOptions}
          disabled={!doctorData}
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
