import { useGetMyProfileQuery } from "@/redux/api/userApi";
import { Avatar } from "antd";
import Image from "next/image";
import Link from "next/link";
import { TiUserOutline } from "react-icons/ti";



const WelcomeCardProfile = () => {
  const {data} = useGetMyProfileQuery(undefined)
 

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
          {/* <div className="mt-6">
            <p className="font-semibold text-[#495057] ">{username}</p>
            <p className="font-[400] text-md text-[#74788D]">{role}</p>
          </div> */}
        </div>


        
      </div>

      <div className="flex justify-between px-5">
           <p>{`${data?.firstName} ${data?.lastName}...`}</p>
        
           <div>
             <p>Last login:</p>
             <h1 className="text-[#74788D]">{data?.createdAt}</h1>
             <button className="bg-blue-700 text-white px-4 py-1 rounded mt-4 ">Edit Profile</button>
           </div>
          
        </div>
    </div>
  );
};

export default WelcomeCardProfile;
