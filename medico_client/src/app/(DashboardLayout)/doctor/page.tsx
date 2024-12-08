"use client";
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
import LatestAppointmentTable from "../patient/dashbord-components/latestAppointmentTable/page";

import { FaCalendarCheck, FaDollarSign } from "react-icons/fa";
import { HiCurrencyDollar } from "react-icons/hi2";
import { MdEventNote } from "react-icons/md";
import { GiNotebook } from "react-icons/gi";
import { GrNotes } from "react-icons/gr";


const DoctorDashboard = () => {
  const { data: doctorsData } = useGetAllDoctorsQuery({});
  const { data: patientsData } = useGetAllPatientQuery({});
  const { data: receptionistsData } = useGetAllReceptionQuery({});
  const { data: AppointmentsData } = useGetAllAppointmentsQuery({});


  return <div className="mx-4" >
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-[#343A40] font-semibold text-[16px]  uppercase">Dashboard</h2>
          <p className="text-[13px] text-[#74788D] font-normal" >Welcome to dashboard</p>
        </div>

    <Row gutter={[32, 32]}>
      <Col span={24} md={8}>
        <div className="flex flex-col gap-7">
          <WelcomeCard
            admin={2}
            doctor={doctorsData?.meta?.total || 0}
            patient={patientsData?.meta?.total || 0}
            receptionist={receptionistsData?.meta?.total || 0}
            username="Alice"
            role="Super Admin"
          />

        </div>
      </Col>
      <Col span={24} md={16}>
        <div className="flex flex-col gap-y-7">

          {/* all cart starting here  */}
          <div className="grid grid-cols-3 gap-7">
            <Card
              title="Appointments"
              number={AppointmentsData?.meta?.total || 0}
              icon={<FaCalendarCheck size={33} />}
            />
            {/* <Card
              title="Revenue"
              number={`$57`}
              icon={<TiUserOutline size={40} />}
            /> */}
            <Card
              title="Today' Earning"
              number={`$57`}
              icon={<HiCurrencyDollar size={33} />}
            />
            <Card
              title="Today's Appointments"
              number={57}
              icon={<MdEventNote size={33} />}
            />
            <Card
              title="Tomorrow's Appointments"
              number={57}
              icon={<GiNotebook size={33} />}
            />
            <Card
              title="Upcoming Appointments"
              number={57}
              icon={<GrNotes size={33} />}
            />
            
          </div>
        </div>
      </Col>
    </Row>

    {/* secound row this line  */}
    <div className="flex justify-between ">
       <div className="w-1/3 px-4 mt-14">
       <MonthlyEarningGraph/>
       <DisplayItemCard/>
       </div>

       <div className="w-2/3 mt-16 px-10">
          <p className="text-[#343A40] font-semibold text-[16px] text-lg">Latest Appointment</p>
          <LatestAppointmentTable/>
       </div>
    </div>
     
  </div>;
};

export default DoctorDashboard;
