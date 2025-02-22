"use client";

import React, { useState } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import MedicoForm from "@/components/Forms/MedicoForm";
import MedicoInput from "@/components/Forms/MedicoInput";
import { Button, Image, Card, Upload } from "antd";
import { FieldValues } from "react-hook-form";
import uploadImageToImgbb from "@/components/ImageUploader/ImageUploader";
import { toast } from "sonner";
import {
  useGetReceptionistQuery,
  useUpdateReceptionistMutation,
} from "@/redux/api/receptionistApi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import FullPageLoading from "@/components/Loader/FullPageLoader";
import Meta from "@/components/Dashboard/Meta/MetaData";

const ReceptionDetailPage = ({ params }: any) => {
  const router = useRouter();
  const [photo, setPhoto] = useState("");
  const { data, isLoading } = useGetReceptionistQuery(params?.updateId);
  const [updateReceptionist, { isLoading: isUpdating }] =
    useUpdateReceptionistMutation();

  const handleFileUpload = async (file: File) => {
    try {
      const image = await uploadImageToImgbb(file);

      if (image) {
        toast.success("Receptionist Photo Upload successfully");
      }
      setPhoto(image);
    } catch (error) {
      console.error("Failed to upload image:", error);
    }
  };
  const handleUpdateReceptionist = async (formData: FieldValues) => {
    try {
      const result = await updateReceptionist({
        id: params.updateId,
        body: formData,
      }).unwrap();

      if (result?.id) {
        toast.success("Receptionist updated successfully!");
        router.push("/admin/receptionists");
      }
    } catch (error: any) {
      console.error("Failed to update receptionist:", error?.message);
      toast.error(error?.message);
    }
  };

  if (isLoading || isUpdating) {
    return <FullPageLoading />;
  }

  return (
    <>
      <Meta
        title="Receptionist Update Page | Medico - Hospital & Clinic Management System"
        description="This is the update page of Receptionist of Medico where admin can manage show Receptionist update, and more."
      />

      {/* Header Section */}
      <div className="mx-4 flex items-center justify-between mt-4">
        <h2 className="text-lg text-[#495057] font-semibold">
          Update Receptionist
        </h2>
        <div className="flex items-center gap-1 text-[#495057] text-sm">
          <Link href="/admin">Dashboard</Link>/
          <Link href="/admin/receptionists">Receptionist</Link>/
          <Link href="#">Update Receptionist</Link>
        </div>
      </div>

      <div className="mt-5 ml-4">
        <Link
          href="/admin/receptionists"
          className="text-white text-sm bg-[#556ee6] py-2 px-4 rounded-md"
        >
          <ArrowLeftOutlined className="mr-1" /> Back to Receptionist List
        </Link>
      </div>

      {/* Doctor Form */}
      <div className="px-4 sm:px-8 mt-8">
        {/* Section Header */}
        <div className="w-full border border-gray-200 rounded-md border-l-blue-500 px-4 py-4 mb-6">
          Basic Information
        </div>

        <MedicoForm onSubmit={handleUpdateReceptionist} defaultValues={data}>
          {/* Rows of Input Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <MedicoInput label="First Name" type="text" name="firstName" />
            <MedicoInput label="Last Name" type="text" name="lastName" />
            {/* <MedicoInput label="Email" type="text" name="email" /> */}
            <MedicoInput label="Contact No" type="text" name="contactNumber" />

            <MedicoInput label="Address" type="text" name="address" />
            <div className="w-full">
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
                      height: "160px",
                      width: "160px",
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
            className="my-4 rounded-md bg-[#485EC4] px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-full md:w-auto"
          >
            Update Receptionist
          </Button>
        </MedicoForm>
      </div>
    </>
  );
};

export default ReceptionDetailPage;
