/* eslint-disable react/jsx-key */
"use client";

import Link from "next/link";
import React, { useState } from "react";
import {
  ArrowLeftOutlined
} from "@ant-design/icons";
import MedicoForm from "@/components/Forms/MedicoForm";
import MedicoInput from "@/components/Forms/MedicoInput";
import { Button, Image, Card, Upload } from "antd";
import { FieldValues } from "react-hook-form";
import MedicoSelect from "@/components/Forms/MedicoSelect";
import { useGetAllSpecialtiesQuery } from "@/redux/api/specialitiesApi";
import uploadImageToImgbb from "@/components/ImageUploader/ImageUploader";
import { toast } from "sonner";
import { useCreateDoctorMutation, useUpdateDoctorMutation } from "@/redux/api/doctorApi";

export const defaultValues = {
  password: "",
  doctor: {
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    address: "",
    gender: "",
    designation: "",
    registrationNumber: "",
    qualification: "",
    experience: "",
    appointmentFee: "",
    currentWorkingPlace: "",
    profilePhoto: "",
  },
};

const Doctor = () => {
  const [photo, setPhoto] = useState("");
  const { data: specialties } = useGetAllSpecialtiesQuery([]);
  const [createDoctor] = useCreateDoctorMutation();
  const [updateDoctor] = useUpdateDoctorMutation();

  const specialtiesOptions = specialties?.data?.map((item: any) => ({
    value: item.id,
    label: `${item.title}`,
  }));

  const handleFileUpload = async (file: File) => {
    try {
      const image = await uploadImageToImgbb(file);
      
      if (image) {
        toast.success("Doctor Photo Upload successfully");
      }
      setPhoto(image);
    } catch (error) {
      console.error("Failed to upload image:", error);
    }
  };

  const handleCreateDoctor = async (values: FieldValues) => {
    console.log(values);
  };

  return (
    <>
      {/* Header Section */}
      <div className="mx-4 flex items-center justify-between mt-4">
        <h2 className="text-lg text-[#495057] font-semibold">Add New Doctor</h2>
        <div className="flex items-center gap-1 text-[#495057] text-sm">
          <Link href="/admin">Dashboard</Link>/
          <Link href="/admin/doctors">Doctors</Link>/
          <Link href="#">Add New Doctor</Link>
        </div>
      </div>

      <div className="mt-5 ml-4">
        <Link
          href="/admin/doctors"
          className="text-white text-sm bg-[#556ee6] py-2 px-4 rounded-md"
        >
          <ArrowLeftOutlined className="mr-1" /> Back to Doctor List
        </Link>
      </div>

      {/* Doctor Form */}
      <div className="px-4 sm:px-8 mt-8">
        {/* Section Header */}
        <div className="w-full border border-gray-200 rounded-md border-l-blue-500 px-4 py-4 mb-6">
          Basic Information
        </div>

        <MedicoForm onSubmit={handleCreateDoctor} defaultValues={defaultValues}>
          {/* Rows of Input Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <MedicoInput
              label="First Name"
              type="text"
              name="doctor.firstName"
            />
            <MedicoInput label="Last Name" type="text" name="doctor.lastName" />

            <MedicoInput
              label="Contact No"
              type="text"
              name="doctor.contactNumber"
            />
            <MedicoInput label="Email" type="text" name="doctor.email" />

            <MedicoInput label="Address" type="text" name="doctor.address" />
            <MedicoSelect
              name="gender"
              label="Gender"
              options={[
                { value: "MALE", label: "Male" },
                { value: "FEMALE", label: "Female" },
                { value: "UNKNOWN", label: "Unknown" },
              ]}
            />

            <MedicoInput
              label="Designation"
              type="text"
              name="doctor.designation"
            />
            <MedicoInput
              label="Registration Number"
              type="text"
              name="doctor.registrationNumber"
            />

            <MedicoSelect
              name="specialties"
              label="Specialties"
              mode="multiple"
              options={specialtiesOptions}
            />
            <MedicoInput
              label="Qualification"
              type="text"
              name="doctor.qualification"
            />

            <MedicoInput
              label="Experience"
              type="text"
              name="doctor.experience"
            />
            <MedicoInput label="Fee" type="text" name="doctor.appointmentFee" />

            <MedicoInput
              label="Current Working Place"
              type="text"
              name="doctor.currentWorkingPlace"
            />

            <div className="h-10 w-full">
              <p
                className="block text-sm font-medium text-gray-700"
                style={{ marginBottom: "5px" }}
              >
                Profile URL
              </p>
              <Card
              style={{
                height: "180px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
                cover={
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "180px",
                      width: "180px",
                      margin: "auto",
                      borderRadius: "8px",
                    }}
                  >
                    <Upload
                      customRequest={({ file }) =>
                        handleFileUpload(file as File)
                      }
                      showUploadList={false}
                      accept="image/*"
                    >
                      <Image
                        src="https://i.ibb.co/Gx3Rg6S/download.jpg"
                        alt="User Photo"
                        preview={false}
                        style={{
                          marginTop: "40px",
                          height: "140px",
                          width: "140px",
                          objectFit: "cover",
                          cursor: "pointer",
                          borderRadius: "50%",
                          border: "2px solid #ddd",
                        }}
                      />
                    </Upload>
                  </div>
                }
              />
            </div>
          </div>

          {/* Submit Button */}
          <Button
            htmlType="submit"
            size="large"
            className="mt-20 rounded-md bg-[#485EC4] px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-full md:w-auto"
          >
            Add New Doctor
          </Button>
        </MedicoForm>
      </div>
    </>
  );
};

export default Doctor;
