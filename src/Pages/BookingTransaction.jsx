import React, { useEffect, useState } from 'react'
import { currentDate, fetchApiData } from '../utlis';
import { Baseurl } from '../utlis/apiservices';
import { useParams } from 'react-router-dom';

const BookingTransaction = () => {
 const [bookingDetails, setBookingDetails] = useState([])

 const {id} = useParams()

    async function fetchupcomingbooking() {

        const data = await fetchApiData(`${Baseurl}/api/v1/user/allTransaction?appointmentId=${id}`)
        console.log(data?.data)
        setBookingDetails(data?.data);

      }

   useEffect(()=>{
    fetchupcomingbooking()
   },[])
  return (
    <div>  
       <div className=" mt-5">
    <div className="flex justify-between items-center">
      <div className="text-2xl font-medium">Transactions</div>

      {/* <div>
        <select className="bg-[#0F2C64] text-white px-6 h-[50px] rounded-2xl">
          <option>All Transactions</option>
        </select>
      </div> */}
    </div>
    <div className="box-shadow rounded-xl mb-[200px] mt-5 p-5 h-[500px] overflow-scroll">
      <table className="w-full ">
        <thead>
          <tr>
            <th className="w-[200px] text-center ">Name</th>
            <th className="w-[200px] text-center ">User Type</th>
            
      

            <th className="w-[200px] text-center ">Date</th>

            <th className="w-[200px] text-center ">Amount</th>
            <th className="w-[200px] text-center ">Transaction Type</th>
           
          </tr>
        </thead>
        <tbody>
          {bookingDetails?.map((item ,i)=>(

         
            <tr key={i} className="h-[40px]  border-b">
              <td>
                <div className="text-center flex items-center justify-start gap-4 h-[60px]">
                  <img
                    src={item.user?.image}
                    alt=""
                    className="w-[40px] h-[40px] rounded-full"
                  />
                  <div className="flex flex-col ">
                    <span className="text-left font-bold text-[16px]">
                      {item.user?.fullName || item.user?.firstName + " " + item.user?.lastName}
                    </span>
                    <span className="text-[#0F2C64] text-left text-[12px]">
                      {item.user?.email}
                    </span>
                  </div>
                </div>
              </td>

              <td className="w-[50px] text-center">{item?.user?.userType}</td>
              <td className="w-[50px] text-center">{currentDate(item.date)}</td>

              <td className="w-[50px] text-center text-[#26A843]">
                {item?.amount}
              </td>
              <td className="w-[50px] text-center ">
                {item?.type}
              </td>
            
            </tr>
             ))}
        </tbody>
      </table>
    </div>
  </div>
  </div>
  )
}

export default BookingTransaction