type PropsType = {
  title: string;
  number: number | string;
  icon: JSX.Element;
};

const Card = ({ title, number, icon }: PropsType) => {
  return (
    <div className="flex items-center justify-between p-5 bg-white rounded">
      <div>
        <h4 className="mb-2 text-[#74788d]">{title}</h4>
        <p className="text-lg text-[495057]">{number}</p>
      </div>
      <div>{icon}</div>
    </div>
  );
};

export default Card;
