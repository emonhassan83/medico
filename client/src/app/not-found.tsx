"use client";

import { getUserInfo } from "@/services/auth.services";
import Link from "next/link";
import { useEffect, useState } from "react";

const NotFoundPage = () => {
    const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const { role } = getUserInfo() as any;
    setUserRole(role);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen text-center bg-gradient-to-br from-gray-100 to-gray-200 p-4">
      {/* Title */}
      <h1 className="font-bold text-primary text-6xl sm:text-7xl md:text-8xl mb-4 mt-8">
        404
      </h1>
      <h2 className="font-semibold text-gray-800 text-2xl sm:text-3xl md:text-4xl mb-4">
        Oops! Page Not Found
      </h2>
      <p className="text-gray-600 mb-6 text-base sm:text-lg">
        It looks like the page you&apos;re trying to reach doesn&apos;t exist. Perhaps it
        was moved or deleted, or maybe you mistyped the URL.
      </p>
      
      {/* Card */}
      <div className="bg-gray-100 shadow-lg rounded-lg max-w-lg w-full mx-auto p-6 mt-6 text-center">
        <p className="text-gray-700 text-lg mb-4">
          Still need help? Contact our support team or visit our FAQ page.
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="/support" passHref>
            <button className="bg-primary text-white px-6 py-2 rounded-full text-lg bg-blue-700">
              Contact Support
            </button>
          </Link>
        <Link href={`/${userRole}`} passHref>
            <button className="border border-primary text-primary px-6 py-2 rounded-full text-lg hover:bg-blue-50">
              Back to Dashboard
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
