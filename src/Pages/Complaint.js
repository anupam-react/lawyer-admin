import React from "react";
import { FaSearch } from "react-icons/fa";
import goback from "../Assets/goback.svg";
import userimage from "..//Assets/userimage.svg";
import { FaStar } from "react-icons/fa";
const Complaint = () => {
  return (
    <div className="rounded h-[700px]">
      <div className="flex  justify-between items-center pt-5 ml-5 mr-5">
        <div className="text-2xl mb-5  text-black font-semibold">
          Total Complaints
        </div>

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
              placeholder="Search Feedback"
            />
          </div>
          <button className="text-[#0F2C64] pr-1 rounded bg-white border border-[#0F2C64] flex items-center">
            <img
              src={goback}
              alt="goback"
              className="mr-2 bg-[#0F2C64] p-1.5"
            />
            Go Back
          </button>
        </div>
      </div>

      <div className="mb-[200px] mt-5 ">
        <table className="w-full">
          <thead>
            <tr>
              <th className="w-[400px] text-left text-[#6D6D6D]">Complaints</th>
              <th className="text-left text-[#6D6D6D] w-[150px]">Subject</th>
              <th className="w-[150px] text-left text-[#6D6D6D]">Ratings</th>
              <th className=" w-[150px] text-center text-[#6D6D6D]">
                Reviewd/ Not Reviewed
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="shadow-lg bg-[white]">
              <td className="text-left">
                <div className="flex gap-2">
                  <img src={userimage} alt="" />
                  <div className="">
                    <div>
                      John Doe{" "}
                      <span className="text-[#808080]">
                        12:33 pm. 13 Nov, 2023
                      </span>
                    </div>
                    <div className=" mt-1">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Maecenas vulputate turpis elit, quis pellentesque ante
                      bibendum nec.
                    </div>
                  </div>
                </div>
              </td>
              <td className="text-left">Lorem ipsum dolor sit.</td>

              <td className="text-left flex items-center">
                <div>4.5</div>

                <div className="flex">
                  <FaStar style={{ color: "#FFB800" }} />
                  <FaStar style={{ color: "#FFB800" }} />
                  <FaStar style={{ color: "#FFB800" }} />
                  <FaStar style={{ color: "#FFB800" }} />
                  <FaStar style={{ color: "#FFB800" }} />
                </div>
              </td>
              <td className="text-center">
                <input type="checkbox" className="w-[18px] h-[18px]" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Complaint;
