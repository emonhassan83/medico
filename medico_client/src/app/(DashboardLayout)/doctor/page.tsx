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

const DoctorDashboard = () => {
  const { data: doctorsData } = useGetAllDoctorsQuery({});
  const { data: patientsData } = useGetAllPatientQuery({});
  const { data: receptionistsData } = useGetAllReceptionQuery({});
  const { data: AppointmentsData } = useGetAllAppointmentsQuery({});


  return <div className="mt-5" >
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
        </div>
      </Col>
    </Row>

  </div>;
};

export default DoctorDashboard;
