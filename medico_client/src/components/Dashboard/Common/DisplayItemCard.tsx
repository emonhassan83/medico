import { GoBook } from "react-icons/go";

const DisplayItemCard = () => {
  return <div className="flex items-center justify-between p-5 gap-8 bg-white rounded">
  <div>
    <h4 className="mb-2 text-[#74788d]">Display items per page</h4>
    <div className="text-lg text-white flex gap-3">
        <span className="bg-blue-400 px-1.5 py-1 rounded">10</span>
        <span className="bg-blue-400 px-1.5 py-1 rounded">25</span>
        <span className="bg-blue-400 px-1.5 py-1 rounded">50</span>
        <span className="bg-blue-400 px-1.5 py-1 rounded">100</span>
    </div>
  </div>
  <div><GoBook className="w-10 h-10 text-blue-400 mt-7" /></div>
</div>
};

export default DisplayItemCard;
