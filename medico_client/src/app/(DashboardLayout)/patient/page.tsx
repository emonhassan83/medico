import LatestAppointmentTable from "./dashbord-components/latestAppointmentTable/page";


const PatientDashboard = () => {
  return <div>
    <p>Patient Dashboard</p>

     <div className="mt-16">
       <p className="text-black font-medium text-lg">Latest Appointment</p>
        <LatestAppointmentTable/>
     </div>

  </div>;
};

export default PatientDashboard;
