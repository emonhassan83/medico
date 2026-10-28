"use client";

import AllTableMange from "./components/AllTableMange";
import Card from "@/components/Dashboard/Common/Card";
import { useGetAllAppointmentsQuery } from "@/redux/api/appointmentApi";
import { useGetAllDoctorsQuery } from "@/redux/api/doctorApi";
import { useGetAllPatientQuery } from "@/redux/api/patientApi";
import { Row, Col } from "antd";
import WelcomeCardProfile from "@/components/Dashboard/Common/WelcomeCardProfile";
import { FaCalendarCheck, FaDollarSign } from "react-icons/fa";
import { useGetAllMetaDataQuery } from "@/redux/api/metaApi";
import { HiCurrencyDollar } from "react-icons/hi2";
import { MdEventNote } from "react-icons/md";
import { GiNotebook } from "react-icons/gi";
import { GrNotes } from "react-icons/gr";
import FullPageLoading from "@/components/Loader/FullPageLoader";
import Meta from "@/components/Dashboard/Meta/MetaData";

const ReceptionistDashboard = () => {
  const { data: doctors, isLoading: isDoctorLoading } = useGetAllDoctorsQuery(
    {}
  );
  const {
    data: patients,
    refetch,
    isLoading: isPatientLoading,
  } = useGetAllPatientQuery({});
  const { data: AppointmentsData, isLoading: isAppointmentLoading } =
    useGetAllAppointmentsQuery({});
  const { data: getAllMetaData, isLoading: isMetaLoading } =
    useGetAllMetaDataQuery({});

  if (
    isDoctorLoading ||
    isPatientLoading ||
    isAppointmentLoading ||
    isMetaLoading
  ) {
    return <FullPageLoading />;
  }

  return (
    <>
    <Meta
        title="Dashboard | Medico - Hospital & Clinic Management System"
        description="This is the receptionist dashboard of Medico where receptionists can manage their appointments, prescriptions, and more."
      />

    <div className="mx-5">
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
            {/* <DisplayItemCard /> */}
          </div>
        </Col>
        <Col span={24} md={16}>
          <div className="flex flex-col gap-y-7">
            {/* all cart starting here  */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
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
                number={getAllMetaData?.todayAppointments || 0}
                icon={<MdEventNote size={33} />}
              />
              <Card
                title="Tomorrow's Appointments"
                number={getAllMetaData?.tomorrowAppointments || 0}
                icon={<GiNotebook size={33} />}
              />
              <Card
                title="Upcoming Appointments"
                number={getAllMetaData?.upcomingAppointments || 0}
                icon={<GrNotes size={33} />}
              />
            </div>
          </div>
        </Col>
      </Row>

      {/* show Latest Users table  */}
      <div className="mt-6 mx-4">
        <p className="text-[#343A40] text-lg"> Latest Users </p>
        <AllTableMange
          doctors={doctors}
          patients={patients}
          refetch={refetch}
        />
      </div>
    </div>
    </>
  );
};

export default ReceptionistDashboard;
