'use client'
import Link from "next/link"
import React, { useState } from "react"


const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastname: '',
    contactNo: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }




  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log(formData)

    const patient = {
      password: formData.password,
      patient: {
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastname,
          contactNumber: formData.contactNo,
          // address: formData.contactNo, // Confirm if the duplication is intentional
          // profilePhoto: "http://ash.org/"
      }
  };

  try {
      const response = await fetch('http://localhost:5000/api/v1/user/create-patient', { // Replace with your API URL
          method: 'POST',
          headers: {
              'Content-Type': 'application/json', 
          },
          body: JSON.stringify(patient), 
      });

      

      const data = await response.json(); 
      console.log('Patient data submitted successfully:', data);
      // Reset the form after successful register 
      setFormData({
        firstName: '',
        lastname: '',
        contactNo: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
  } catch (error) {
      console.error('Error submitting patient data:', error);
  }
};

  

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-lg rounded-lg bg-white p-8">

        <div className="bg-[#D4DBF9] pt-7 pb-10 pl-4 mb-10 rounded">
          <h5 className="text-[#485EC4] font-medium text-lg">Welcome Back !</h5>
          <p className="text-[#485EC4] text-sm">Sign up to continue to Doctorly.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* First Name Field */}
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="mt-1 w-full rounded-md outline-none border-gray-300 border p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Last Name  Field */}
          <div>
            <label
              htmlFor="lastname"
              className="block text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={formData.lastname}
              onChange={handleInputChange}
              className="mt-1 w-full rounded-md outline-none border-gray-300 border p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>


          {/* Contact No Field */}
          <div>
            <label
              htmlFor="contactNo"
              className="block text-sm font-medium text-gray-700"
            >
             Contact No
            </label>
            <input
              type="text"
              id="contactNo"
              name="contactNo"
              value={formData.contactNo}
              onChange={handleInputChange}
              className="mt-1 w-full rounded-md outline-none border-gray-300 border p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter your contactno"
              required
            />
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 w-full rounded-md outline-none border-gray-300 border p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="mt-1 w-full rounded-md outline-none border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Confirm Password Field */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="mt-1 w-full rounded-md outline-none border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full rounded-md bg-[#485EC4] px-4 py-2 text-white  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Register
            </button>
          </div>
        </form>
        <p className="text-sm mt-4 text-center text-gray-600">By registering you agree to the Doctorly <span className="text-[#485EC4]"> Terms of Use</span> </p>


           <div className="mt-10">
            <p className="text-sm mt-4 text-center text-gray-600">Already have an account ?<span className="text-[#485EC4]"> <Link href='/login' >Login</Link> </span> </p>

            <p className="text-sm mt-2 text-center text-gray-600">© 2024 Doctorly. Crafted with  by Themesbrand </p>
           </div>

      </div>
    </div>
  )
}

export default RegisterForm