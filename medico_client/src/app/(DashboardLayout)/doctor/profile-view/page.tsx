'use client';

import Card from "@/components/Dashboard/Common/Card";
import PersonalInfoProfile from "@/components/Dashboard/Common/parsonalInfoProfile";
import WelcomeCardProfile from "@/components/Dashboard/Common/WelcomeCardProfile";
import ProfileViewTableDoctor from "@/components/Dashboard/Doctor/profileViewTable/profileViewTable";
import { useGetAllAppointmentsQuery } from "@/redux/api/appointmentApi";
import { Row, Col } from "antd";
import { FaCalendarCheck } from "react-icons/fa";
import { MdEventNote } from "react-icons/md";
import { GiNotebook } from "react-icons/gi";
import { GrNotes } from "react-icons/gr";
import FullPageLoading from "@/components/Loader/FullPageLoader";
import { useGetMyProfileQuery } from "@/redux/api/userApi";
import { useGetAllMetaDataQuery } from "@/redux/api/metaApi";
import { useGetAllPatientQuery } from "@/redux/api/patientApi";
import Meta from "@/components/Dashboard/Meta/MetaData";
import Link from "next/link";
import { BsSlash } from "react-icons/bs";

const ProfileView = () => {
  const { data, isLoading } = useGetMyProfileQuery({});
  const { data: appointments, isLoading: isAppointmentLoading } = useGetAllAppointmentsQuery({});
  const {data: patients, refetch, isLoading: isPatientLoading} = useGetAllPatientQuery([]);
  const {data: getAllMetaData, isLoading: isMetaLoading} = useGetAllMetaDataQuery({});

  if (isLoading || isAppointmentLoading || isMetaLoading || isPatientLoading) {
    return <FullPageLoading/>;
  }

  return (
    <>
    <Meta
        title="Profile | Medico - Hospital & Clinic Management System"
        description="This is the profile page of Medico where doctors can show all their information and update their information."
      />

    <div className="mx-5">
       <div className="mb-6 flex justify-between items-center">
        <h2 className="text-[#343A40] font-semibold text-[16px]  uppercase">Profile</h2>
        <div className="flex items-center gap-1 text-[#495057] text-sm">
          <Link href="/doctor" className="">
            Dashboard
          </Link>
          <BsSlash className="text-[#ccc]" />
          <Link href="#">Profile</Link>
        </div>
      </div>
      <Row gutter={[32, 32]}>
        <Col span={24} md={8}>
          <div className="flex flex-col gap-7">
            <WelcomeCardProfile data={data}/>
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
              title="Today's Appointments"
              number={getAllMetaData?.todayAppointments || 1}
              icon={<MdEventNote size={33} />}
            />
              <Card
              title="Tomorrow's Appointments"
              number={getAllMetaData?.tomorrowAppointments}
              icon={<GiNotebook size={33} />}
            />
              
              <Card
              title="Upcoming Appointments"
              number={getAllMetaData?.upcomingAppointments || 2}
              icon={<GrNotes size={33} />}
            />
            </div>
          </div>
        </Col>
      </Row>

      <div className="flex justify-between  mt-28 mx-8">
        <div className="w-1/3">
        <PersonalInfoProfile data={data}/>
        </div>
        <div className="w-2/3">
        <ProfileViewTableDoctor appointments={appointments} patients={patients} refetch={refetch} />
        </div>
      </div>  
    </div>
    </>
  )
}

export default ProfileView;