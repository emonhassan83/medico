"use client";

import DashbordTableTab from "@/components/Dashboard/Admin/dashbord/DashbordTableTab";
import Card from "@/components/Dashboard/Common/Card";
import DisplayItemCard from "@/components/Dashboard/Common/DisplayItemCard";
import MonthlyEarningGraph from "@/components/Dashboard/Common/MonthlyEarningGraph";
import MonthlyRegisteredUsersGraph from "@/components/Dashboard/Common/MonthlyRegisteredUserGraph";
import WelcomeCard from "@/components/Dashboard/Common/WelcomeCard";
import { useGetAllAppointmentsQuery } from "@/redux/api/appointmentApi";
import { useGetAllDoctorsQuery } from "@/redux/api/doctorApi";
import { useGetAllPatientQuery } from "@/redux/api/patientApi";
import { useGetAllReceptionQuery } from "@/redux/api/receptionistApi";
import { Row, Col } from "antd";
import { FaCalendarCheck, FaDollarSign } from "react-icons/fa";
import { HiCurrencyDollar } from "react-icons/hi2";
import { MdEventNote } from "react-icons/md";
import { GiNotebook } from "react-icons/gi";
import { GrNotes } from "react-icons/gr";
import { useGetAllMetaDataQuery } from "@/redux/api/metaApi";
import { useGetMyProfileQuery } from "@/redux/api/userApi";
import FullPageLoading from "@/components/Loader/FullPageLoader";
import Meta from "@/components/Dashboard/Meta/MetaData";

const AdminDashboard = () => {
  const { data: doctors, isLoading: isDoctorLoading } = useGetAllDoctorsQuery(
    {}
  );
  const {
    data: patients,
    refetch,
    isLoading: isPatientLoading,
  } = useGetAllPatientQuery({});
  const { data: receptionists, isLoading: isReceptionLoading } =
    useGetAllReceptionQuery({});
  const { data: AppointmentsData, isLoading: isAppointmentLoading } =
    useGetAllAppointmentsQuery({});
  const { data: getAllMetaData, isLoading: isMetaLoading } =
    useGetAllMetaDataQuery(undefined);
  const { data: getMyProfileData, isLoading: isProfileLoading } =
    useGetMyProfileQuery({});

  if (
    isDoctorLoading ||
    isPatientLoading ||
    isReceptionLoading ||
    isAppointmentLoading ||
    isMetaLoading ||
    isProfileLoading
  ) {
    return <FullPageLoading />;
  }

  return (
    <>
      <Meta
        title="Dashboard | Medico - Hospital & Clinic Management System"
        description="This is the admin dashboard of Medico where admin can manage their patient, doctor, receptionist appointments, transition, and more."
      />

      <div className="pt-2 px-[18px] mb-16">
        <div className="flex justify-between pb-6">
          <h1 className="font-semibold text-light uppercase tracking-wide">
            Dashboard
          </h1>
          <p className="text-sm font-light text-[#74788d]">
            Welcome to Dashboard
          </p>
        </div>

        <Row gutter={[32, 32]}>
          <Col span={24} md={8}>
            <div className="flex flex-col gap-7">
              <WelcomeCard
                admin={2}
                doctor={doctors?.meta?.total || 0}
                patient={getAllMetaData?.patientCount}
                receptionist={receptionists?.meta?.total || 0}
                username={`${getMyProfileData?.firstName} ${getMyProfileData?.lastName}`}
                role={getMyProfileData?.role}
              />
              <div className="">
                <MonthlyEarningGraph />
              </div>
              {/* <DisplayItemCard /> */}
            </div>
          </Col>
          <Col span={24} md={16}>
            <div className="flex flex-col ">
              {/* all cart starting here  */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 ">
                <Card
                  title="Appointments"
                  number={AppointmentsData?.meta?.total || 0}
                  icon={<FaCalendarCheck size={33} />}
                />
                <Card
                  title="Revenue"
                  number={`$${getAllMetaData?.totalRevenue?._sum.amount}`}
                  icon={<FaDollarSign size={33} />}
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
              <div className="mt-5">
                <MonthlyRegisteredUsersGraph />
              </div>
            </div>
          </Col>
        </Row>

        <div className="">
          <p className="text-[#343A40] font-[600] text-[18px] mb-7 mt-5 ">
            Latest Users
          </p>
          <DashbordTableTab
            doctors={doctors}
            receptionists={receptionists}
            patients={patients}
            refetch={refetch}
          />
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
