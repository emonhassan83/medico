"use client"
import { useState } from "react";
import AppointmentTable from "../appointmentTable/page";
import PrescriptionListInDoctor from "@/app/(DashboardLayout)/doctor/prescription/page";
import PrescriptionTableInDoctor from "@/components/Dashboard/Doctor/Prescription/PrescriptionTableInDoctor";







const ManageAllTableTab = () => {
  const [activeTab, setActiveTab] = useState("tab2");

  const renderContent = () => {
    switch (activeTab) {
      // case "tab1":
      //   return <TabOne/>
      case "tab2":
        return <AppointmentTable/>
      case "tab3":
        return <PrescriptionTableInDoctor/>
      case "tab4":
        return <TabFour/>
      default:
        return <AppointmentTable/>
    }
  };

  return (
    <div className="tabs-container">
      {/* Tab Navigation */}
      <div className="tab-buttons flex justify-evenly space-x-4 mt-6 ">

        
        <div className="w-1/4 flex justify-center "> 
        <button
          className={`tab-btn ${activeTab === "tab2" ? "active text-blue-500 border-b-[2px]  pb-3 border-blue-500 text-md" : ""} focus:text-blue-500 focus:border-b-[2px] w-full focus:pb-3 focus:border-blue-500 text-md`}
          onClick={() => setActiveTab("tab2")}
        >
          Appointment List
        </button>
        </div>

        <div className="w-1/4 flex justify-center "> 
        <button
          className={`tab-btn ${activeTab === "tab2" ? "active" : ""} focus:text-blue-500 focus:border-b-[2px] w-full focus:pb-3 focus:border-blue-500 text-md`}
          onClick={() => setActiveTab("tab3")}
        >
          Prescription List
        </button>
        </div>

        <div className="w-1/4 flex justify-center "> 
        <button
          className={`tab-btn ${activeTab === "tab2" ? "active" : ""} focus:text-blue-500 focus:border-b-[2px] w-full focus:pb-3 focus:border-blue-500 text-md`}
          onClick={() => setActiveTab("tab4")}
        >
          Invoices
        </button>
        </div>

      </div>

      {/* Tab Content */}
      <div className="tab-content mt-4">{renderContent()}</div>
    </div>
  );
};

const TabOne = () => <div>Content for Medical Information </div>;
// const TabTwo = () => <div>Content for Appointment List  </div>;
const TabThree = () => <div>Content for Prescription List  </div>;
const TabFour = () => <div>Content for Invoices  </div>;

export default ManageAllTableTab;

