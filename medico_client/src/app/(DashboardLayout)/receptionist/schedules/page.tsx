"use client";

import { useGetAllPatientQuery } from '@/redux/api/patientApi';
import { useGetAllSchedulesQuery } from '@/redux/api/scheduleApi';
import React from 'react'

const SchedulesPage = () => {
  const {data} = useGetAllSchedulesQuery([]);
  const {data: patientData} = useGetAllPatientQuery([]);
  console.log(patientData);
  
  return (
    <div>SchedulesPage</div>
  )
}

export default SchedulesPage;