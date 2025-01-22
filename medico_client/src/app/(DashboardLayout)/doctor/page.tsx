"use client";

import Card from "@/components/Dashboard/Common/Card";
import { useGetAllAppointmentsQuery } from "@/redux/api/appointmentApi";
import { Row, Col } from "antd";
import MonthlyEarningGraph from "@/components/Dashboard/Common/MonthlyEarningGraph";
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
import Meta from "@/components/Dashboard/Meta/MetaData";

const DoctorDashboard = () => {
  const { data, isLoading: isProfileLoading } = useGetMyProfileQuery({});
  const {
    data: appointments,
    refetch,
    isLoading: isAppointmentLoading,
  } = useGetAllAppointmentsQuery({});

  const { data: getAllMetaData, isLoading: isMetaLoading } =
    useGetAllMetaDataQuery(undefined);

  if (isAppointmentLoading || isProfileLoading || isMetaLoading) {
    return <FullPageLoading />;
  }

  return (
    <>
    <Meta
        title="Dashboard | Medico - Hospital & Clinic Management System"
        description="This is the doctor dashboard of Medico where doctors can manage their appointments, prescriptions, and more."
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
          </div>
        </Col>
        <Col span={24} md={16}>
          <div className="flex flex-col gap-y-7">
            {/* all cart starting here  */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
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

      {/* second row this line  */}
      <div className="md:flex justify-between ">
        <div className="md:w-1/3 px-4 mt-5 md:mt-14">
          <div className="mb-5">
            <MonthlyEarningGraph />
          </div>
          {/* <div>
            <DisplayItemCard />
          </div> */}
        </div>

        <div className="md:w-2/3 mt-5 md:mt-16 px-4 md:px-10">
          <p className="text-[#343A40] font-semibold text-[16px] text-lg">
            Latest Appointment
          </p>
          <LatestAppointmentTable
            appointments={appointments}
            refetch={refetch}
          />
        </div>
      </div>
    </div>
    </>
  );
};

export default DoctorDashboard;
