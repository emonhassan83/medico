"use client";

import Link from "next/link";
import React, { useState } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import MedicoForm from "@/components/Forms/MedicoForm";
import MedicoInput from "@/components/Forms/MedicoInput";
import { Button, Image, Card, Upload } from "antd";
import { FieldValues } from "react-hook-form";
import MedicoTextArea from "@/components/Forms/MedicoTextArea";
import uploadImageToImgbb from "@/components/ImageUploader/ImageUploader";
import { toast } from "sonner";
import {
  useGetSingleSpecialtiesQuery,
  useUpdateSpecialtiesMutation,
} from "@/redux/api/specialtiesApi";
import { useRouter } from "next/navigation";
import FullPageLoading from "@/components/Loader/FullPageLoader";
import Meta from "@/components/Dashboard/Meta/MetaData";

const UpdateSpecialties = ({ params }: any) => {
  const router = useRouter();
  const [icon, setIcon] = useState("");
  const { data, refetch, isLoading } = useGetSingleSpecialtiesQuery(
    params.updateId
  );
  const [updateSpecialties, {isLoading: isUpdating}] = useUpdateSpecialtiesMutation();

  const handleFileUpload = async (file: File) => {
    try {
      const image = await uploadImageToImgbb(file);
      if (image) {
        toast.success("Specialties Icon Upload successfully");
      }
      setIcon(image);
    } catch (error) {
      console.error("Failed to upload image:", error);
    }
  };
  const handleUpdateSpecialties = async (formData: FieldValues) => {
    try {
      const updateData = {
        id: params.updateId,
        body: {
          ...formData,
          icon,
        },
      };

      const result = await updateSpecialties({
        id: params.updateId,
        body: formData,
      }).unwrap();

      if (result) {
        toast.success("Receptionist updated successfully!");
        refetch();
        router.push("/admin/specialties");
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  if (isLoading || isUpdating) {
    return <FullPageLoading/>;
  }

  return (
    <>
    <Meta
        title="Specialties Update Page | Medico - Hospital & Clinic Management System"
        description="This is the update page of Specialties of Medico where admin can manage show Specialties update, and more."
      />

      {/* Header Section */}
      <div className="mx-4 flex items-center justify-between mt-4">
        <h2 className="text-lg text-[#495057] font-semibold">
          Update Specialties
        </h2>
        <div className="flex items-center gap-1 text-[#495057] text-sm">
          <Link href="/admin">Dashboard</Link>/
          <Link href="/admin/specialties">Specialties</Link>/
          <Link href="#">Update Specialties</Link>
        </div>
      </div>

      <div className="mt-5 ml-4">
        <Link
          href="/admin/specialties"
          className="text-white text-sm bg-[#556ee6] py-2 px-4 rounded-md"
        >
          <ArrowLeftOutlined className="mr-1" /> Back to Specialties List
        </Link>
      </div>

      {/* Doctor Form */}
      <div className="px-4 sm:px-8 mt-8">
        {/* Section Header */}
        <div className="w-full border border-gray-200 rounded-md border-l-blue-500 px-4 py-4 mb-6">
          Basic Information
        </div>

          <MedicoForm onSubmit={handleUpdateSpecialties} defaultValues={data}>
            {/* Rows of Input Fields */}
            <div className="flex flex-wrap gap-4 w-full">
              <div className="w-[60%]">
                <MedicoInput label="Title" type="text" name="title" />
                <MedicoTextArea
                  label="Description"
                  name="description"
                  rows={4}
                />
              </div>
              <div className="w-[38%]">
                <div>
                  <p className="block text-sm font-semibold mb-2">Icon</p>
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
                          height: "160px",
                          width: "160px",
                          margin: "auto",
                          borderRadius: "4px",
                          overflow: "hidden",
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
                            src="https://i.ibb.co/qsdyjP8/placeholder-img.png"
                            alt="Specialties Icon"
                            preview={false}
                            style={{
                              marginTop: "60px",
                              height: "100%",
                              width: "100%",
                              objectFit: "cover",
                              cursor: "pointer",
                            }}
                          />
                        </Upload>
                      </div>
                    }
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              htmlType="submit"
              size="large"
              className="my-4 rounded-md bg-[#485EC4] px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-full md:w-auto"
            >
              Update Specialties
            </Button>
          </MedicoForm>
      </div>
    </>
  );
};

export default UpdateSpecialties;
