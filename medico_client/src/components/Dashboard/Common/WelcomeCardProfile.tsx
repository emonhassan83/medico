import { Avatar } from "antd";
import Image from "next/image";
import Link from "next/link";
import { TiUserOutline } from "react-icons/ti";

const WelcomeCardProfile = ({ data }: any) => {
  const role = data?.role?.toLowerCase();

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
            className="absolute -top-14 z-10 bg-gray-300"
          />
        </div>
      </div>

      <div className="flex justify-between px-5 bg-white pb-2">
        <div>
          <p className="text-[#495057] text-md mb-2">{`${data?.firstName} ${data?.lastName}...`}</p>
          <p className="text-[#74788D]">{data?.role}</p>
        </div>

        <div>
          <p className="text-[#495057] text-md mb-2">Last login:</p>
          <h1 className="text-[#74788D]">{data?.createdAt}</h1>
          <Link href={`/${role}/profile-view/edit`}>
            <button className="bg-blue-700 text-white px-4 py-1 rounded mt-4 ">
              Edit Profile
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WelcomeCardProfile;
