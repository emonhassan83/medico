"use client";
import LatestAppointmentTable from "./dashbord-components/latestAppointmentTable/page";
import Card from "@/components/Dashboard/Common/Card";
import WelcomeCard from "@/components/Dashboard/Common/WelcomeCard";
import { useGetAllAppointmentsQuery } from "@/redux/api/appointmentApi";
import { useGetAllDoctorsQuery } from "@/redux/api/doctorApi";
import { useGetAllPatientQuery } from "@/redux/api/patientApi";
import { useGetAllReceptionQuery } from "@/redux/api/receptionistApi";
import { Row, Col } from "antd";
import { TiUserOutline } from "react-icons/ti";
import { AiFillFile } from "react-icons/ai";
import MonthlyEarningGraph from "@/components/Dashboard/Common/MonthlyEarningGraph";
import DisplayItemCard from "@/components/Dashboard/Common/DisplayItemCard";
import WelcomeCardProfile from "@/components/Dashboard/Common/WelcomeCardProfile";
import { FaCalendarCheck } from "react-icons/fa";

const PatientDashboard = () => {
  const { data: doctorsData } = useGetAllDoctorsQuery({});
  const { data: patientsData } = useGetAllPatientQuery({});
  const { data: receptionistsData } = useGetAllReceptionQuery({});
  const { data: AppointmentsData } = useGetAllAppointmentsQuery({});


  return <div className="mx-4">
    <div className="mb-6 flex justify-between items-center">
      <h2 className="text-[#343A40] font-semibold text-[16px]  uppercase">Dashboard</h2>
      <p className="text-[13px] text-[#74788D] font-normal" >Welcome to dashboard</p>
    </div>

    <Row gutter={[32, 32]}>
      <Col span={24} md={8}>
        <div className="flex flex-col gap-7">
          <WelcomeCardProfile/>
          <MonthlyEarningGraph />
        </div>
      </Col>


      <Col span={24} md={16} >

        <div className="flex flex-col" >

          <div className="flex gap-8" >
            <Card
              title="Appointments"
              number={AppointmentsData?.meta?.total || 0}
              icon={<FaCalendarCheck size={33} />}
            />
            <DisplayItemCard />
          </div>
          <div className="mt-10">
            <p className="text-[#343A40] font-semibold text-[16px] text-lg">Latest Appointment</p>
            <LatestAppointmentTable />
          </div>
        </div>
      </Col>
    </Row>
  </div>;
};

export default PatientDashboard;
