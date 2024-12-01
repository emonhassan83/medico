// "use server";
import { jwtDecode } from "jwt-decode";
import { FieldValues } from "react-hook-form";
import setAccessToken from "./setAccessToken";

export const userLogin = async (data: FieldValues) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      // cache: "no-store",
      credentials: "include",
    }
  );

  let decodedData = null;
  const userInfo = await res.json();

  if (userInfo?.data?.accessToken) {
    decodedData = jwtDecode(userInfo?.data?.accessToken) as any;
  }
  console.log({ decodedData, userInfo, res });
  const role = (decodedData?.role).toLowerCase();

  if (userInfo?.data?.accessToken) {
    let redirectUrl = "/dashboard";

    if (role === "admin") {
      redirectUrl = "/dashboard/admin";
    } else if (role === "receptionist") {
      redirectUrl = "/dashboard/receptionist";
    } else if (role === "doctor") {
      redirectUrl = "/dashboard/doctor";
    } else if (role === "patient") {
      redirectUrl = "/dashboard/patient";
    }

    setAccessToken(userInfo?.data?.accessToken, {
      redirect: redirectUrl,
    });
  }

  return userInfo;
};
