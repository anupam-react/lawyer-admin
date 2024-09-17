import React, { useState } from "react";
import { createApiData } from "../utlis";
import { useNavigate } from "react-router-dom";
import { Baseurl } from "../utlis/apiservices";

const CreateHelp = () => {
    const [mobileNumber , setMobileNumber] = useState("")
    const [mobileNumberDescription , setMobileNumberDescription] = useState("")
    const [email , setEmail] = useState("")
    const [emailDescription , setEmailDescription] = useState("")
    const [whatAppchat , setWhatAppchat] = useState("")
    const [whatAppchatDescription , setWhatAppchatDescription] = useState("")

    const navigate =  useNavigate()

    const handleHelp = async()=>{
     const formData = {
        mobileNumber,
        mobileNumberDescription,
        email,
        emailDescription,
        whatAppchat,
        whatAppchatDescription
     }   
    try {
        await createApiData(
         `${Baseurl}/api/v1/admin/addContactDetails`,
          formData
        );
        alert("Save successfully");
        navigate('/help')
      } catch (error) {
        console.error("Error adding data:", error);
      }
    }

  return (
    <div>
      <p className="text-[28px] pb-4">Create Help & Support</p>
      <div className="grid grid-cols-3 gap-6">
        <div className="flex flex-col gap-2">
          <span className="text-black font-semibold">Mobile Number</span>

          <input
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            className="placeholder:block rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-black font-semibold">Email</span>

          <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            className="placeholder:block rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-black font-semibold">WhatsApp Number</span>

          <input
              value={whatAppchat}
              onChange={(e) => setWhatAppchat(e.target.value)}
            className="placeholder:block  rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-black font-semibold">Mobile Description</span>

          <textarea
              value={mobileNumberDescription}
              onChange={(e) => setMobileNumberDescription(e.target.value)}
            className="placeholder:block  rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-black font-semibold">Email Description</span>

          <textarea
              value={emailDescription}
              onChange={(e) => setEmailDescription(e.target.value)}
            className="placeholder:block  rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-black font-semibold">WhatsApp Description</span>

          <textarea
              value={whatAppchatDescription}
              onChange={(e) => setWhatAppchatDescription(e.target.value)}
            className="placeholder:block  rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <button
        type="submit"
        onClick={handleHelp}
        className="bg-[#0F2C64] mt-4 p-2 pl-5 pr-5 rounded text-white flex justify-center cursor-pointer items-center gap-2"
      >
        Save
      </button>
    </div>
  );
};

export default CreateHelp;
