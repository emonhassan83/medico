"use client";
import {
  useCreateAppointmentMutation,
  useGetAllAppointmentsQuery,
} from "@/redux/api/appointmentApi";
import React, { useState } from "react";

const CreateAppointmentForm = () => {
  const [createAppointment] = useCreateAppointmentMutation();
  const { data } = useGetAllAppointmentsQuery({});
  console.log(data);
  console.log(data?.appointments);
  // console.log(createAppointment);
  const [formData, setFormData] = useState({
    doctor: "",
    date: "",
    time: "",
    slot: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  // try {
  //   const response = await fetch(
  //     "http://localhost:5000/api/v1/appointment",
  //     {
  //       // Replace with your API URL
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(patient),
  //     }
  //   );

  //   const data = await response.json();
  //   console.log("Patient data submitted successfully:", data);
  //   // Reset the form after successful register
  //   setFormData({
  //     firstName: "",
  //     lastname: "",
  //     contactNo: "",
  //     email: "",
  //     password: "",
  //     confirmPassword: "",
  //   });
  // } catch (error) {
  //   console.error("Error submitting patient data:", error);
  // }
  //   };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Doctor Selection */}
        <div className="mt-5">
          <label
            htmlFor="doctor"
            className="block text-sm font-medium text-gray-700 mb-3"
          >
            Doctor <span className="text-red-500">*</span>
          </label>
          <select
            id="doctor"
            name="doctor"
            className="mt-1 block w-full h-[40px] text-[#495057] rounded-sm border border-gray-300  outline-none"
            value={formData.doctor}
            onChange={handleInputChange}
            required
          >
            <option value="">Select</option>
            <option value="Dr. Smith">Dr. Smith</option>
            <option value="Dr. Johnson">Dr. Johnson</option>
          </select>
        </div>

        {/* Date Picker */}
        <div className="mt-5">
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700 mb-3"
          >
            Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="date"
            name="date"
            className="mt-1 block w-full text-[#495057] h-[40px] rounded-sm border border-gray-300 outline-none"
            value={formData.date}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Available Time */}
        <div className="mt-5">
          <label
            htmlFor="time"
            className="block text-sm font-medium text-[#495057] mb-3"
          >
            Available Time <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="time"
            name="time"
            className="mt-1 block w-full h-[40px] outline-none"
            value={formData.time}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Available Slot */}
        <div className="">
          <label
            htmlFor="slot"
            className="block text-sm font-medium text-gray-700 mb-3"
          >
            Available Slot <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="slot"
            name="slot"
            className="mt-1 block w-full h-[40px] outline-none"
            value={formData.slot}
            onChange={handleInputChange}
            // placeholder="Enter available slot"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-[180px] bg-[#556ee6] text-white py-2 px-2 rounded hover:bg-blue-700 text-sm"
        >
          Create Appointment
        </button>
      </form>
    </div>
  );
};

export default CreateAppointmentForm;
