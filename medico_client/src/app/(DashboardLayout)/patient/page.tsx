<<<<<<< HEAD
import React from "react";

const Patient = async () => {
  const res = await fetch(
    "https://medico-server-gray.vercel.app/api/v1/patient"
  ).then((data) => data.json());
=======
import React from 'react'
>>>>>>> 73d993fc0bd60bf5d90fabf6f9da75f216bc6cba

const PatientDashboard = () => {
  return (
    <div>PatientDashboard</div>
  )
}

export default PatientDashboard