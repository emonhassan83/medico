import { useGetMyProfileQuery } from "@/redux/api/userApi";
import { logoutUser } from "@/services/actions/logoutUser";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

const Navbar = ({
  setOpen,
  open,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
}) => {
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const { data } = useGetMyProfileQuery({});
  const router = useRouter();

  const navigateRole = data && data?.role?.toLowerCase();

  useEffect(() => {
    router.refresh();
  }, [data, router]);

  const handleNavigate = () => {
    router.push(`/${navigateRole}/profile-view`);
  };

  const handleLogout = () => {
    logoutUser(router);
    router.push("/login");
  };

  return (
    <nav
      className={`flex items-center justify-between w-full relative p-3 ps-0 lg:ps-80`}
    >
      <button
        title="Side navigation"
        type="button"
        className={`block h-10 w-10 self-center rounded-lg bg-transparent backdrop-blur-sm visible opacity-100 lg:invisible lg:opacity-0 ${
          open
            ? "[&_span:nth-child(1)]:w-6 [&_span:nth-child(1)]:translate-y-0 [&_span:nth-child(1)]:rotate-45 [&_span:nth-child(3)]:w-0 [&_span:nth-child(2)]:-rotate-45 "
            : ""
        }`}
        aria-haspopup="menu"
        aria-label="Side navigation"
        aria-expanded={open ? "true" : "false"}
        aria-controls="nav-menu-1"
        onClick={() => setOpen(!open)}
      >
        <div className="absolute top-1/2 left-1/2 w-6 -translate-x-1/2 -translate-y-1/2 transform">
          <span
            aria-hidden="true"
            className="absolute block h-0.5 w-9/12 -translate-y-2 transform rounded-full bg-slate-700 transition-all duration-500"
          ></span>
          <span
            aria-hidden="true"
            className="absolute block h-0.5 w-6 transform rounded-full bg-slate-900 transition duration-500"
          ></span>
          <span
            aria-hidden="true"
            className="absolute block h-0.5 w-1/2 origin-top-left translate-y-2 transform rounded-full bg-slate-900 transition-all duration-500"
          ></span>
        </div>
      </button>
      <div className="flex items-center gap-[15px] relative">
        <div
          className="flex items-center gap-[10px] cursor-pointer  mr-4"
          onClick={() => setAccountMenuOpen(!accountMenuOpen)}
        >
          <div className="relative">
            <Image
              src={
                data && data?.profilePhoto
                  ? data?.profilePhoto
                  : "https://img.freepik.com/free-photo/portrait-man-laughing_23-2148859448.jpg?t=st=1724605498~exp=1724609098~hmac=7f6fc106bae2c17b0c93af1b2e5483d9d8368f3e51284aaec7c7d50590d2bae5&w=740"
              }
              alt="avatar"
              width={35}
              height={35}
              className="size-8 lg:size-12 rounded-full object-cover"
            />
            <div className="w-[10px] h-[10px] rounded-full bg-green-500 absolute bottom-[0px] right-0 border-2 border-white"></div>
          </div>

          <h1 className="text-[1rem] font-[400] text-gray-600 sm:block hidden">
            {data && data?.firstName + " " + data?.lastName}
          </h1>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={`size-4 transition-transform duration-500 ${
              accountMenuOpen ? "rotate-180" : "rotate-0"
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
          className={`${
            accountMenuOpen
              ? "translate-y-0 scale-100 opacity-100 !z-[99999] block"
              : "translate-y-[50%] scale-0 opacity-0 !-z-50 cursor-pointer"
          } bg-white w-max rounded-md shadow-lg absolute top-8 lg:top-12 right-0 p-[10px] flex flex-col transition-all duration-300 gap-2`}
        >
          <p onClick={handleNavigate} className="flex items-center gap-2 rounded-md p-2 pr-[45px] py-[3px] text-[1rem] text-gray-600 hover:bg-gray-50 hover:cursor-pointer">
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
              className="lucide lucide-user-round"
            >
              <circle cx="12" cy="8" r="5" />
              <path d="M20 21a8 8 0 0 0-16 0" />
            </svg>
            View Profile
          </p>
          <p className="flex items-center gap-2 rounded-md p-2 pr-[45px] py-[3px] text-[1rem] text-gray-600 hover:bg-gray-50 hover:cursor-default">
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
              className="animate-spin lucide lucide-settings"
            >
              <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            Settings
          </p>

          <div
            onClick={handleLogout}
            className="mt-3 border-t border-gray-200 pt-[5px] cursor-pointer"
          >
            <p className="flex items-center gap-2 rounded-md p-2 pr-[45px] py-[3px] text-[1rem] text-red-500 hover:bg-red-50 hover:cursor-pointer">
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
                className="lucide lucide-power"
              >
                <path d="M12 2v10" />
                <path d="M18.4 6.6a9 9 0 1 1-12.77.04" />
              </svg>
              Logout
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
