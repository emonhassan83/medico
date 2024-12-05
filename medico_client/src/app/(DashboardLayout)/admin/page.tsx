"use client";

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

const AdminDashboard = () => {
  const { data: doctorsData } = useGetAllDoctorsQuery({});
  const { data: patientsData } = useGetAllPatientQuery({});
  const { data: receptionistsData } = useGetAllReceptionQuery({});
  const { data: AppointmentsData } = useGetAllAppointmentsQuery({});

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
              patient={patientsData?.meta?.total || 0}
              receptionist={receptionistsData?.meta?.total || 0}
              username="Alice"
              role="Super Admin"
            />
            <MonthlyEarningGraph />
            <DisplayItemCard />
          </div>
        </Col>
        <Col span={24} md={16}>
          <div className="flex flex-col gap-y-7">
            <div className="grid grid-cols-3 gap-7">
              <Card
                title="Appointments"
                number={AppointmentsData?.meta?.total || 0}
                icon={<TiUserOutline size={40} />}
              />
              <Card
                title="Revenue"
                number={`$57`}
                icon={<TiUserOutline size={40} />}
              />
              <Card
                title="Today' Earning"
                number={`$57`}
                icon={<TiUserOutline size={40} />}
              />
              <Card
                title="Today's Appointments"
                number={57}
                icon={<TiUserOutline size={40} />}
              />
              <Card
                title="Tomorrow's Appointments"
                number={57}
                icon={<TiUserOutline size={40} />}
              />
              <Card
                title="Upcoming Appointments"
                number={57}
                icon={<TiUserOutline size={40} />}
              />
            </div>
            <MonthlyRegisteredUsersGraph />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;
