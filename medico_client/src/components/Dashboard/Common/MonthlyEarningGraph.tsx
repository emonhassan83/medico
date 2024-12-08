import { GoArrowDown } from "react-icons/go";

const data = [
  { name: "Earnings", value: 41.44 },
  { name: "Remaining", value: 58.56 },
];

const COLORS = ["#4CAF50", "#FF6384"];
const MonthlyEarningGraph = () => {
  return (
    <div className="bg-white p-6 rounded">
      <h2 className="text-lg font-semibold text-[16px] text-[#343A40] mb-3">Monthly Earning</h2>
      <div className="flex justify-between gap-5">
        <div>
          <p className="text-gray-600 mb-3">This month</p>
          <p className="text-3xl font-[500] text-[#495057] text-[22px] mt-5 mb-3">$27,997</p>
          <p className=" text-sm mt-1 text-light">
            <span className="text-red-500">
              -58.56% <GoArrowDown className="mx-1 inline" />
            </span>
            From <br /> previous month
          </p>
        </div>
        <div className="relative pt-4">
          <div className="w-24 h-24 mx-auto">
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <path
                className="text-gray-300"
                d="M18 2.0845a15.9155 15.9155 0 1 0 0 31.831 15.9155 15.9155 0 1 0 0-31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
              ></path>
              <path
                className="text-blue-400"
                d="M18 2.0845a15.9155 15.9155 0 0 1 0 31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeDasharray="58.56, 100"
              ></path>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm text-gray-600">-58.56%</span>
            </div>
          </div>
          <p className="text-center text-gray-600 mt-2">Monthly Analytics</p>
        </div>
      </div>
    </div>
  );
};

export default MonthlyEarningGraph;
