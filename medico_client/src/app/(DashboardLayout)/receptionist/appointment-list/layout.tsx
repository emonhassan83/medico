import Link from "next/link";
const statusList = [
  { id: 1, status: 'scheduled', title: 'Scheduled Appointment List' },
  { id: 2, status: 'inprogress', title: 'Inprogress Appointment List'},
  { id: 3, status: 'completed', title: 'Completed Appointment List' },
  { id: 4, status: 'canceled', title: 'Canceled Appointment List'},
];

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <div className="flex justify-between px-3 mt-8 mb-10">
        <div>
          <p className="uppercase ">Appointment List</p>
        </div>

        <div className="flex text-sm">
          <p>Dashboard</p>{" "}/ {" "}<p>Appointment</p>
        </div>
      </div>

      <div className="flex justify-between gap-8 px-3 my-6">
        {statusList?.map((value, i: number) => (
          <div key={i}>
            <Link href={`/receptionist/appointment-list/${value.status}`}>
              <button className="focus:text-blue-700 focus:border-b-[2px] focus:border-blue-500 pb-5 border-b text-sm ">
                {" "}
                {value.title}{" "}
              </button>
            </Link>
          </div>
        ))}
      </div>

      {children}
    </div>
  );
};

export default layout;
