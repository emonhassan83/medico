"use client";
import { useGetReceptionistQuery } from "@/redux/api/receptionistApi";
import React from "react";

const ReceptionistDetails = ({ params }: any) => {
  console.log(params.updateId);
  const { data: receptionistData } = useGetReceptionistQuery(params.updateId);

  console.log(receptionistData);
  return <div>heyyyyy</div>;
};

export default ReceptionistDetails;
