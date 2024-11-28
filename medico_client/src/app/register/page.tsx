"use client";

import { Button, Col, Divider, Row } from "antd";
import MedicoForm from "@/components/Forms/MedicoForm";
import MedicoInput from "@/components/Forms/MedicoInput";
import Link from "next/link";
import React from "react";
import { FieldValues } from "react-hook-form";
import { IRegisterUser } from "@/types";
import { toast } from "sonner";

export const defaultValues = {
  password: "",
  patient: {
    firstName: "",
    lastName: "",
    email: "",
    confirmPassword: "",
  },
};

const RegisterPage = () => {
  const handleRegister = async (values: FieldValues) => {
    const { password, patient } = values;

    const userData: IRegisterUser = {
      password,
      patient: {
          firstName: patient?.firstName,
          lastName: patient?.lastName,
          email: patient?.email,
          contactNumber: patient?.contactNumber
      },
    };
    
    if (password !== patient?.confirmPassword) {
      toast.error("Password and Confirm Passwords do not match!");
      return;
    }

    if (password === patient?.confirmPassword) {
      try {
        console.log("hello");
        
      } catch (error: any) {
        toast.error(error.message);
        console.error(error.message);
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-lg rounded-lg">
        <div className="bg-white">
          <div className="bg-[#D4DBF9] pt-7 pb-10 pl-4 mb-10">
            <h5 className="text-[#485EC4] font-medium text-lg">
              Patient Register
            </h5>
            <p className="text-[#485EC4] text-sm">
              Get your free Medico Patient account now.
            </p>
          </div>
          <div className="px-8 pb-8">
            <MedicoForm onSubmit={handleRegister} defaultValues={defaultValues}>
              <MedicoInput label="First Name" type="text" name="patient.firstName" />
              <MedicoInput label="Last Name" type="text" name="patient.lastName" />
              <MedicoInput label="Contact No" type="text" name="patient.contactNumber" />
              <MedicoInput label="Email" type="text" name="patient.email" />
              <MedicoInput label="Password" type="password" name="password" />
              <MedicoInput
                label="Confirm Password"
                type="password"
                name="patient.confirmPassword"
              />
              <Button
                htmlType="submit"
                size="large"
                className="mt-4 w-full rounded-md bg-[#485EC4] px-4 py-2 text-white  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Register
              </Button>

              <p className="text-sm mt-4 text-center text-gray-600">
                By registering you agree to the Medico{" "}
                <span className="text-[#485EC4]"> Terms of Use</span>{" "}
              </p>
            </MedicoForm>
          </div>
        </div>

        <div className="mt-8">
          <p className="text-sm mt-4 text-center text-gray-600">
            Already have an account ?
            <span className="text-[#485EC4]">
              {" "}
              <Link href="/login">Login</Link>{" "}
            </span>{" "}
          </p>

          <p className="text-sm mt-2 text-center text-gray-600">
            © {new Date().getFullYear()} Medico. Crafted with ❤️ by Medico Team{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
