"use client";

import { Button } from "antd";
import MedicoForm from "@/components/Forms/MedicoForm";
import MedicoInput from "@/components/Forms/MedicoInput";
import Link from "next/link";
import React, { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { userLogin } from "@/services/actions/loginUsers";
import { storeUserInfo } from "@/services/auth.services";
import Meta from "@/components/Dashboard/Meta/MetaData";

// Demo credentials array
const demoCredentials = [
  { role: "Admin", email: "alice.smith@example.com", password: "admin123" },
  {
    role: "Receptionist",
    email: "sophia.taylor@example.com",
    password: "receptionist123",
  },
  { role: "Doctor", email: "isabella.martinez@example.com", password: "doctor123" },
  {
    role: "Patient",
    email: "ethan.miller@example.com",
    password: "patient123",
  },
];

const LoginPage = () => {
  const [defaultValues, setDefaultValues] = useState({
    email: "alice.smith@example.com",
    password: "admin123",
  });

  const handleLogin = async (values: FieldValues) => {
    try {
      const res = await userLogin(values);

      if (res?.data?.accessToken) {
        toast.success(res?.message);
        storeUserInfo({ accessToken: res?.data?.accessToken });
      } else {
        toast.error(res?.message);
      }
    } catch (err: any) {
      toast.error(err.message);
      console.error(err.message);
    }
  };

  const setDemoCredentials = (email: string, password: string) => {
    setDefaultValues({ email, password });
  };

  return (
    <>
      <Meta
        title="Login | Medico - Hospital & Clinic Management System"
        description="This is the login page of Medico where all users can login their account and provide access to the service."
      />

      <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
        <div className="w-full max-w-lg rounded-lg">
          <div className="bg-white">
            {/* Welcome Section */}
            <div className="bg-[#D4DBF9] pt-7 pb-10 pl-4 mb-10 rounded">
              <h5 className="text-[#485EC4] font-medium text-lg">
                Welcome Back!
              </h5>
              <p className="text-[#485EC4] text-sm">
                Sign in to continue to Medico.
              </p>
            </div>

            {/* Login Form */}
            <div className="px-8 pb-8">
              <MedicoForm onSubmit={handleLogin} defaultValues={defaultValues}>
                <MedicoInput label="Email" type="text" name="email" />
                <MedicoInput label="Password" type="password" name="password" />
                <Button
                  htmlType="submit"
                  size="large"
                  className="mt-4 w-full rounded-md bg-[#485EC4] px-4 py-2 text-white"
                >
                  Login
                </Button>
              </MedicoForm>

              <p className="text-sm mt-2 text-center text-gray-600">
                Forgot your password?
              </p>

              {/* Demo Credentials */}
              {demoCredentials.map(({ role, email, password }) => (
                <div
                  className="flex justify-between items-center mt-4"
                  key={role}
                >
                  <div>
                    <h3 className="text-md text-gray-500">{role}:</h3>
                    <p className="text-sm text-gray-600">Email - {email}</p>
                    <p className="text-sm text-gray-600">Pass - {password}</p>
                  </div>
                  <div>
                    <button
                      type="button"
                      className="text-white bg-[#485EC4] rounded px-2 py-1"
                      onClick={() => setDemoCredentials(email, password)}
                    >
                      Login
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Section */}
          <p className="text-sm mt-8 text-center text-gray-600">
            Don&apos;t have an account?{" "}
            <Link className="text-[#485EC4]" href="/register">
              Sign Up here
            </Link>
          </p>
          <p className="text-sm mt-2 text-center text-gray-600">
            © {new Date().getFullYear()} Medico. Crafted with ❤️ by Medico Team
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
