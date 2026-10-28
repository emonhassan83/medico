"use  client";

const PersonalInfoProfile = ({ data }: any) => {
  return (
    <div>
      <h1 className="text-xl text-[#343A40]">Personal Information</h1>

      <div className="flex gap-8 mt-7">
        <h1 className="text-[14px] font-[600] text-[#495057] ">Full Name : </h1>
        <p className="text-[#74788D] text-[14px]">{`${data?.firstName} ${data?.lastName}`}</p>
      </div>

      <div className="flex gap-8 mt-6">
        <h1 className="text-[14px] font-[600] text-[#495057]">Contact : </h1>
        <p className="text-[#74788D] text-[14px]">{data?.contactNumber}</p>
      </div>

      <div className="flex gap-8 mt-6">
        <h1 className="text-[14px] font-[600] text-[#495057]">Email : </h1>
        <p className="text-[#74788D] text-[14px]">{data?.email}</p>
      </div>

      <div className="flex gap-8 mt-6">
        <h1 className="text-[14px] font-[600] text-[#495057]">Address : </h1>
        <p className="text-[#74788D] text-[14px]">{data?.address}</p>
      </div>

      <div className="flex gap-8 mt-6">
        <h1 className="text-[14px] font-[600] text-[#495057]">Position : </h1>
        <p className="text-[#74788D] text-[14px]">{data?.role}</p>
      </div>
    </div>
  );
};

export default PersonalInfoProfile;
