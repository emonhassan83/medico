'use client'
import ManageAllTableTab from "./components/manageAllTableTab/page";

import Card from "@/components/Dashboard/Common/Card";
import ParsonalInfoProfile from "@/components/Dashboard/Common/parsonalInfoProfile";
import WelcomeCardProfile from "@/components/Dashboard/Common/WelcomeCardProfile";
import { useGetAllAppointmentsQuery } from "@/redux/api/appointmentApi";
import { useGetAllDoctorsQuery } from "@/redux/api/doctorApi";
import { useGetAllPatientQuery } from "@/redux/api/patientApi";
import { useGetAllReceptionQuery } from "@/redux/api/receptionistApi";
import { Row, Col } from "antd";
import { TiUserOutline } from "react-icons/ti";

const ProfileView = () => {
  const { data: doctorsData } = useGetAllDoctorsQuery({});
  const { data: patientsData } = useGetAllPatientQuery({});
  const { data: receptionistsData } = useGetAllReceptionQuery({});
  const { data: AppointmentsData } = useGetAllAppointmentsQuery({});




  return (
    <div>
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



      <div className="flex justify-between  mt-28 mx-8">
        <div className="w-1/3">
        <ParsonalInfoProfile/>
        </div>

        <div className="w-2/3">
        <ManageAllTableTab/>
        </div>

      </div>

       
    

        
    </div>

       
       {/* <div className="mt-16">
          <ManageAllTableTab/>
       </div> */}
    </div>
  )
}

export default ProfileView;