"use client";

import Link from "next/link";
import { ArrowLeftOutlined } from "@ant-design/icons";
import MedicoForm from "@/components/Forms/MedicoForm";
import { Button } from "antd";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import MedicoDatePiker from "@/components/Forms/MedicoDatePiker";
import { useCreatePrescriptionMutation } from "@/redux/api/prescriptionApi";
import { useGetAllAppointmentsQuery } from "@/redux/api/appointmentApi";
import MedicoSelect from "@/components/Forms/MedicoSelect";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";

const CreatePrescription = () => {
  const { data } = useGetAllAppointmentsQuery({});
  const [createPrescription] = useCreatePrescriptionMutation();
  const [value, setValue] = useState("");

  const prescribePatient = data?.appointments?.filter(
    (appointment: any) => appointment?.status === "INPROGRESS"
  );

  const patientOptions = prescribePatient?.map((item: any) => ({
    value: item.id,
    label: `${item.patient.firstName} ${item.patient.lastName}`,
  }));

  const handleCreatePrescription = async (values: FieldValues) => {
    try {
      const prescriptionData = {
        appointmentId: values.appointmentId,
        instructions: value,
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

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline", "strike"],
      [{ align: [] }],
      ["blockquote", "code-block"],
      ["link", "image", "video", "formula"],
      [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ color: [] }, { background: [] }],
      ["clean"],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "align",
    "code-block",
    "background",
    "color",
    "code",
    "script",
  ];

const defaultValues = {
  appointmentId: "",
  instructions: "",
  followUpDate: "",
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full items-start">
            <MedicoSelect
              label="Patient Appointment"
              name="appointmentId"
              options={patientOptions}
            />
            <MedicoDatePiker label="Follow Up Date" name="followUpDate" />
          </div>
          <p className="block text-sm font-medium text-gray-700" style={{ marginBottom: "5px" }}>Instructions</p>
          <ReactQuill
            theme="snow"
            value={value}
            onChange={setValue}
            modules={modules}
            formats={formats}
          />

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

// import React from 'react';

// const page = () => {
//   return (
//     <div>
//       create prescription
//     </div>
//   );
// };

// export default page;