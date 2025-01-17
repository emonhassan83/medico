'use client';

import { Result, Button } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import Meta from "@/components/Dashboard/Meta/MetaData";

interface PaymentPageProps {
  searchParams: { status: string };
}

const PaymentPage = ({ searchParams }: PaymentPageProps) => {
  const status = searchParams?.status || "";

  return (
    <>
    <Meta
        title="Patient Payment | Medico - Hospital & Clinic Management System"
        description="This is the patient payment page of Medico where patient can pay their pending payment then show this page, and more."
      />

    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          padding: "30px",
          background: "white",
          borderRadius: "8px",
          textAlign: "center",
          maxWidth: "500px",
          width: "100%",
        }}
      >
        {status === "success" && (
          <Result
            icon={<CheckCircleOutlined style={{ color: "#52c41a", fontSize: "50px" }} />}
            title="Payment Successful!"
            subTitle="Thank you for your purchase. Your transaction has been successfully completed."
            extra={[
              <Button type="primary" href="/patient" key="dashboard">
                Go to Dashboard
              </Button>,
              <Button type="default" href="/patient/invoices" key="home">
                Back to Appointment
              </Button>,
            ]}
          />
        )}
        
        {status === "fail" && (
          <Result
            icon={<CloseCircleOutlined style={{ color: "#ff4d4f", fontSize: "50px" }} />}
            title="Payment Failed"
            subTitle="We couldn't complete your transaction. Please try again or contact support."
            extra={[
                <Button type="primary" href="/patient" key="dashboard">
                Go to Dashboard
              </Button>,
              <Button type="default" href="/patient/invoices" key="home">
                Back to Appointment
              </Button>,
            ]}
          />
        )}
        {status === "cancel" && (
          <Result
            icon={<ExclamationCircleOutlined style={{ color: "#faad14", fontSize: "50px" }} />}
            title="Payment Canceled"
            subTitle="You have canceled the payment. You can try again anytime."
            extra={[
                <Button type="primary" href="/patient" key="dashboard">
                Go to Dashboard
              </Button>,
              <Button type="default" href="/patient/invoices" key="home">
                Back to Appointment
              </Button>,
            ]}
          />
        )}
      </div>
    </div>
    </>
  );
};

export default PaymentPage;
