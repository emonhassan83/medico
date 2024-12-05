import { Avatar } from "antd";
import Image from "next/image";
import Link from "next/link";
import { TiUserOutline } from "react-icons/ti";

type PropsType = {
  username: string;
  role: string;
  admin: number;
  doctor: number;
  patient: number;
  receptionist: number;
};

const WelcomeCard = ({
  username,
  role,
  admin,
  doctor,
  patient,
  receptionist,
}: PropsType) => {
  return (
    <div className="rounded">
      <div className="flex justify-between p-4 bg-blue-500/20">
        <div className="flex-1 text-[#556ee6]">
          <h1 className=" font-semibold">Welcome Back !</h1>
          <p>Dashboard</p>
        </div>
        <div className="flex-1 ml-[30%] relative z-10 w-[100px] h-[70px]">
          <Image src={"/profile-img.png"} layout="fill" alt="" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-5 bg-white font-light">
        <div className="col-span-1 flex flex-col gap-y-1 relative">
          <Avatar
            size={64}
            icon={<TiUserOutline />}
            className="absolute -top-10 z-10 bg-gray-300"
          />
          <div className="-mt-5">
            <p className="font-semibold">{username}</p>
            <p className="font-light">{role}</p>
          </div>
        </div>
        <div className="col-span-2 flex justify-between pr-10 md:justify-around md:pr-2">
          <div className="flex flex-col gap-y-4">
            <div>
              <Link href={"/doctors"} className="text-[#556ee6] font-semibold">
                {admin}
              </Link>
              <p>Admin</p>
            </div>
            <div>
              <Link
                href={"/receiptionists"}
                className="text-[#556ee6] font-semibold"
              >
                {patient}
              </Link>
              <p>Patients</p>
            </div>
          </div>
          <div className="flex flex-col gap-y-4">
            <div>
              <Link href={"/patients"} className="text-[#556ee6] font-semibold">
                {doctor}
              </Link>
              <p>Doctors</p>
            </div>

            <div>
              <Link
                href={"/receptionist"}
                className="text-[#556ee6] font-semibold"
              >
                {receptionist}
              </Link>
              <p>Receptionists</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeCard;
