import Link from "next/link";



const layout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <div> 
         <div className="flex gap-4 my-11">
         <h1> apponintment layout</h1>
         <Link href='/appointments/panding'>   
            <p>panding</p>
            </Link>
            <Link href='/appointments/cencel'>   
            <p>cencel</p>
            </Link>
         </div> 

        {children}
    </div>
  )
}

export default layout