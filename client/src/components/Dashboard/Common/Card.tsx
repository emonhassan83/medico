type PropsType = {
  title: string;
  number: number | string;
  icon: JSX.Element;
};

const Card = ({ title, number, icon }: PropsType) => {
  return (
    <div className="flex items-center justify-between gap-4 p-5 bg-white rounded ">
      <div>
        <h4 className="mb-2 text-[#74788d] font-medium ">{title}</h4>
        <p className="text-lg text-[#495057] font-semibold ">{number}</p>
      </div>
      <div className="bg-blue-400 px-1 py-1 rounded-full">
        <p className="text-white p-2">{icon}</p>
      </div>
    </div>
  );
};

export default Card;
