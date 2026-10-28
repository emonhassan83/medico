"use client";

import { useGetAppointmentQuery } from "@/redux/api/appointmentApi";
import { Table } from "antd";
import Link from "next/link";
import React from "react";
import { BsSlash } from "react-icons/bs";
import { TiArrowLeft } from "react-icons/ti";
import "./tableBgColor.css";
import {
  useInitialPaymentMutation,
  useValidatePaymentMutation,
} from "@/redux/api/paymentApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { FaPhoneVolume } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
import logo from "@/assets/logo/Logo.png";
import Image from "next/image";
import FullPageLoading from "@/components/Loader/FullPageLoader";
import Meta from "@/components/Dashboard/Meta/MetaData";

const columns = [
  {
    title: "No.",
    dataIndex: "number",
    key: "number",
    width: "10%",
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    width: "60%",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    align: "right" as const,
    width: "30%",
    render: (amount: any) => `$ ${amount}`,
  },
];

const AppointmentDetails = ({ params }: any) => {
  const { data, isLoading } = useGetAppointmentQuery(params?.detailId);
  const [initialPayment, { isLoading: isPayment }] =
    useInitialPaymentMutation();
  const [validatePayment, { isLoading: isPaymentValidate }] =
    useValidatePaymentMutation();
  const router = useRouter();

  const tableData = [
    {
      key: data?.id,
      srNo: 1,
      title: "Appointment Free",
      amount: data?.doctor?.appointmentFee,
    },
  ];

  const totalAmount = data?.doctor?.appointmentFee;
  const tax = Math.round(totalAmount * 0.05);
  const totalWithTax = totalAmount + tax;

  const handlePayment = async (id: string) => {
    try {
      const response = await initialPayment(id).unwrap();

      if (response?.paymentUrl) {
        router.push(response?.paymentUrl);
        
        //* validate to payment manually
        const res = await validatePayment(id).unwrap();
        if (res.message) {
          toast.success("Payment validated successfully!")
        }

      } else {
        router.push("/payment?status=success");
      }
    } catch (err: any) {
      toast.error(err?.message);
      console.error(err?.message);
    }
  };

  if (isLoading || isPayment || isPaymentValidate) {
    return <FullPageLoading />;
  }

  return (
    <>
      <Meta
        title="Details Invoice | Medico - Hospital & Clinic Management System"
        description="This is the details of invoices page of Medico where patients can details their invoices information and patient can payment their Pending Payments."
      />

      <div className="mx-5">
        <div>
          <div className="flex items-center justify-between mt-5">
            <div>
              <h2 className="text-lg text-[#495057] font-semibold">
                INVOICE DETAILS
              </h2>
            </div>
            <div className="flex items-center gap-[2px] text-[#495057] text-sm">
              <Link href="/patient" className="">
                Dashboard
              </Link>
              <BsSlash className="text-[#ccc]" />
              <Link href="/patient/invoices">Invoice List</Link>
              <BsSlash className="text-[#ccc]" />
              <Link href="#">Invoice Details</Link>
            </div>
          </div>
          <div className="mt-5">
            <Link
              href="/patient/invoices"
              className="flex items-center gap-2 w-[200px] text-white text-sm bg-[#556ee6] hover:bg-blue-700 py-3 px-3 rounded-md"
            >
              <TiArrowLeft className="text-lg" /> Back to invoice list
            </Link>
          </div>
        </div>

        <div className="my-5">
          <div className="bg-white p-5">
            <div className="flex justify-between items-center border-b border-[#f3f0f0] pb-3">
              <div className="flex items-center gap-2">
                <Image src={logo} alt="Logo" width={35} height={35} />
                <h3 className="text-xl font-bold text-[#495057]">Medico</h3>
              </div>
              <div className="text-right">
                {/* <p className="text-sm text-[#495057]">Invoice #227</p> */}
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 md:grid-cols-4 gap-2 text-[#495057]">
              <div>
                <h4 className="text-sm font-bold text-[#495057]">
                  Patient Details
                </h4>
                <p className="text-sm">
                  {data?.patient?.firstName} {data?.patient?.lastName}
                </p>
                <div className="flex items-center gap-1">
                  <FaPhoneVolume className="text-sm" />
                  <p className="text-sm">{data?.patient?.contactNumber}</p>
                </div>
                <div className="flex items-center gap-1">
                  <IoMail className="text-sm" />
                  <p className="text-sm">{data?.patient?.email}</p>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-bold">Doctor Details</h4>
                <p className="text-sm">
                  {data?.doctor?.firstName} {data?.doctor?.lastName}
                </p>
                <div className="flex items-center gap-1">
                  <FaPhoneVolume className="text-sm" />
                  <p className="text-sm">{data?.doctor?.contactNumber}</p>
                </div>
                <div className="flex items-center gap-1">
                  <IoMail className="text-sm" />
                  <p className="text-sm">{data?.doctor?.email}</p>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-bold">Payment Details</h4>
                <p className="text-sm">Payment Mode: Online Payment</p>
                <p className="text-sm">
                  Payment Status:{" "}
                  {data?.payment?.status === "PAID" ? "PAID" : "UNPAID"}
                </p>
              </div>
              <div>
                {/* <div className="flex items-center gap-1">
              <h4 className="text-sm font-bold">Invoice date:</h4>
              <p className="text-sm text-[#495057]"> 2024-11-28</p>
            </div> */}
                <div className="flex items-center gap-1">
                  <h4 className="text-sm font-bold">Appointment date:</h4>
                  <p className="text-sm text-[#495057]">
                    {data?.createdAt?.slice(0, 10)}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="text-lg font-bold text-[#495057]">
                Invoice Summary
              </h4>
              <Table
                dataSource={tableData}
                columns={columns}
                pagination={false}
                size="middle"
                rowClassName={() => "bg-white"}
              />
              <div className="w-full flex justify-end border-b border-[#f3f0f0] py-3 text-[#595959]">
                <div className="w-1/2 flex items-center justify-between">
                  <p>Sub Total</p>
                  <p>${totalAmount}</p>
                </div>
              </div>
              <div className="w-full flex justify-end mt-3">
                <div className="w-1/2 flex items-center justify-between">
                  <p className="text-lg font-semibold">Tax(5%)</p>
                  <p className="text-lg  text-[#495057]">${tax}</p>
                </div>
              </div>
              <div className="w-full flex justify-end mt-3">
                <div className="w-1/2 flex items-center justify-between">
                  <p className="text-lg font-semibold">Total</p>
                  <p className="text-lg  text-[#495057]">${totalWithTax}</p>
                </div>
              </div>
            </div>

            {/* Payment Button */}
            <div className="mt-5">
              <button
                disabled={data?.payment?.status === "PAID"}
                onClick={() => handlePayment(data?.id)}
                className={`w-1/2 text-white py-3 rounded-md text-sm font-medium ${
                  data?.payment?.status === "PAID"
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#556ee6] hover:bg-blue-700 cursor-pointer"
                }`}
              >
                Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppointmentDetails;
