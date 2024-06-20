import { FaSearch } from "react-icons/fa";
import userimage from "../Assets/userimage.svg";
import { useEffect, useState } from "react";
import axios from "axios";
import { Baseurl } from "../utlis/apiservices";
import config, { headers } from "../utlis/config";

const Meeting = () => {
  const [Visible, setVisible] = useState(false);
  const [data, setdata] = useState("");


  //////////fetch previousmeetnig//////////
  function fetchpreviousmeetnig() {
    axios
      .get(`${Baseurl}`, {
        headers: headers,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    fetchpreviousmeetnig();
  }, []);

  
   //////////fetch upcomingmeetnig//////////
   function fetchupcomingmeetnig() {
    axios
      .get(`${Baseurl}`, {
        headers: headers,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    fetchupcomingmeetnig();
  }, []);

  return (
    <>
      {Visible ? (
        <>
          <div>
            <div className="flex justify-between">
              <div className="text-3xl font-semibold">All Meeting</div>
              <div>
                <div className="flex justify-center items-center gap-5">
                  <div className="relative mt-2 rounded-md">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <span className="bg-[#0F2C64] p-2.5  ml-[-3px] rounded-l-full text-white">
                        <FaSearch />
                      </span>
                    </div>
                    <input
                      type="text"
                      className="placeholder: ml-2 block w-[250px] rounded-3xl border-0 py-1.5 pl-10 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="Search Meeting"
                    />
                  </div>
                  <button
                    className=" bg-[#0F2C64] p-2 pl-5 pr-5 rounded-3xl text-white"
                    onClick={() => setVisible(true)}
                  >
                    Previous Meeting
                  </button>
                  <button
                    className="bg-[#0F2C64] p-2 pl-5 pr-5 rounded-3xl text-white"
                    onClick={() => setVisible(false)}
                  >
                    Upcoming Meeting
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-5">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left text-[#0F2C64]">
                      Meeting ID
                    </th>
                    <th className="text-left text-[#0F2C64] w-[200px]">Date</th>
                    <th className=" text-left text-[#0F2C64]">
                      Attendant
                    </th>
                    <th className="  text-left text-[#0F2C64]">
                      Conducted By
                    </th>
                    <th className="text-center text-[#0F2C64]">
                      Location
                    </th>

                    <th className=" text-center text-[#0F2C64]">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t-2 border-b-2 m-5 h-[80px]">
                    <td className="text-left">#12482834832</td>
                    <td className="text-left">
                      12:33 pm. 13 Nov, 2023
                    </td>

                    <td>
                      <div className="flex items-center gap-2">
                        <img src={userimage} alt="" />
                        john
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <img src={userimage} alt="" />
                        john
                      </div>
                    </td>
                    <td className="w-[50px] text-center">gujrat,india</td>
                    <td className=" text-center ">
                      <span className="bg-[#D9D9D9] text-black rounded-2xl px-4 py-1">
                        held on 12:30pm
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <>
          <div>
            <div className="flex justify-between">
              <div className="text-3xl font-semibold">All Meeting</div>
              <div>
                <div className="flex justify-center items-center gap-5">
                  <div className="relative mt-2 rounded-md">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <span className="bg-[#0F2C64] p-2.5  ml-[-3px] rounded-l-full text-white">
                        <FaSearch />
                      </span>
                    </div>
                    <input
                      type="text"
                      className="placeholder: ml-2 block w-[250px] rounded-3xl border-0 py-1.5 pl-10 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="Search Meeting"
                    />
                  </div>
                  <button
                    className=" bg-[#0F2C64] p-2 pl-5 pr-5 rounded-3xl text-white"
                    onClick={() => setVisible(true)}
                  >
                    Previous Meeting
                  </button>
                  <button className="bg-[#0F2C64] p-2 pl-5 pr-5 rounded-3xl text-white">
                    Upcoming Meeting
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-5">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="w-[200px] text-left text-[#0F2C64]">
                      Meeting ID
                    </th>
                    <th className="text-left text-[#0F2C64] w-[200px]">Date</th>
                    <th className=" text-left text-[#0F2C64]">
                      Attendant
                    </th>
                    <th className="  text-left text-[#0F2C64]">
                      Conducted By
                    </th>
                    <th className=" text-center text-[#0F2C64]">
                      Location
                    </th>

                    <th className=" text-center text-[#0F2C64]">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t-2 border-b-2 m-5 h-[80px]">
                    <td className="text-left">#12482834832</td>
                    <td className="text-left">
                      12:33 pm. 13 Nov, 2023
                    </td>

                    <td>
                      <div className="flex items-center gap-2">
                        <img src={userimage} alt="" />
                        john
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <img src={userimage} alt="" />
                        john
                      </div>
                    </td>
                    <td className="text-center">gujrat,india</td>
                    <td className=" text-center ">
                      <span className="bg-[#D8E3FF] text-[#094DB3] rounded-2xl p-2">
                        on 12:30pm
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Meeting;
