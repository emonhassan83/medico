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
import { TiUserOutline } from "react-icons/ti";

import { FaCalendarCheck, FaDollarSign } from "react-icons/fa";
import { HiCurrencyDollar } from "react-icons/hi2";
import { MdEventNote } from "react-icons/md";
import { GiNotebook } from "react-icons/gi";
import { GrNotes } from "react-icons/gr";
import { useGetAllMetaDataQuery } from "@/redux/api/metaApi";
import { useGetMyProfileQuery } from "@/redux/api/userApi";


const AdminDashboard = () => {
  const { data: doctorsData } = useGetAllDoctorsQuery({});
  const { data: patientsData } = useGetAllPatientQuery({});
  const { data: receptionistsData } = useGetAllReceptionQuery({});
  const { data: AppointmentsData } = useGetAllAppointmentsQuery({});

  const {data:getAllMetaData} = useGetAllMetaDataQuery(undefined)
  const {data:getMyProfileData} = useGetMyProfileQuery(undefined)
  



  console.log('getAllMetaData', getAllMetaData)
  // console.log('total revenue', getAllMetaData?.totalRevenue?._sum.amount)

  return (
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
              doctor={doctorsData?.meta?.total || 0}
              patient={getAllMetaData?.patientCount}
              receptionist={receptionistsData?.meta?.total || 0}
              username={`${getMyProfileData?.firstName} ${getMyProfileData?.lastName}`}
              role={getMyProfileData?.role}
            />
            <MonthlyEarningGraph />
            <DisplayItemCard />
          </div>
        </Col>
        <Col span={24} md={16}>
          <div className="flex flex-col ">
 
            {/* all cart starting here  */}
            <div className="grid grid-cols-3 gap-0 ">
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
            <MonthlyRegisteredUsersGraph />
          </div>
        </Col>
      </Row>


      


      <div>
        <p className="text-[#343A40] font-[600] text-[18px] mb-7 mt-5 ">Latest Users</p>
      <DashbordTableTab/>
      </div>
    </div>
  );
};

export default AdminDashboard;
