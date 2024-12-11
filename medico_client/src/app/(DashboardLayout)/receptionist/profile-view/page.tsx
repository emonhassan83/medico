"use client";
import TabComponent from "./components/TabComponent/page";

import Card from "@/components/Dashboard/Common/Card";
import ParsonalInfoProfile from "@/components/Dashboard/Common/parsonalInfoProfile";
import WelcomeCard from "@/components/Dashboard/Common/WelcomeCard";
import WelcomeCardProfile from "@/components/Dashboard/Common/WelcomeCardProfile";
import FullPageLoading from "@/components/Loader/FullPageLoader";
import { useGetAllAppointmentsQuery } from "@/redux/api/appointmentApi";
import { useGetAllDoctorsQuery } from "@/redux/api/doctorApi";
import { useGetAllPatientQuery } from "@/redux/api/patientApi";
import { useGetAllReceptionQuery } from "@/redux/api/receptionistApi";
import { Row, Col } from "antd";
import { FaCalendarCheck } from "react-icons/fa";
import { FaChartColumn, FaChartSimple } from "react-icons/fa6";
import { TiUserOutline } from "react-icons/ti";

const ProfileView = () => {
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
            <ParsonalInfoProfile />
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

              <Card
                title="Pending Bills"
                number={0}
                icon={<FaChartColumn size={33} />}
              />

              <Card
                title="Total Bill"
                number={`$54,959,05`}
                icon={<FaChartSimple size={33} />}
              />
            </div>
            <div className="mt-10">
              <p className="text-[#343A40] font-semibold text-[16px] text-lg mb-2">
                Latest Appointment
              </p>
              <TabComponent />
            </div>
          </div>
        </Col>
      </Row>
    </div>

    // <div className="mx-5">
    //    <div className="mb-6 flex justify-between items-center">
    //     <h2 className="text-[#343A40] font-semibold text-[16px]  uppercase">Profile</h2>
    //     <p className="text-[16px] text-[#74788D] font-normal" >Dashboard / Profile</p>
    //   </div>
    //   <Row gutter={[32, 32]}>
    //     <Col span={24} md={8}>
    //       <div className="flex flex-col gap-7">
    //         <WelcomeCardProfile/>
    //       </div>
    //     </Col>
    //     <Col span={24} md={16}>
    //       <div className="flex flex-col gap-y-7">

    //         {/* all cart starting here  */}
    //         <div className="grid grid-cols-3 gap-7">
    //           <Card
    //             title="Appointments"
    //             number={AppointmentsData?.meta?.total || 0}
    //             icon={<TiUserOutline size={40} />}
    //           />
    //           <Card
    //             title="Revenue"
    //             number={`$57`}
    //             icon={<TiUserOutline size={40} />}
    //           />
    //           <Card
    //             title="Today' Earning"
    //             number={`$57`}
    //             icon={<TiUserOutline size={40} />}
    //           />
    //           <Card
    //             title="Today's Appointments"
    //             number={57}
    //             icon={<TiUserOutline size={40} />}
    //           />
    //           <Card
    //             title="Tomorrow's Appointments"
    //             number={57}
    //             icon={<TiUserOutline size={40} />}
    //           />
    //           <Card
    //             title="Upcoming Appointments"
    //             number={57}
    //             icon={<TiUserOutline size={40} />}
    //           />
    //         </div>

    //       </div>

    //     </Col>
    //   </Row>

    //   <div className="flex justify-between  mt-28 mx-8">
    //     <div className="w-1/3">
    //     <ParsonalInfoProfile/>
    //     </div>

    //     <div className="w-2/3">
    //     <TabComponent/>
    //     </div>

    //   </div>

    // </div>
  );
};

export default ProfileView;
