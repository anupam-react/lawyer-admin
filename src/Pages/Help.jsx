import React, { useEffect, useState } from 'react'
import { fetchApiData } from '../utlis';
import { Baseurl } from '../utlis/apiservices';
import { useNavigate } from 'react-router-dom';

const Help = () => {
    const [complaint , setComplaint] = useState([])

    const navigate = useNavigate()
  async function fetchdepartment() {
    const data = await fetchApiData(`${Baseurl}/api/v1/viewContactDetails`);
    setComplaint(data?.data);
  }

  useEffect(()=>{
    fetchdepartment()
  },[])
  return (
    <div>
            <div className="rounded h-[700px]">
      <div className="flex  justify-between items-center pt-5 ml-5 mr-5">
        <div className="text-2xl mb-5  text-black font-semibold">
          View Help Details
        </div>
        <button
                className="bg-[#0F2C64] p-1 pl-3 pr-3 rounded text-white"
                onClick={() => navigate('/add-help')}
              >
                Create New Help
              </button>
      </div>

      <div className="mb-[200px] mt-5 ">
        <table className="w-full border border-1 m-4 ">
          <thead>
            <tr className="">
              <th className=" text-center text-[#6D6D6D] h-[60px]  border border-1">Mobile Number</th>
              <th className="text-center text-[#6D6D6D] w-[150px] border border-1">Mobile Number Description</th>
              <th className="text-center text-[#6D6D6D] border border-1">Email</th>
              <th className=" text-center text-[#6D6D6D] border border-1">
              Email Description
              </th>
              <th className=" text-center text-[#6D6D6D] border border-1">
              WhatApp Chat
              </th>
              <th className=" text-center text-[#6D6D6D] border border-1">
              WhatApp Chat Description
              </th>
              
            </tr>
          </thead>
          <tbody>
           
            <tr  className="shadow-lg bg-[white] border border-1">
              <td className="text-center h-[80px]  border border-1">
             {complaint?.mobileNumber}
              </td>
              <td className="text-center  border border-1">{complaint?.mobileNumberDescription}</td>

              <td className="text-center  border border-1">
                <div>{complaint?.email}</div>

              </td>
              <td className="text-center border border-1">
               <p>{complaint?.emailDescription}</p>
              </td>
              <td className="text-center border border-1">
              <p>{complaint?.whatAppchat}</p>
              </td>
              <td className="text-center border border-1">
              <p>{complaint?.whatAppchatDescription}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    </div>
  )
}

export default Help