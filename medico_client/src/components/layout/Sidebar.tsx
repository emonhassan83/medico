"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Home from "../svg/Home";
import Doctor from "../svg/Doctor";
import Patient from "../svg/Patient";
import Receptionist from "../svg/Receptionist";
import Specialties from "../svg/Specialties";
import AppointmentList from "../svg/AppointmentList";
import Appointments from "../svg/Appointments";
import Prescription from "../svg/Prescription";
import { getUserInfo } from "@/services/auth.services";
import { TbFileInvoice } from "react-icons/tb";
import { PiInvoiceBold } from "react-icons/pi";
import { useGetMyProfileQuery } from "@/redux/api/userApi";

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-lg p-3 transition-colors hover:text-white text-sm duration-300 ${
        isActive
          ? "bg-[#5d7e7d] text-white hover:bg-[#5d7e7d]"
          : "text-[#a6b0cf] hover:bg-[#5d7e7d]/50"
      }`}
      aria-current={isActive ? "page" : undefined}
    >
      {children}
    </Link>
  );
};

const CollapsibleMenu = ({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-3 rounded-lg p-3 cursor-pointer transition-colors ${
          isOpen ? "text-white" : "text-[#a6b0cf]"
        }`}
      >
        <div className="flex items-center">{icon}</div>
        <div className="flex w-full flex-1 truncate text-sm">{title}</div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className={`size-4 transition-transform duration-500 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          <path
            fillRule="evenodd"
            d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div
        className={`grid overflow-hidden transition-all duration-500 ${
          isOpen ? "grid-rows-[1fr] mt-2" : "grid-rows-[0fr] mt-0"
        }`}
      >
        <ul className="flex flex-col ml-1 overflow-hidden pl-3 space-y-1">
          {children}
        </ul>
      </div>
    </li>
  );
};

export default function SideBar() {
  const [isSideNavOpen, setIsSideNavOpen] = useState(true);
  const [userRole, setUserRole] = useState("");
  const { data } = useGetMyProfileQuery(undefined);
  // console.log('user:', data)

  useEffect(() => {
    const { role } = getUserInfo() as any;
    setUserRole(role);
  }, []);

  return (
    <>
      <aside
        id="nav-menu-1"
        aria-label="Side navigation"
        className={`fixed top-16 lg:top-0 bottom-0 left-0 z-40 flex w-64 flex-col border-r border-r-slate-200 bg-[#2a2f42] transition-transform lg:translate-x-0 duration-500 ${
          isSideNavOpen ? "translate-x-0" : " -translate-x-full"
        }`}
      >
        <Link
          href="/"
          className=" py-6 mx-8 text-xl font-medium flex items-center gap-1"
        >
          <Image
            src="/Logo.png"
            className="mx-auto font-extrabold"
            width={50}
            height={40}
            alt="Logo"
          />
          <p className=" text-[#b2b2b2] font-bold text-2xl uppercase tracking-[0.1em] left-0 right-0 mx-auto text-center bottom-5">
            Medico
          </p>
        </Link>
        <nav>
          <ul className="px-3 space-y-1">
            <li className="px-3 mb-4 text-[#6A7187]">Dashboard</li>
            <NavLink
              href={
                userRole === "admin"
                  ? "/admin"
                  : userRole === "doctor"
                  ? "/doctor"
                  : userRole === "patient"
                  ? "/patient"
                  : userRole === "receptionist"
                  ? "/receptionist"
                  : "/login"
              }
            >
              <Home />
              <div className="flex w-full truncate text-sm">Dashboard</div>
            </NavLink>

            <li className="px-3 !mt-3 mb-2 text-[#6A7187]">Hospital</li>
            {userRole === "admin" && (
              <>
                <CollapsibleMenu title="Doctor" icon={<Doctor />}>
                  <NavLink href="/admin/doctors">List of Doctors</NavLink>
                  <NavLink href="/admin/doctors/create">Add New Doctor</NavLink>
                </CollapsibleMenu>

                <CollapsibleMenu title="Patient" icon={<Patient />}>
                  <NavLink href="/admin/patients">List of Patients</NavLink>
                  <NavLink href="/admin/patients/create">
                    Add New Patient
                  </NavLink>
                </CollapsibleMenu>

                <CollapsibleMenu title="Receptionist" icon={<Receptionist />}>
                  <NavLink href="/admin/receptionists">
                    List of Receptionists
                  </NavLink>
                  <NavLink href="/admin/receptionists/create">
                    Add New Receptionist
                  </NavLink>
                </CollapsibleMenu>

                <CollapsibleMenu title="Specialties" icon={<Specialties />}>
                  <NavLink href="/admin/specialties">
                    List of Specialties
                  </NavLink>
                  <NavLink href="/admin/specialties/create">
                    Add New Specialties
                  </NavLink>
                </CollapsibleMenu>

                <NavLink href="/admin/appointment-list/scheduled">
                  <div className="flex items-center">
                    <AppointmentList />
                  </div>
                  <div className="flex w-full truncate text-sm">
                    Appointment List
                  </div>
                </NavLink>

                <NavLink href="/admin/transaction">
                  <div className="flex items-center ml-1">
                    <TbFileInvoice size={20} />
                  </div>
                  <div className="flex w-full truncate text-sm">
                    Transaction
                  </div>
                </NavLink>
              </>
            )}

            {userRole === "doctor" && (
              <>
                <NavLink href="/doctor/appointments">
                  <div className="flex items-center">
                    <Appointments />
                  </div>
                  <div className="flex w-full truncate text-sm">
                    Appointments
                  </div>
                </NavLink>

                <NavLink href="/doctor/appointment-list">
                  <div className="flex items-center">
                    <AppointmentList />
                  </div>
                  <div className="flex w-full truncate text-sm">
                    Appointment List
                  </div>
                </NavLink>

                <CollapsibleMenu title="Schedules" icon={<Appointments />}>
                  <NavLink href="/doctor/schedules">List of Schedules</NavLink>
                  <NavLink href="/doctor/schedules/create">
                    Add New Schedules
                  </NavLink>
                </CollapsibleMenu>

                <NavLink href="/doctor/patients">
                  <div className="flex items-center">
                    <Patient />
                  </div>
                  <div className="flex w-full truncate text-sm">Patient</div>
                </NavLink>

                <CollapsibleMenu title="Prescription" icon={<Prescription />}>
                  <NavLink href="/doctor/prescription">
                    List of Prescription
                  </NavLink>
                  <NavLink href="/doctor/prescription/create">
                    Add New Prescription
                  </NavLink>
                </CollapsibleMenu>

                <NavLink href="/doctor/invoice">
                  <div className="flex items-center ml-1">
                    <PiInvoiceBold size={20} />
                  </div>
                  <div className="flex w-full truncate text-sm">Invoice</div>
                </NavLink>
              </>
            )}

            {userRole === "patient" && (
              <>
                <CollapsibleMenu title="Appointments" icon={<Appointments />}>
                  <NavLink href="/patient/appointments">
                    List of Appointments
                  </NavLink>
                  <NavLink href="/patient/appointments/create">
                    Add New Appointments
                  </NavLink>
                </CollapsibleMenu>

                <NavLink href="/patient/appointment-list">
                  <div className="flex items-center">
                    <AppointmentList />
                  </div>
                  <div className="flex w-full truncate text-sm">
                    Appointment List
                  </div>
                </NavLink>
                <NavLink href="/patient/doctors">
                  <div className="flex items-center">
                    <Doctor />
                  </div>

                  <div className="flex w-full truncate text-sm">Doctors</div>
                </NavLink>
                <NavLink href="/patient/prescription">
                  <div className="flex items-center">
                    <Prescription />
                  </div>
                  <div className="flex w-full truncate text-sm">
                    Prescription
                  </div>
                </NavLink>

                <NavLink href="/patient/invoices">
                  <div className="flex items-center ml-1">
                    <PiInvoiceBold size={20} />
                  </div>
                  <div className="flex w-full truncate text-sm">Invoices</div>
                </NavLink>
              </>
            )}

            {userRole === "receptionist" && (
              <>
                <NavLink href="/receptionist/appointments">
                  <div className="flex items-center">
                    <Appointments />
                  </div>

                  <div className="flex w-full truncate text-sm">
                    Appointments
                  </div>
                </NavLink>
                <NavLink href="/receptionist/appointment-list/scheduled">
                  <div className="flex items-center">
                    <AppointmentList />
                  </div>
                  <div className="flex w-full truncate text-sm">
                    Appointment List
                  </div>
                </NavLink>
                <CollapsibleMenu title="Schedules" icon={<Appointments />}>
                  <NavLink href="/receptionist/schedules">
                    List of Schedules
                  </NavLink>
                  <NavLink href="/receptionist/schedules/create">
                    Add New Schedules
                  </NavLink>
                </CollapsibleMenu>

                <NavLink href="/receptionist/doctors">
                  <div className="flex items-center">
                    <Doctor />
                  </div>
                  <div className="flex w-full truncate text-sm">Doctors</div>
                </NavLink>

                <CollapsibleMenu title="Patient" icon={<Patient />}>
                  <NavLink href="/receptionist/patients">
                    List of Patients
                  </NavLink>
                  <NavLink href="/receptionist/patients/create">
                    Add New Patient
                  </NavLink>
                </CollapsibleMenu>

                <NavLink href="/receptionist/prescription">
                  <div className="flex items-center">
                    <Prescription />
                  </div>
                  <div className="flex w-full truncate text-sm">
                    Prescription
                  </div>
                </NavLink>

                <NavLink href="/receptionist/invoices">
                  <div className="flex items-center ml-1">
                    <PiInvoiceBold size={20} />
                  </div>
                  <div className="flex w-full truncate text-sm">Invoices</div>
                </NavLink>
              </>
            )}
          </ul>
        </nav>
      </aside>

      <section className="fixed z-[30] top-0 w-full bg-white">
        <Navbar open={isSideNavOpen} setOpen={setIsSideNavOpen} />
      </section>

      <div
        className={`fixed top-16 lg:top-0 bottom-0 left-0 right-0 z-30 bg-slate-900/20 transition-colors duration-500 lg:hidden ${
          isSideNavOpen ? "block" : "hidden"
        }`}
        onClick={() => setIsSideNavOpen(false)}
      ></div>
    </>
  );
}
