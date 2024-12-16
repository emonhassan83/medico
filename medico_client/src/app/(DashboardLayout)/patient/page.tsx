"use client";

import LatestAppointmentTable from "./dashbord-components/latestAppointmentTable/page";
import Card from "@/components/Dashboard/Common/Card";
import { useGetAllAppointmentsQuery } from "@/redux/api/appointmentApi";
import { useGetAllDoctorsQuery } from "@/redux/api/doctorApi";
import { useGetAllPatientQuery } from "@/redux/api/patientApi";
import { useGetAllReceptionQuery } from "@/redux/api/receptionistApi";
import { Row, Col } from "antd";
import MonthlyEarningGraph from "@/components/Dashboard/Common/MonthlyEarningGraph";
import DisplayItemCard from "@/components/Dashboard/Common/DisplayItemCard";
import WelcomeCardProfile from "@/components/Dashboard/Common/WelcomeCardProfile";
import { FaCalendarCheck } from "react-icons/fa";
import FullPageLoading from "@/components/Loader/FullPageLoader";
import Meta from "@/components/Dashboard/Meta/MetaData";

const PatientDashboard = () => {
  const { data: doctorsData, isLoading: isDoctorLoading } =
    useGetAllDoctorsQuery({});
  const { data: patientsData, isLoading: isPatientLoading } =
    useGetAllPatientQuery({});
  const { data: receptionistsData, isLoading: isReceptionistLoading } =
    useGetAllReceptionQuery({});
  const { data: AppointmentsData, isLoading: isAppointmentLoading } =
    useGetAllAppointmentsQuery({});

  if (
    isDoctorLoading ||
    isPatientLoading ||
    isReceptionistLoading ||
    isAppointmentLoading
  ) {
    return <FullPageLoading />;
  }

  return (
    <>
      <Meta
        title="Dashboard | Medico - Hospital & Clinic Management System"
        description="This is the patient dashboard of Medico where patients can manage their appointments, prescriptions, and more."
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
              <MonthlyEarningGraph />
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
                <DisplayItemCard />
              </div>
              <div className="mt-10">
                <p className="text-[#343A40] font-semibold text-[16px] text-lg">
                  Latest Appointment
                </p>
                <LatestAppointmentTable />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default PatientDashboard;
