import deletebtn from "../Assets/dltbtn.svg";
import bell from "../Assets/bell.svg";
import editicon from "../Assets/editicon.svg";
import axios from "axios";
import { Baseurl } from "../utlis/apiservices";
import { headers } from "../utlis/config";
import { useEffect, useState } from "react";
import Spinner from "../utlis/Spinner";
import { useNavigate } from "react-router-dom";
import { createApiData, deleteApiData, fetchApiData, getDateFromISOString } from "../utlis";

const Notification = () => {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const [userType, setUserType] = useState("ALL");
  const [selectedNotification, setSelectedNotification] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [isSelect , setSelect] = useState(true)
  const [isDelete , setDelete] = useState(false)
  const navigate = useNavigate();
  console.log(selectedItemId);
  ///////////fetch notification////////////
 async function fetchNotification() {
  const data = await fetchApiData( `${Baseurl}/api/v1/admin/notifications`);
  console.log(data);
  setData(data?.data);

   
  
  }
  useEffect(() => {
    fetchNotification();
    setTimeout(() => {
      setLoading();
    }, 1000);
  }, []);

  //////////create Notification/////////
  const handleCreateNotification = async(e) => {
    e.preventDefault();
    console.log(title, message);
    const formData = {
      title: title,
      message: message,
      userType: userType,
      isEnable: isSelect
    };

    try {
      await createApiData(
      `${Baseurl}/api/v1/admin/notifications`,
        formData
      );
      alert("Data added successfully");
    } catch (error) {
      console.error("Error adding data:", error);
    }
  
   
  };

  ///////////// Enable or Disable Notification /////////////
  const handleEnableDisableNotification = (selectedItemId, enable) => {
    const formData = {
      enabled: enable,
    };
    axios
      .put(
        `${Baseurl}/api/v1/admin/notifications/IsEnableNotification/${selectedItemId}`,
        formData,
        {
          headers: headers,
        }
      )
      .then((response) => {
        alert(enable ? "Notification enabled" : "Notification disabled");
        // fetchNotification();
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  /////////////////Delete Notification///////////

  async function handledelete(_id) {

    try {
      await deleteApiData(`${Baseurl}/api/v1/admin/notifications/${_id}`);
      setDelete(false)
      fetchNotification()

    } catch (err) {
      console.log(err);
    }
   
  
  }

  // Function to handle checkbox toggle
  const handleCheckboxChange = (itemId, selectedItemId) => {
    const isSelected = selectedNotification.includes(itemId);
    if (isSelected) {
      setSelectedNotification(
        selectedNotification.filter((id) => id !== itemId)
      );
    } else {
      setSelectedNotification([...selectedNotification, itemId]);
    }

    setSelectedItemId(selectedItemId);
  };
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="h-[600px]">
          <div className="flex justify-between items-center pt-5 ml-5 mr-5">
            <div className="text-2xl mb-5 text-[black] font-semibold">
              Notification Manager
              <br />
              <span className="text-[15px] text-[#525252]">
                Edit , Delete or push notification
              </span>
            </div>
            <div className="flex justify-center items-center gap-5">
              <div>
                <img
                  src={deletebtn}
                  alt=""
                  className="cursor-pointer"
                  onClick={() => setDelete(true)}
                />
              </div>
              {isDelete &&
                          <>
                            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
                              <div className="relative w-auto my-6 mx-auto max-w-5xl">
                                <div className="border-1 border-[#CACACA] rounded-lg relative py-4 flex flex-col w-[400px] h-[200px] bg-white outline-none focus:outline-none">
                                  <div className="text-center font-semibold text-[20px]">
                                    Confirm Delete Notification ?
                                  </div>
                                  <hr className="my-6" />

                                  <div className="flex justify-center mt-5">
                                    <button onClick={(e)=>handledelete(selectedNotification)} className="w-[120px] h-[40px]  text-black font-bold rounded-lg">
                                      Yes
                                    </button>
                                    <button
                                      onClick={() => setDelete(false)}
                                      className="w-[120px] h-[40px] bg-[#0F2C64] text-white font-bold rounded-lg"
                                    >
                                      Not Now
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="opacity-10 fixed inset-0 z-40 bg-black"></div>
                          </>
}
            </div>
          </div>
          <hr />
          <div >
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-black font-semibold">
                  Notification Title
                </span>

                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="placeholder:block w-[500px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-black font-semibold">
                  Notification Status
                </span>
                <button
                  onClick={() =>
                   { 
                    // handleEnableDisableNotification(selectedItemId, true)
                    setSelect(true)
                  }
                  }
                  className={isSelect ? "bg-[#0F2C64] p-1 pl-10 pr-10 rounded text-white flex justify-center items-center gap-2" : "bg-white p-1 pl-10 pr-10 rounded text-[#0F2C64] flex justify-center items-center gap-2 border border-[#0F2C64]"}
                >
                  Enable
                </button>
                <button
                  onClick={() =>
                    { 
                      // handleEnableDisableNotification(selectedItemId, false)
                      setSelect(false)
                    }
                  }
                  className={!isSelect ? "bg-[#0F2C64] p-1 pl-10 pr-10 rounded text-white flex justify-center items-center gap-2" : "bg-white p-1 pl-10 pr-10 rounded text-[#0F2C64] flex justify-center border border-[#0F2C64] items-center gap-2"}
                >
                  Disable
                </button>
              </div>
            </div>

            <div className="flex justify-between">
              <div>
                <div className="text-black font-semibold ">
                  Notification Content
                </div>
                <input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-[700px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <div className="flex mt-3 gap-2">
                  <button className="border-[#ABABAB] border p-2 pl-3 pr-3 rounded text-[#ABABAB] flex justify-center items-center gap-2">
                    Cancel
                  </button>
                  <button
                   onClick={handleCreateNotification}
                    className="bg-[#0F2C64]  p-2 pl-3 pr-3 rounded text-white flex justify-center items-center gap-2"
                  >
                    Save
                  </button>
                </div>
              </div>
              <div>
                <div className="text-black font-semibold">Date Added</div>
                <input
                  type="date"
                  className="w-[150px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>

          <div className="mt-10 ml-1 mr-1">
            <table className="w-full border-collapse border border-slate-400 ... ">
              <thead>
                <tr>
                  <th className="w-[20px] text-[#6D6D6D] border border-slate-300 ...">
                    {/* <input type="checkbox" /> */}
                  </th>
                  <th className="text-center text-[#6D6D6D] w-[300px] border border-slate-300 ...">
                    Notification Title
                  </th>
                  <th className="w-[300px] text-center text-[#6D6D6D] border border-slate-300 ...">
                    Notification Content
                  </th>

                  <th className="w-[200px] text-center text-[#6D6D6D] border border-slate-300 ...">
                    Notification Status
                  </th>

                  <th className="w-[150px] text-center text-[#6D6D6D] border border-slate-300 ...">
                    Date Added
                  </th>
                  <th className="w-[100px] text-center text-[#6D6D6D] border border-slate-300 ...">
                    {/* Edit or Push */} Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {!!data?.length && data?.map((item) => (
                  <tr className="" key={item._id}>
                    <td className="text-center p-5 border border-slate-300 ...">
                      <input
                        type="checkbox"
                        onChange={() => handleCheckboxChange(item._id, item.id)}
                        checked={selectedNotification.includes(item._id)}
                      />
                    </td>
                    <td className="w-[200px] text-center border border-slate-300 ...">
                      {item.title}
                    </td>
                    <td className="w-[200px] text-center border border-slate-300 ...">
                      {item.message}
                    </td>

                    <td className="w-[50px] text-center border border-slate-300 ..."></td>

                    <td className="w-[50px] text-center border border-slate-300 ...">
                      {getDateFromISOString(item.createdAt)}
                    </td>
                    <td className="w-[50px] text-center border border-slate-300 ...">
                      <span className="flex gap-1 justify-center">
                        <img src={bell} alt="" />
                        {/* <img src={editicon} alt="" /> */}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default Notification;
