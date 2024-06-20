import userimage from "../Assets/userimage.svg";
import timer from "../Assets/timer.svg";
import axios from "axios";
import { Baseurl } from "../utlis/apiservices";
import config, { headers } from "../utlis/config";
import { useEffect, useState } from "react";

const Booking = () => {
  const [selectedDiv, setSelectedDiv] = useState("Upcoming");
  const [upcomingdata, setUpcomingdata] = useState("");
  const [cancelleddata, setCancelleddata] = useState("");

  //////////fetch upcomingbooking//////////
  function fetchupcomingbooking() {
    axios
      .get(`${Baseurl}/api/v1/admin/upcomingAppointment`, {
        headers: headers,
      })
      .then((response) => {
        setUpcomingdata(response.data);
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    fetchupcomingbooking();
  }, []);

  //////////fetch pastbooking//////////
  function fetchpastbooking() {
    axios
      .get(`${Baseurl}`, {
        headers: headers,
      })
      .then((response) => {
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    fetchpastbooking();
  }, []);

  //////////fetch cancelledbooking//////////
  function fetchcancelledbooking() {
    axios
      .get(`${Baseurl}/api/v1/admin/allCancelAppointment`, {
        headers: headers,
      })
      .then((response) => {
        console.log(response.data);
        setCancelleddata(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
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
            className={`cursor-pointer ${
              selectedDiv === "past"
                ? "underline text-[#0F2C64] underline-offset-8"
                : ""
            }`}
          >
            past
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

                    <th className="w-[150px] text-center text-[#0F2C64]">
                      Reason
                    </th>
                    <th className="w-[150px] text-center text-[#0F2C64]"></th>
                  </tr>
                </thead>
                <tbody>
                  {upcomingdata?.data?.map((item) => (
                    <tr
                      className="border-t-2 border-b-2 m-5 h-[80px]"
                      key={item._Id}
                    >
                      <td className="text-left">
                        <div className="flex items-center gap-2">
                          <img src={userimage} alt="" />
                          john
                        </div>
                      </td>
                      <td className="w-[200px] text-center">
                        {item.userId?.fullName}
                      </td>

                      <td className="text-center">
                        {item.userId?.languageKnow}
                      </td>
                      <td className="text-center">Time 12:00</td>
                      <td className="w-[50px] text-center">
                        {item.userId?.state}
                      </td>
                      <td className="w-[50px] text-center">Marriage Problem</td>
                      <td className=" text-center ">
                        <span className="bg-[#EDEDED] text-[#0F2C64] rounded-2xl w-[150px] pl-2 flex gap-1 ">
                          <img src={timer} alt="" />
                          10 min booked
                        </span>
                      </td>
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

                    <th className="w-[150px] text-center text-[#0F2C64]">
                      Cancelled Reason
                    </th>
                    <th className="w-[150px] text-center text-[#0F2C64]"></th>
                  </tr>
                </thead>
                <tbody>
                  {cancelleddata?.data?.map((item) => (
                    <tr
                      className="border-t-2 border-b-2 m-5 h-[80px]"
                      key={item._Id}
                    >
                      <td className="text-left">
                        <div className="flex items-center gap-2">
                          <img src={userimage} alt="" />
                          john
                        </div>
                      </td>
                      <td className="w-[200px] text-center">
                        {item.case.caseNumber}
                      </td>

                      <td className="text-center">{item.case.caseTitle}</td>
                      <td className="text-center">Time 12:00</td>
                      <td className="w-[50px] text-center">
                        {item.userId?.state}
                      </td>
                      <td className="w-[50px] text-center">Marriage Problem</td>
                      <td className=" text-center ">
                        <span className="bg-[#EDEDED] text-[#0F2C64] rounded-2xl w-[150px] pl-2 flex gap-1 ">
                          <img src={timer} alt="" />
                          10 min booked
                        </span>
                      </td>
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
