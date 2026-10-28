"use client";

import TabComponent from "./components/TabComponent";
import Card from "@/components/Dashboard/Common/Card";
import ParsonalInfoProfile from "@/components/Dashboard/Common/parsonalInfoProfile";
import WelcomeCardProfile from "@/components/Dashboard/Common/WelcomeCardProfile";
import FullPageLoading from "@/components/Loader/FullPageLoader";
import { useGetAllAppointmentsQuery } from "@/redux/api/appointmentApi";
import { Row, Col } from "antd";
import { FaCalendarCheck } from "react-icons/fa";
import { FaChartColumn, FaChartSimple } from "react-icons/fa6";
import { useGetMyProfileQuery } from "@/redux/api/userApi";
import Meta from "@/components/Dashboard/Meta/MetaData";

const ProfileView = () => {
  const { data: appointments, isLoading: isAppointmentLoading } =
    useGetAllAppointmentsQuery({});
  const { data, isLoading: isProfileLoading } = useGetMyProfileQuery({});

  if (isAppointmentLoading || isProfileLoading) {
    return <FullPageLoading />;
  }

  return (
    <>
    <Meta
        title="Profile | Medico - Hospital & Clinic Management System"
        description="This is the profile page of Medico where receptionist can show all their information and update their information."
      />
    <div className="mx-4">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-[#343A40] font-semibold text-[16px]  uppercase">
          Dashboard
        </h2>
        <p className="text-[13px] text-[#74788D] font-normal">
          Welcome to dashboard
        </p>
      </div>

      <Row gutter={[32, 32]}>
        <Col span={24} md={8}>
          <div className="flex flex-col gap-7">
            <WelcomeCardProfile data={data} />
            <ParsonalInfoProfile data={data} />
          </div>
        </Col>

        <Col span={24} md={16}>
          <div className="flex flex-col">
            <div className="flex gap-8">
              <Card
                title="Appointments"
                number={appointments?.meta?.total || 0}
                icon={<FaCalendarCheck size={33} />}
              />

              <Card
                title="Pending Bills"
                number={0}
                icon={<FaChartColumn size={33} />}
              />

              <Card
                title="Total Bill"
                number={`$54,959,05`}
                icon={<FaChartSimple size={33} />}
              />
            </div>
            <div className="mt-10">
              <p className="text-[#343A40] font-semibold text-[16px] text-lg mb-2">
                Latest Appointment
              </p>
              <TabComponent appointments={appointments} />
            </div>
          </div>
        </Col>
      </Row>
    </div>
    </>
  );
};

export default ProfileView;
