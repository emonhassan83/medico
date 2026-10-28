"use client";

import { useState } from "react";
import AppointmentTable from "../TableTabComponent/AppointmentTable";
import PrescriptionTable from "../TableTabComponent/PrescriptionTable";
import InvoicesTable from "../TableTabComponent/InvoiceTable";

const ManageAllTableTab = ({appointments, prescriptions}: any) => {
  const [activeTab, setActiveTab] = useState("tab2");

  const renderContent = () => {
    switch (activeTab) {
      case "tab2":
        return <AppointmentTable appointments={appointments} />;
      case "tab3":
        return <PrescriptionTable prescriptions={prescriptions}/>;
      case "tab4":
        return <InvoicesTable appointments={appointments} />;
      default:
        return <AppointmentTable appointments={appointments} />;
    }
  };

  return (
    <div className="tabs-container">
      {/* Tab Navigation */}
      <div className="tab-buttons flex justify-evenly space-x-4 mt-6 ">
        <div className="w-1/4 flex justify-center ">
          <button
            className={`tab-btn ${
              activeTab === "tab2"
                ? "active text-blue-500 border-b-[2px]  pb-3 border-blue-500 text-md"
                : ""
            } focus:text-blue-500 focus:border-b-[2px] w-full focus:pb-3 focus:border-blue-500 text-md`}
            onClick={() => setActiveTab("tab2")}
          >
            Appointment List
          </button>
        </div>

        <div className="w-1/4 flex justify-center ">
          <button
            className={`tab-btn ${
              activeTab === "tab2" ? "active" : ""
            } focus:text-blue-500 focus:border-b-[2px] w-full focus:pb-3 focus:border-blue-500 text-md`}
            onClick={() => setActiveTab("tab3")}
          >
            Prescription List
          </button>
        </div>

        <div className="w-1/4 flex justify-center ">
          <button
            className={`tab-btn ${
              activeTab === "tab2" ? "active" : ""
            } focus:text-blue-500 focus:border-b-[2px] w-full focus:pb-3 focus:border-blue-500 text-md`}
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

export default ManageAllTableTab;