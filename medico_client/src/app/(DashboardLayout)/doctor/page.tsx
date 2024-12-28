"use client";

import Card from "@/components/Dashboard/Common/Card";
import { useGetAllAppointmentsQuery } from "@/redux/api/appointmentApi";
import { Row, Col } from "antd";
import MonthlyEarningGraph from "@/components/Dashboard/Common/MonthlyEarningGraph";
import DisplayItemCard from "@/components/Dashboard/Common/DisplayItemCard";
import { FaCalendarCheck } from "react-icons/fa";
import { HiCurrencyDollar } from "react-icons/hi2";
import { MdEventNote } from "react-icons/md";
import { GiNotebook } from "react-icons/gi";
import { GrNotes } from "react-icons/gr";
import FullPageLoading from "@/components/Loader/FullPageLoader";
import WelcomeCardProfile from "@/components/Dashboard/Common/WelcomeCardProfile";
import { useGetAllMetaDataQuery } from "@/redux/api/metaApi";
import LatestAppointmentTable from "../patient/components/LatestAppointmentTable";
import { useGetMyProfileQuery } from "@/redux/api/userApi";

const DoctorDashboard = () => {
  const { data, isLoading: isProfileLoading } = useGetMyProfileQuery({});
  const { data: appointments, refetch, isLoading: isAppointmentLoading } =
    useGetAllAppointmentsQuery({});

  const { data: getAllMetaData, isLoading: isMetaLoading } =
    useGetAllMetaDataQuery(undefined);

  if (isAppointmentLoading || isProfileLoading) {
    return <FullPageLoading />;
  }

  return (
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
          </div>
        </Col>
        <Col span={24} md={16}>
          <div className="flex flex-col gap-y-7">
            {/* all cart starting here  */}
            <div className="grid grid-cols-3 gap-7">
              <Card
                title="Appointments"
                number={appointments?.meta?.total || 0}
                icon={<FaCalendarCheck size={33} />}
              />
              <Card
                title="Today' Earning"
                number={`$57`}
                icon={<HiCurrencyDollar size={33} />}
              />
              <Card
                title="Today's Appointments"
                number={getAllMetaData?.todayAppointments}
                icon={<MdEventNote size={33} />}
              />
              <Card
                title="Tomorrow's Appointments"
                number={getAllMetaData?.tomorrowAppointments}
                icon={<GiNotebook size={33} />}
              />
              <Card
                title="Upcoming Appointments"
                number={getAllMetaData?.upcomingAppointments}
                icon={<GrNotes size={33} />}
              />
            </div>
          </div>
        </Col>
      </Row>

      {/* secound row this line  */}
      <div className="flex justify-between ">
        <div className="w-1/3 px-4 mt-14">
          <MonthlyEarningGraph />
          <DisplayItemCard />
        </div>

        <div className="w-2/3 mt-16 px-10">
          <p className="text-[#343A40] font-semibold text-[16px] text-lg">
            Latest Appointment
          </p>
          <LatestAppointmentTable appointments={appointments} refetch={refetch} />
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
