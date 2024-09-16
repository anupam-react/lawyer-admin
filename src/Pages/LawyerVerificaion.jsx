import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchApiData, updateApiData } from '../utlis';
import { Baseurl } from "../utlis/apiservices";
import dltbtn from "../Assets/dltbtn.svg";
import goback from "../Assets/goback.svg";

const LawyerVerificaion = () => {
    const [lawyer, setLawyer] = useState();

    const navigate = useNavigate()

    const {id}  = useParams()

    const fetchSingleLawyer = async (id) => {
        const data = await fetchApiData(`${Baseurl}/api/v1/admin/User/${id}`);
        console.log(data);
        setLawyer(data?.data);
      };

      useEffect(()=>{
        fetchSingleLawyer(id)
      },[id])

      const handleApproveStatus = async () => {
        const formData = new FormData();
        formData.append("status", "Approved");
       
        
        try {
          await updateApiData(
            `${Baseurl}/api/v1/admin/updateLawyer/${id}`,
            formData
          );
          alert("Update Status Successfully");
          navigate('/Lawyers')
        } catch (error) {
          console.error("Error editing data:", error);
        }
      };
      const handleRejectStatus = async () => {
        const formData = new FormData();
        formData.append("status", "Rejected");
        
        try {
          await updateApiData(
            `${Baseurl}/api/v1/admin/updateLawyer/${id}`,
            formData
          );
          alert("Update Status Successfully");
          navigate('/Lawyers')
        } catch (error) {
          console.error("Error editing data:", error);
        }
      };

  return (
    <div>
          <div className="rounded h-[700px]">
            <div className="flex  justify-between items-center pt-5 ml-5 mr-5">
              <div className="text-2xl mb-5  text-black font-semibold">
                Lawyer Profile
                <br />
                <span className="text-[15px] text-[#525252]">
                  View and edit profile settings
                </span>
              </div>
              <div className="flex justify-center items-center gap-5">
                <button
                  className="text-[#0F2C64] pr-1 rounded bg-white border border-[#0F2C64] flex items-center"
                  onClick={() => {
                    navigate('/Lawyers')
                  }}
                >
                  <img
                    src={goback}
                    alt="goback"
                    className="mr-2 bg-[#0F2C64] p-1.5"
                  />
                  Go Back
                </button>
              </div>
            </div>
            <hr />

            <div className="mt-5 flex justify-between items-center">
              <div className="text-center flex items-center gap-1">
                <img
                  src={lawyer?.image}
                  alt=""
                  className="w-[82px] h-[82px] rounded-full"
                />
                <div className="flex flex-col ">
                  <span className="text-left text-xl">
                    {lawyer?.fullName ||
                      lawyer?.firstName + " " + lawyer?.lastName}
                  </span>
                  <span className="text-[#8B8B8B] text-left text-[10px]">
                    Verified Account
                  </span>
                </div>
                <div>
                  <span class="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                    New
                  </span>
                </div>
              </div>
              <div className="flex gap-4">
                <button onClick={handleApproveStatus} className="bg-[#0F2C64] flex justify-center items-center h-[39px] w-[153px] rounded-lg text-white">
                  Approve
                </button>
                <button onClick={handleRejectStatus} className="bg-red-500 flex justify-center items-center h-[39px] w-[153px] rounded-lg text-white">
                  Reject
                </button>
              
              </div>
            </div>

            <div className='flex justify-between gap-4 flex-warp mt-4'>
             <div>
                <p className='text-semibold text-[18px] pb-4'>Bar Certificate</p>
               
                <div>
                    <img src={lawyer?.barCertificateImage} alt="" className='w-[200px] h-[100px]'/>
                </div>
                <p className='pt-[5px]'>{lawyer?.barCertificateNo}</p>
             </div>
             <div>
                <p className='text-semibold text-[18px] pb-4'>Bar Registration</p>
               
                <div>
                    <img src={lawyer?.barRegistrationImage} alt="" className='w-[200px] h-[100px]'/>
                </div>
                <p className='pt-[5px]'>{lawyer?.barRegistrationNo}</p>
             </div>
             <div>
                <p className='text-semibold text-[18px] pb-4'>Aadhar</p>
               
                <div>
                    <img src={lawyer?.aadhar} alt="" className='w-[200px] h-[100px]'/>
                </div>
              
             </div>

            </div>

          </div>
    </div>
  )
}

export default LawyerVerificaion