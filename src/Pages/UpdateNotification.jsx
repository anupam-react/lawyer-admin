import React, { useEffect, useState } from 'react'
import { fetchApiData, updateApiData } from '../utlis';
import { Baseurl } from "../utlis/apiservices";
import { useNavigate, useParams } from 'react-router-dom';

const UpdateNotification = () => {
    const [isSelect, setSelect] = useState(true);
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
  
    const [userType, setUserType] = useState("All");
    const [notification, setNotification] = useState([]);

    const {id} = useParams()
    const navigate = useNavigate()
    async function fetchNotification(id) {
        const data = await fetchApiData(`${Baseurl}/api/v1/admin/notifications/${id}`);
        console.log(data);
        setNotification(data?.data);
        setSelect(data?.data?.isEnable)
      }


useEffect(()=>{
    fetchNotification(id)
},[id])

    const handleUpdateNotification = async () => {
       
        console.log(title, message);
        const formData = {
        };
            if(title) formData.title = title
            if(message) formData.message = message
            if(userType) formData.userType = userType
    
        try {
          await updateApiData(`${Baseurl}/api/v1/admin/notifications/${id}`, formData);
          alert("Update Notification successfully");
          navigate('/notification')

        } catch (error) {
          console.error("Error adding data:", error);
        }
      };
  return (
    <div>
             <div className="flex justify-between items-center pt-5 ml-5 mr-5">
            <div className="text-2xl mb-5 text-[black] font-semibold">
              Update Notification 
              <br />
              <span className="text-[15px] text-[#525252]">
                Edit  notification
              </span>
            </div>
         
          </div>
          <hr />
          
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-black font-semibold">
                  Notification Title
                </span>

                <input
                  value={title || notification?.title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="placeholder:block w-[500px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>

              {/* <div className="flex items-center gap-2">
                <span className="text-black font-semibold">
                  Push Notification
                </span>
                <button
                  onClick={() => {
                    // handleEnableDisableNotification(selectedItemId, true)
                    setSelect(true);
                  }}
                  className={
                    isSelect
                      ? "bg-[#0F2C64] p-1 pl-10 pr-10 rounded text-white flex justify-center items-center gap-2"
                      : "bg-white p-1 pl-10 pr-10 rounded text-[#0F2C64] flex justify-center items-center gap-2 border border-[#0F2C64]"
                  }
                >
                  Enable
                </button>
                <button
                  onClick={() => {
                    // handleEnableDisableNotification(selectedItemId, false)
                    setSelect(false);
                  }}
                  className={
                    !isSelect 
                      ? "bg-[#0F2C64] p-1 pl-10 pr-10 rounded text-white flex justify-center items-center gap-2"
                      : "bg-white p-1 pl-10 pr-10 rounded text-[#0F2C64] flex justify-center border border-[#0F2C64] items-center gap-2"
                  }
                >
                  Disable
                </button>
              </div> */}
            </div>
            <div className="flex justify-between">
              <div>
                <div className="text-black font-semibold ">
                  Notification Content
                </div>
                <input
                  value={message || notification?.message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-[700px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <div className="flex mt-3 gap-2">
                  <button className="border-[#ABABAB] border p-2 pl-3 pr-3 rounded text-[#ABABAB] flex justify-center items-center gap-2">
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdateNotification}
                    className="bg-[#0F2C64]  p-2 pl-3 pr-3 rounded text-white flex justify-center items-center gap-2"
                  >
                    Save
                  </button>
                </div>
              </div>
              <div>
                <div className="text-black font-semibold">User Type</div>
                <select
                  type="date"
                  onChange={(e) => setUserType(e.target.value)}
                  value={userType}
                  className="w-[150px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option value="All">All</option>
                  <option value="CUSTOMER">Client</option>
                  <option value="LAWYER">Lawyer</option>
                </select>
              </div>
            </div>
    </div>
  )
}

export default UpdateNotification