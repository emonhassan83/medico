/* eslint-disable react/jsx-key */
"use client";

import Link from "next/link";
import { ArrowLeftOutlined } from "@ant-design/icons";
import MedicoForm from "@/components/Forms/MedicoForm";
import MedicoInput from "@/components/Forms/MedicoInput";
import { Button } from "antd";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import MedicoDatePiker from "@/components/Forms/MedicoDatePiker";
import MedicoTextArea from "@/components/Forms/MedicoTextArea";
import { useCreatePrescriptionMutation } from "@/redux/api/prescriptionApi";

export const defaultValues = {
  appointmentId: "",
  instructions: "",
  followUpDate: "",
};

const CreatePrescription = () => {
  const [createPrescription] = useCreatePrescriptionMutation();

  const handleCreatePrescription = async (values: FieldValues) => {
    try {
      const prescriptionData = {
        appointmentId: values.appointmentId,
        instructions: values.instructions,
        followUpDate: values.followUpDate,
      };

      const res = await createPrescription(prescriptionData).unwrap();

      if (res?.id) {
        toast.success("Prescription created successfully!");
      }
    } catch (err: any) {
      toast.error(err.message);
      console.error(err.message);
    }
  };

  return (
    <>
      {/* Header Section */}
      <div className="mx-4 flex items-center justify-between mt-4">
        <h2 className="text-lg text-[#495057] font-semibold">
          Add New Prescription
        </h2>
        <div className="flex items-center gap-1 text-[#495057] text-sm">
          <Link href="/doctor">Dashboard</Link>/
          <Link href="/doctor/prescription">Prescription</Link>/
          <Link href="#">Add New Prescription</Link>
        </div>
      </div>

      <div className="mt-5 ml-4">
        <Link
          href="/doctor/prescription"
          className="text-white text-sm bg-[#556ee6] py-2 px-4 rounded-md"
        >
          <ArrowLeftOutlined className="mr-1" /> Back to Prescription List
        </Link>
      </div>

      {/* Doctor Form */}
      <div className="px-4 sm:px-8 mt-8">
        {/* Section Header */}
        <div className="w-full border border-gray-200 rounded-md border-l-blue-500 px-4 py-4 mb-6">
          Patient Appointment Information
        </div>

        <MedicoForm
          onSubmit={handleCreatePrescription}
          defaultValues={defaultValues}
        >
          {/* Rows of Input Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <MedicoInput
              label="Patient Appointment"
              type="text"
              name="appointmentId"
            />
            <MedicoDatePiker label="Follow Up Date" name="followUpDate" />
          </div>
          <MedicoTextArea label="Instructions" rows={5} name="instructions" />

          {/* Submit Button */}
          <Button
            htmlType="submit"
            size="large"
            className="my-4 rounded-md bg-[#485EC4] px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-full md:w-auto"
          >
            Add Prescription
          </Button>
        </MedicoForm>
      </div>
    </>
  );
};

export default CreatePrescription;
