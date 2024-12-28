import DoctorTableInReceptionistTab from "./DoctorTableInReceptionist";

const DoctorsTableTab = ({doctors}: any) => {
  return (
    <div className="mx-5">
      <div>
        <DoctorTableInReceptionistTab doctors={doctors}/>
      </div>
    </div>
  );
};

export default DoctorsTableTab;
