"use client"
import { useState } from "react";
import  DoctorsTableTab  from "../doctorTableTab/page";






const AllTableMange = () => {
  const [activeTab, setActiveTab] = useState("tab1");

  const renderContent = () => {
    switch (activeTab) {
      case "tab1":
        return <DoctorsTableTab/>
      case "tab2":
        return <TabTwo/>
      default:
        return <DoctorsTableTab/>
    }
  };

  return (
    <div className="tabs-container">
      {/* Tab Navigation */}
      <div className="tab-buttons flex  justify-evenly space-x-4">

         <div className="w-1/2 flex justify-center "> 
        <button
          className={`tab-btn ${activeTab === "tab1" ? "active" : ""} focus:text-blue-500 focus:border-b-[2px] w-full focus:pb-3 focus:border-blue-500`}
          onClick={() => setActiveTab("tab1")}
        >
          Doctor
        </button>
        </div>
        
        <div className="w-1/2 flex justify-center "> 
        <button
          className={`tab-btn ${activeTab === "tab2" ? "active" : ""} focus:text-blue-500 focus:border-b-[2px] w-full focus:pb-3 focus:border-blue-500`}
          onClick={() => setActiveTab("tab2")}
        >
          Patient
        </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="tab-content mt-4">{renderContent()}</div>
    </div>
  );
};

// const TabOne = () => <div>Content for Tab 1</div>;
const TabTwo = () => <div>Content for Patient not avaiable </div>;

export default AllTableMange;

