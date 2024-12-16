"use client";

import ManageAllTableTab from "./components/manageAllTableTab/page";
import Card from "@/components/Dashboard/Common/Card";
import ParsonalInfoProfile from "@/components/Dashboard/Common/parsonalInfoProfile";
import WelcomeCardProfile from "@/components/Dashboard/Common/WelcomeCardProfile";
import Meta from "@/components/Dashboard/Meta/MetaData";
import FullPageLoading from "@/components/Loader/FullPageLoader";
import { useGetAllAppointmentsQuery } from "@/redux/api/appointmentApi";
import { Row, Col } from "antd";
import { FaCalendarCheck } from "react-icons/fa";
import { FaChartColumn, FaChartSimple } from "react-icons/fa6";

const ProfileView = () => {
  const { data: AppointmentsData, isLoading } = useGetAllAppointmentsQuery({});

  if (isLoading) {
    return <FullPageLoading />;
  }
  return (
    <>
      <Meta
        title="Profile | Medico - Hospital & Clinic Management System"
        description="This is the profile page of Medico where patients can show all their information and update their information."
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
              <WelcomeCardProfile />
              <ParsonalInfoProfile />
            </div>
          </Col>
          <Col span={24} md={16}>
            <div className="flex flex-col">
              <div className="flex gap-8">
                <Card
                  title="Appointments"
                  number={AppointmentsData?.meta?.total || 0}
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
                <p className="text-[#343A40] font-semibold text-[16px] text-lg">
                  Latest Appointment
                </p>
                <ManageAllTableTab />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ProfileView;
