"use client";

import Card from "@/components/Dashboard/Common/Card";
import {
  useGetAllAppointmentsQuery,
  useGetMyAppointmentsQuery,
} from "@/redux/api/appointmentApi";
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
import LatestAppointmentTable from "./components/LatestAppointmentTable";
import { useGetMyProfileQuery } from "@/redux/api/userApi";

const PatientDashboard = () => {
  const { data, isLoading: isProfileLoading } = useGetMyProfileQuery({});
  useGetAllReceptionQuery({});
  const {
    data: appointments,
    refetch,
    isLoading: isAppointmentLoading,
  } = useGetMyAppointmentsQuery({});

  if (isProfileLoading || isAppointmentLoading) {
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
              <WelcomeCardProfile data={data} />
              <MonthlyEarningGraph />
            </div>
          </Col>

          <Col span={24} md={16}>
            <div className="flex flex-col">
              <div className="flex flex-wrap sm:flex-col md:flex-row gap-8">
                <div className="flex sm:flex-col">
                  <Card
                    title="Appointments"
                    number={appointments?.meta?.total || 0}
                    icon={<FaCalendarCheck size={33} />}
                  />
                </div>
                <div className="flex sm:flex-col">
                  <DisplayItemCard />
                </div>
              </div>

              <div className="mt-10">
                <p className="text-[#343A40] font-semibold text-[16px] text-lg">
                  Latest Appointment
                </p>
                <LatestAppointmentTable
                  appointments={appointments}
                  refetch={refetch}
                />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default PatientDashboard;
