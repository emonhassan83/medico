"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import Navbar from "./Navbar";

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
      className={`flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-[#5d7e7d] hover:text-white ${
        isActive ? "bg-[#5d7e7d] text-white" : "text-[#a6b0cf]"
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
        <div className="flex w-full flex-1 truncate font-semibold">{title}</div>
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

  return (
    <>
      <aside
        id="nav-menu-1"
        aria-label="Side navigation"
        className={`fixed top-16 lg:top-0 bottom-0 left-0 z-40 flex w-80 flex-col border-r border-r-slate-200 bg-[#2a2f42] transition-transform lg:translate-x-0 duration-500 ${
          isSideNavOpen ? "translate-x-0" : " -translate-x-full"
        }`}
      >
        <Link href="/" className="relative p-6 text-xl font-medium">
          <Image src="/Logo.png" className="mx-auto size-28" width={195} height={40} alt="Logo" />
          <p className="absolute text-white font-[1000] text-4xl uppercase tracking-[0.2em] left-0 right-0 mx-auto text-center bottom-5 ">Medico</p>
        </Link>
        <nav>
          <ul className="px-3">
            <li className="px-3 mb-4 text-[#6A7187]">Dashboard</li>
            <NavLink href="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-6 lucide lucide-house"
              >
                <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
                <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              </svg>
              <div className="flex w-full truncate">Dashboard</div>
            </NavLink>

            <li className="px-3 mt-4 mb-2 text-[#6A7187]">Hospital</li>
            <CollapsibleMenu
              title="Doctor"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="5"
                  className="size-8 lucide lucide-plus"
                >
                  <path d="M5 12h14" />
                  <path d="M12 5v14" />
                </svg>
              }
            >
              <NavLink href="/doctor">List of Doctors</NavLink>
              <NavLink href="/doctor/create">Add New Doctor</NavLink>
            </CollapsibleMenu>
            <CollapsibleMenu
              title="Patient"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-6 mx-1 lucide lucide-users-round"
                >
                  <path d="M18 21a8 8 0 0 0-16 0" />
                  <circle cx="10" cy="8" r="5" />
                  <path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3" />
                </svg>
              }
            >
              <NavLink href="/patient">List of Patients</NavLink>
              <NavLink href="/patient/create">Add New Patient</NavLink>
            </CollapsibleMenu>
            <CollapsibleMenu
              title="Receptionist"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="size-6 mx-1 lucide lucide-user-round-cog"
                >
                  <path d="M2 21a8 8 0 0 1 10.434-7.62" />
                  <circle cx="10" cy="8" r="5" />
                  <circle cx="18" cy="18" r="3" />
                  <path d="m19.5 14.3-.4.9" />
                  <path d="m16.9 20.8-.4.9" />
                  <path d="m21.7 19.5-.9-.4" />
                  <path d="m15.2 16.9-.9-.4" />
                  <path d="m21.7 16.5-.9.4" />
                  <path d="m15.2 19.1-.9.4" />
                  <path d="m19.5 21.7-.4-.9" />
                  <path d="m16.9 15.2-.4-.9" />
                </svg>
              }
            >
              <NavLink href="/receptionist">List of Receptionists</NavLink>
              <NavLink href="/receptionist/create">
                Add New Receptionist
              </NavLink>
            </CollapsibleMenu>
          </ul>
        </nav>
      </aside>

      <section className="fixed top-0 w-full bg-white">
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
