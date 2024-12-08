import React from 'react'
import AllTableMange from './dashbord/allTableMange/page'

const ReceptionistDashboard = () => {
  return (
    <div>
      <p>Receptionist   Dashboard</p>




        {/* show Latest Users table  */}
        <div className='mt-20'>
           <AllTableMange/>
        </div>
    </div>
  )
}

export default ReceptionistDashboard