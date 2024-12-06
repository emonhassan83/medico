"use client"
import { useState } from "react";
import PatientTable from "../Patient/PatientTable";
import DoctorsTableTab from "@/app/(DashboardLayout)/receptionist/dashbord/doctorTableTab/page";
import ReceptionistTableTab from "./ReceptionishTableTab";







const DashbordTableTab = () => {
  const [activeTab, setActiveTab] = useState("tab1");

  const renderContent = () => {
    switch (activeTab) {
      case "tab1":
        return <DoctorsTableTab/>
      case "tab2":
        return <ReceptionistTableTab />
      case "tab3":
        return <PatientTable/>
      default:
        return <DoctorsTableTab/>
    }
  };

  return (
    <div className="tabs-container">
      {/* Tab Navigation */}
      <div className="tab-buttons flex  justify-evenly space-x-4">

         <div className="w-1/4 flex justify-center  "> 
        <button
          className={`tab-btn ${activeTab === "tab1" ? "active" : ""} focus:text-blue-500 focus:border-b-[2px] w-full pb-3 focus:border-blue-500`}
          onClick={() => setActiveTab("tab1")}
        >
          Doctors
        </button>
        </div>
        
        <div className="w-1/4 flex justify-center "> 
        <button
          className={`tab-btn ${activeTab === "tab2" ? "active" : ""} focus:text-blue-500 focus:border-b-[2px] w-full pb-3 focus:border-blue-500`}
          onClick={() => setActiveTab("tab2")}
        >
          Receptionist
        </button>
        </div>

        <div className="w-1/4 flex justify-center "> 
        <button
          className={`tab-btn ${activeTab === "tab2" ? "active" : ""} focus:text-blue-500 focus:border-b-[2px] w-full pb-3 focus:border-blue-500`}
          onClick={() => setActiveTab("tab3")}
        >
          Patients
        </button>
        </div>

       

      </div>

      {/* Tab Content */}
      <div className="tab-content mt-4">{renderContent()}</div>
    </div>
  );
};

const TabOne = () => <div>Content for Medical Information </div>;
const TabTwo = () => <div>Content for Appointment List  </div>;
const TabThree = () => <div>Content for Prescription List  </div>;
const TabFour = () => <div>Content for Invoices  </div>;

export default DashbordTableTab;
