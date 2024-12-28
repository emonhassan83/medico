"use client";

import { useState } from "react";
import ReceptionistTableTab from "./ReceptionishTableTab";
import PatientTableAdmin from "./PatientTableAdmin";
import DoctorTableInReceptionistTab from "@/app/(DashboardLayout)/receptionist/components/DoctorTableInReceptionist";

const DashbordTableTab = ({doctors, receptionists, patients, refetch}: any) => {
  const [activeTab, setActiveTab] = useState("tab1");

  const renderContent = () => {
    switch (activeTab) {
      case "tab1":
        return <DoctorTableInReceptionistTab  doctors={doctors}/>;
      case "tab2":
        return <ReceptionistTableTab receptionists={receptionists} />;
      case "tab3":
        return <PatientTableAdmin patients={patients} refetch={refetch} />;
      default:
        return <DoctorTableInReceptionistTab doctors={doctors} />;
    }
  };

  return (
    <div className="tabs-container">
      {/* Tab Navigation */}
      <div className="tab-buttons flex  justify-evenly space-x-4">
        <div className="w-1/4 flex justify-center  ">
          <button
            className={`tab-btn ${
              activeTab === "tab1"
                ? "active text-blue-500 border-b-[2px] pb-3 border-blue-500"
                : ""
            } focus:text-blue-500 focus:border-b-[2px] w-full pb-3 focus:border-blue-500`}
            onClick={() => setActiveTab("tab1")}
          >
            Doctors
          </button>
        </div>

        <div className="w-1/4 flex justify-center ">
          <button
            className={`tab-btn ${
              activeTab === "tab2" ? "active" : ""
            } focus:text-blue-500 focus:border-b-[2px] w-full pb-3 focus:border-blue-500`}
            onClick={() => setActiveTab("tab2")}
          >
            Receptionist
          </button>
        </div>

        <div className="w-1/4 flex justify-center ">
          <button
            className={`tab-btn ${
              activeTab === "tab2" ? "active" : ""
            } focus:text-blue-500 focus:border-b-[2px] w-full pb-3 focus:border-blue-500`}
            onClick={() => setActiveTab("tab3")}
          >
            Patients
          </button>
        </div>
      </div>

      <div className="tab-content mt-4">{renderContent()}</div>
    </div>
  );
};

export default DashbordTableTab;
