import { useRouter } from "next/navigation";



const page = ( { params }: { params: { id: string } } ) => {  

  return (
    <div> dainamic  page {params.id}  </div>
  )
}

export default page;