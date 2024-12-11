"use client"
import { useState } from "react";
import TabOne from "../TabOne/page";



const TabComponent = () => {
  const [activeTab, setActiveTab] = useState("tab1");

  const renderContent = () => {
    switch (activeTab) {
      case "tab1":
        return <TabOne />;
      case "tab2":
        return <TabTwo />;
      default:
        return <TabOne />;
    }
  };

  return (
    <div className="tabs-container">
      {/* Tab Navigation */}
      <div className="tab-buttons flex  justify-evenly space-x-4 text-md">

         <div className="w-1/2 flex justify-center "> 
        <button
          className={`tab-btn ${activeTab === "tab1" ? "active text-blue-500 border-b-[2px] pb-3 border-blue-500 text-md" : ""} focus:text-blue-500 focus:border-b-[2px] w-full focus:pb-3 focus:border-blue-500 text-md`}
          onClick={() => setActiveTab("tab1")}
        >
          Appointment List
        </button>
        </div>
        
        <div className="w-1/2 flex justify-center "> 
        <button
          className={`tab-btn ${activeTab === "tab2" ? "active" : ""} focus:text-blue-500 focus:border-b-[2px] w-full focus:pb-3 focus:border-blue-500 text-md`}
          onClick={() => setActiveTab("tab2")}
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

// const TabOne = () => <div>Content for Tab 1</div>;
const TabTwo = () => <div>Content for Invoices not avaiable </div>;

export default TabComponent;
