/* eslint-disable react/jsx-key */
"use client";

import Link from "next/link";
import React from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import MedicoForm from "@/components/Forms/MedicoForm";
import MedicoInput from "@/components/Forms/MedicoInput";
import { Button, Image, Card, Upload } from "antd";
import { FieldValues } from "react-hook-form";
import MedicoTextArea from "@/components/Forms/MedicoTextArea";

export const defaultValues = {
  title: "",
  descriptions: "",
};

const CreateSpecialties = () => {
  const handleFileUpload = async (file: File) => {
    console.log(file);

    // try {
    //   const image = await uploadImageToImgbb(file);

    //   const updatedUserData = {
    //     id: data?.data?._id,
    //     userData: {
    //       photoUrl: image },
    //   };

    //   const upload = await updateMyProfile(updatedUserData).unwrap();
    //   if (upload?.success) {
    //     toast.success("Profile photo updated successfully");
    //   }
    // } catch (error) {
    //   console.error("Failed to upload image:", error);
    // }
  };

  const handleCreateSpecialties = async (values: FieldValues) => {
    console.log(values);
  };

  return (
    <>
      {/* Header Section */}
      <div className="mx-4 flex items-center justify-between mt-4">
        <h2 className="text-lg text-[#495057] font-semibold">
          Add New Specialties
        </h2>
        <div className="flex items-center gap-1 text-[#495057] text-sm">
          <Link href="/admin">Dashboard</Link>/
          <Link href="/admin/specialties">Specialties</Link>/
          <Link href="#">Add New Specialties</Link>
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

        <MedicoForm
          onSubmit={handleCreateSpecialties}
          defaultValues={defaultValues}
        >
          {/* Rows of Input Fields */}
          <div className="flex flex-wrap gap-4 w-full">
            <div className="w-[60%]">
              <MedicoInput label="Title" type="text" name="title" />
              <MedicoTextArea label="Description" name="description" rows={4} />
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
                            marginTop: "40px",
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
            Add New Specialties
          </Button>
        </MedicoForm>
      </div>
    </>
  );
};

export default CreateSpecialties;
