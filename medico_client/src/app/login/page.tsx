'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";


const Login = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // console.log({name})
    console.log({value})
    setFormData({ ...formData, [name]: value });
  };




  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login data:", formData);
    // Add login logic here
    router.push("/")
  };


  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-lg rounded-lg bg-white p-8">

        <div className="bg-[#D4DBF9] pt-7 pb-10 pl-4 mb-10 rounded">
          <h5 className="text-[#485EC4] font-medium text-lg">Welcome Back !</h5>
          <p className="text-[#485EC4] text-sm">Sign in to continue to Doctorly.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
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
          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full rounded-md bg-[#485EC4] px-4 py-2 text-white  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Login
            </button>
          </div>
        </form>
        <p className="text-sm mt-2 text-center text-gray-600"> Forgot your password?</p>

        <div className="flex justify-between items-center mt-10" >
          <div>
          <h3 className="text-md text-gray-500">Admin:</h3>
          <p className="text-sm text-gray-600">email - admin@themesbrand.website</p>
          <p className="text-sm text-gray-600">Pass - admin@123456</p>
          </div>
          <div>
            <button type="button" className="text-white bg-[#485EC4] rounded px-2 py-1">Login</button>
          </div>
        </div>


        <div className="flex justify-between items-center mt-1" >
          <div>
          <h3 className="text-md text-gray-600">doctor:</h3>
          <p className="text-sm text-gray-600">email - doctor@themesbrand.website</p>
          <p className="text-sm text-gray-600">Pass - doctor@123456</p>
          </div>
          <div>
            <button type="button" className="text-white bg-[#485EC4] rounded px-2 py-1">Login</button>
          </div>
        </div>

        <div className="flex justify-between items-center mt-1" >
          <div>
          <h3 className="text-md text-gray-500">Accountant:</h3>
          <p className="text-sm text-gray-600">email - accountant@themesbrand.website</p>
          <p className="text-sm text-gray-600">Pass - accountant@123456</p>
          </div>
          <div>
            <button type="button" className="text-white bg-[#485EC4] rounded px-2 py-1">Login</button>
          </div>
        </div>

        
        <p className="text-sm mt-8 text-center text-gray-600"> Dont have an account ? <Link className="text-[#485EC4]" href='/register'>Sign Up here</Link> </p>

        <p className="text-sm mt-2 text-center text-gray-600">© 2024 Doctorly. Crafted with  by Themesbrand </p>

      </div>
    </div>
  );
};

export default Login;
