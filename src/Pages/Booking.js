import userimage from "../Assets/userimage.svg";
import timer from "../Assets/timer.svg";
import axios from "axios";
import { Baseurl } from "../utlis/apiservices";
import config, { headers } from "../utlis/config";
import { useEffect, useState } from "react";
import { fetchApiData } from "../utlis";

const Booking = () => {
  const [selectedDiv, setSelectedDiv] = useState("Upcoming");
  const [upcomingdata, setUpcomingdata] = useState("");
  const [pastData, setPastdata] = useState("");
  const [cancelleddata, setCancelleddata] = useState("");

  //////////fetch upcomingbooking//////////
  async function fetchupcomingbooking() {

    const data = await fetchApiData(`${Baseurl}/api/v1/admin/upcomingAppointment`)
    console.log(data?.data)
    setUpcomingdata(data?.data);

  }


  //////////fetch pastbooking//////////
  async function fetchpastbooking() {

    const data = await fetchApiData(`${Baseurl}/api/v1/admin/pastAppointment`)
    setPastdata(data?.data);
    
  }
 

  //////////fetch cancelledbooking//////////
  async function fetchcancelledbooking() {
    const data = await fetchApiData(`${Baseurl}/api/v1/admin/allCancelAppointment`)
    setCancelleddata(data?.data);
  
  }
  useEffect(() => {
    fetchupcomingbooking();
    fetchpastbooking();
    fetchcancelledbooking();
  }, []);
  return (
    <div className="pt-5 ml-5 mr-5">
      <div className="text-2xl mb-5 text-[black] font-semibold ">Bookings</div>
      <div>
        <hr />
        <div className="flex gap-10 ml-8 mt-3 mb-3">
          <div
            className={`cursor-pointer ${
              selectedDiv === "Upcoming"
                ? "underline text-[#0F2C64] underline-offset-8"
                : ""
            }`}
            onClick={() => setSelectedDiv("Upcoming")}
          >
            Upcoming
          </div>
          <div
            onClick={() => setSelectedDiv("Past")}
            className={`cursor-pointer ${
              selectedDiv === "Past"
                ? "underline text-[#0F2C64] underline-offset-8"
                : ""
            }`}
          >
            Past
          </div>
          <div
            onClick={() => setSelectedDiv("Cancelled")}
            className={`cursor-pointer ${
              selectedDiv === "Cancelled"
                ? "underline text-[#0F2C64] underline-offset-8"
                : ""
            }`}
          >
            Cancelled
          </div>
        </div>
        <hr />
      </div>
      {selectedDiv && (
        <div>
          {selectedDiv === "Upcoming" && (
            <div className="mt-5">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="w-[150px] text-left text-[#0F2C64]">
                      Consulted Name
                    </th>
                    <th className="text-center text-[#0F2C64] w-[150px]">
                      Advocate Name
                    </th>
                    <th className="w-[150px] text-center text-[#0F2C64]">
                      Languages
                    </th>
                    <th className=" w-[100px] text-center text-[#0F2C64]">
                      Time
                    </th>
                    <th className=" w-[100px] text-center text-[#0F2C64]">
                      Location
                    </th>

                    {/* <th className="w-[150px] text-center text-[#0F2C64]">
                      Reason
                    </th> */}
                    <th className="w-[150px] text-center text-[#0F2C64]"></th>
                  </tr>
                </thead>
                <tbody>
                  {!!upcomingdata?.length && upcomingdata?.map((item) => (
                    <tr
                      className="border-t-2 border-b-2 m-5 h-[80px]"
                      key={item._Id}
                    >
                      <td className="text-left">
                        <div className="flex items-center gap-2">
                          <img src={item?.userId?.image} alt="" className="w-[42px] h-[42px] rounded-full" />
                          {item?.userId?.fullName || item?.userId?.firstName + " " + item?.userId?.lastName}
                        </div>
                      </td>
                      <td className="w-[200px] text-center">
                        {item.lawyer?.fullName || item?.lawyer?.firstName + " " + item?.lawyer?.lastName}
                      </td>

                      <td className="text-center">
                        {item.userId?.languageKnow}
                      </td>
                      <td className="text-center">Time {item?.appointmentTime}</td>
                      <td className="w-[50px] text-center">
                        {item.userId?.state}
                      </td>
                      {/* <td className="w-[50px] text-center">Marriage Problem</td> */}
                      <td className=" text-center ">
                        {/* <span className="bg-[#EDEDED] text-[#0F2C64] rounded-2xl w-[150px] pl-2 flex gap-1 ">
                          <img src={timer} alt="" />
                          10 min booked
                        </span> */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {selectedDiv === "Past" && (
            <div className="mt-5">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="w-[150px] text-left text-[#0F2C64]">
                      Consulted Name
                    </th>
                    <th className="text-center text-[#0F2C64] w-[150px]">
                      Advocate Name
                    </th>
                    <th className="w-[150px] text-center text-[#0F2C64]">
                      Languages
                    </th>
                    <th className=" w-[100px] text-center text-[#0F2C64]">
                      Time
                    </th>
                    <th className=" w-[100px] text-center text-[#0F2C64]">
                      Location
                    </th>
{/* 
                    <th className="w-[150px] text-center text-[#0F2C64]">
                      Cancelled Reason
                    </th> */}
                    <th className="w-[150px] text-center text-[#0F2C64]"></th>
                  </tr>
                </thead>
                <tbody>
                  {!!pastData?.length && pastData?.map((item) => (
                    <tr
                      className="border-t-2 border-b-2 m-5 h-[80px]"
                      key={item._Id}
                    >
                      <td className="text-left">
                        <div className="flex items-center gap-2">
                          <img src={item?.userId?.image} alt="" className="w-[42px] h-[42px] rounded-full" />
                          {item?.userId?.fullName || item?.userId?.firstName + " " + item?.userId?.lastName}
                        </div>
                      </td>
                      <td className="w-[200px] text-center">
                      {item.lawyer?.fullName || item?.lawyer?.firstName + " " + item?.lawyer?.lastName}
                      </td>

                      <td className="text-center"> {item.userId?.languageKnow}</td>
                      <td className="text-center">Time  {item?.appointmentTime}</td>
                      <td className="w-[50px] text-center">
                        {item.userId?.state}
                      </td>
                      {/* <td className="w-[50px] text-center">Marriage Problem</td> */}
                      {/* <td className=" text-center ">
                        <span className="bg-[#EDEDED] text-[#0F2C64] rounded-2xl w-[150px] pl-2 flex gap-1 ">
                          <img src={timer} alt="" />
                          10 min booked
                        </span>
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {selectedDiv === "Cancelled" && (
            <div className="mt-5">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="w-[150px] text-left text-[#0F2C64]">
                      Consulted Name
                    </th>
                    <th className="text-center text-[#0F2C64] w-[150px]">
                      Advocate Name
                    </th>
                    <th className="w-[150px] text-center text-[#0F2C64]">
                      Languages
                    </th>
                    <th className=" w-[100px] text-center text-[#0F2C64]">
                      Time
                    </th>
                    <th className=" w-[100px] text-center text-[#0F2C64]">
                      Location
                    </th>

                    {/* <th className="w-[150px] text-center text-[#0F2C64]">
                      Cancelled Reason
                    </th> */}
                    <th className="w-[150px] text-center text-[#0F2C64]"></th>
                  </tr>
                </thead>
                <tbody>
                  {!!cancelleddata?.length && cancelleddata?.map((item) => (
                    <tr
                      className="border-t-2 border-b-2 m-5 h-[80px]"
                      key={item._Id}
                    >
                      <td className="text-left">
                        <div className="flex items-center gap-2">
                          <img src={item?.userId?.image} alt="" className="w-[42px] h-[42px] rounded-full"  />
                          {item?.userId?.fullName || item?.userId?.firstName + " " + item?.userId?.lastName}
                        </div>
                      </td>
                      <td className="w-[200px] text-center">
                      {item.lawyer?.fullName || item?.lawyer?.firstName + " " + item?.lawyer?.lastName}
                      </td>

                      <td className="text-center">{item.userId?.languageKnow}</td>
                      <td className="text-center">Time {item?.appointmentTime}</td>
                      <td className="w-[50px] text-center">
                        {item.userId?.state}
                      </td>
                      {/* <td className="w-[50px] text-center">Marriage Problem</td> */}
                      {/* <td className=" text-center ">
                        <span className="bg-[#EDEDED] text-[#0F2C64] rounded-2xl w-[150px] pl-2 flex gap-1 ">
                          <img src={timer} alt="" />
                          10 min booked
                        </span>
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Booking;
