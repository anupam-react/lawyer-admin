import React, { useEffect, useState } from "react";
import { deleteApiData, fetchApiData } from "../utlis";
import { Baseurl } from "../utlis/apiservices";

import deletebtn from "../Assets/dltbtn.svg";
const Complaint = () => {
  const [complaint , setComplaint] = useState([])
  async function fetchdepartment() {
    const data = await fetchApiData(`${Baseurl}/api/v1/admin/help`);
    setComplaint(data?.message);
  }

  useEffect(()=>{
    fetchdepartment()
  },[])

  async  function handledelete(id) {
    try {
      await deleteApiData(`${Baseurl}/api/v1/help/delete/${id}`);
     
      fetchdepartment()

    } catch (err) {
      console.log(err);
    }
   
  }
  
  return (
    <div className="rounded h-[700px]">
      <div className="flex  justify-between items-center pt-5 ml-5 mr-5">
        <div className="text-2xl mb-5  text-black font-semibold">
          Total Complaints
        </div>
      </div>

      <div className="mb-[200px] mt-5 ">
        <table className="w-full border border-1 m-4 ">
          <thead>
            <tr className="">
              <th className=" text-center text-[#6D6D6D] h-[60px]  border border-1">User Name</th>
              <th className="text-center text-[#6D6D6D] w-[150px] border border-1">Email</th>
              <th className="text-center text-[#6D6D6D] border border-1">Mobile</th>
              <th className=" text-center text-[#6D6D6D] border border-1">
                Query
              </th>
              <th className=" text-center text-[#6D6D6D] border border-1">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {complaint?.map((data, i)=>(
            <tr key={i} className="shadow-lg bg-[white] border border-1">
              <td className="text-center h-[80px]  border border-1">
             {data?.name}
              </td>
              <td className="text-center  border border-1">{data?.email}</td>

              <td className="text-center  border border-1">
                <div>{data?.mobile}</div>

              </td>
              <td className="text-center w-[500px]  border border-1">
               <p>{data?.query}</p>
              </td>
              <td className="flex items-center justify-center">
              <img
                  src={deletebtn}
                  alt=""
                  className="cursor-pointer"
                  onClick={() => handledelete(data?._id)}
                />
              </td>
            </tr>

            ))}
          
           
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Complaint;
