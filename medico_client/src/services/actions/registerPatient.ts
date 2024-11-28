"use server";

import { IRegisterUser } from "@/types";

export const registerUsers = async (userData: IRegisterUser) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/create-patient`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData),
      cache: "no-store",
    }
  );

  const userInfo = await res.json();
  return userInfo;
};