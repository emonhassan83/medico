'use client';

import Card from "@/components/Dashboard/Common/Card";
import PersonalInfoProfile from "@/components/Dashboard/Common/parsonalInfoProfile";
import WelcomeCardProfile from "@/components/Dashboard/Common/WelcomeCardProfile";
import ProfileViewTableDoctor from "@/components/Dashboard/Doctor/profileViewTable/profileViewTable";
import { useGetAllAppointmentsQuery } from "@/redux/api/appointmentApi";
import { Row, Col } from "antd";
import { FaCalendarCheck, FaDollarSign } from "react-icons/fa";
import { HiCurrencyDollar } from "react-icons/hi2";
import { MdEventNote } from "react-icons/md";
import { GiNotebook } from "react-icons/gi";
import { GrNotes } from "react-icons/gr";
import FullPageLoading from "@/components/Loader/FullPageLoader";
import { useGetMyProfileQuery } from "@/redux/api/userApi";

const ProfileView = () => {
  const { data, isLoading } = useGetMyProfileQuery({});
  const { data: AppointmentsData, isLoading: isAppointmentLoading } = useGetAllAppointmentsQuery({});

  if (isLoading || isAppointmentLoading) {
    return <FullPageLoading/>;
  }

  return (
    <div className="mx-5">
       <div className="mb-6 flex justify-between items-center">
        <h2 className="text-[#343A40] font-semibold text-[16px]  uppercase">Profile</h2>
        <p className="text-[16px] text-[#74788D] font-normal" >Dashboard / Profile</p>
      </div>
      <Row gutter={[32, 32]}>
        <Col span={24} md={8}>
          <div className="flex flex-col gap-7">
            <WelcomeCardProfile/>
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
              <Card
                title="Revenue"
                number={`$57`}
                icon={<FaDollarSign size={33} />}
              />
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

      <div className="flex justify-between  mt-28 mx-8">
        <div className="w-1/3">
        <PersonalInfoProfile data={data}/>
        </div>
        <div className="w-2/3">
        <ProfileViewTableDoctor/>
        </div>
      </div>  
    </div>
  )
}

export default ProfileView