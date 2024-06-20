import { FaSearch } from "react-icons/fa";
import userimage from "../Assets/userimage.svg";
import { useState } from "react";
const History = () => {
  const [selectedDiv, setSelectedDiv] = useState("Case History");

  return (
    <div>
      <div className="flex  justify-between items-center pt-5 ml-5 mr-5 mb-5">
        <div className="text-2xl mb-5  text-black font-semibold">History</div>

        <div className="relative mt-2 rounded-md">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="bg-[#0F2C64] p-2.5  ml-[-3px] rounded-l-full text-white">
              <FaSearch />
            </span>
          </div>
          <input
            type="text"
            className="placeholder: ml-2 block w-[250px] rounded-3xl border-0 py-1.5 pl-10 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Search Transactions"
          />
        </div>
      </div>
      <hr />
      <div className="flex mt-5 ml-5 mb-2 gap-10 ">
        <div
          className={`cursor-pointer ${
            selectedDiv === "Case History"
              ? "underline text-[#0F2C64] underline-offset-8"
              : ""
          }`}
          onClick={() => setSelectedDiv("Case History")}
        >
          Case History
        </div>
        <div
          className={`cursor-pointer ${
            selectedDiv === "Payment History"
              ? "underline text-[#0F2C64] underline-offset-8"
              : ""
          }`}
          onClick={() => setSelectedDiv("Payment History")}
        >
          Payment History
        </div>
        <div
          className={`cursor-pointer ${
            selectedDiv === "Call history"
              ? "underline text-[#0F2C64] underline-offset-8"
              : ""
          }`}
          onClick={() => setSelectedDiv("Call history")}
        >
          Call history
        </div>
        <div
          className={`cursor-pointer ${
            selectedDiv === "Chat history"
              ? "underline text-[#0F2C64] underline-offset-8"
              : ""
          }`}
          onClick={() => setSelectedDiv("Chat history")}
        >
          Chat history
        </div>
      </div>
      <hr />

      <div className="mt-5">
        {selectedDiv && (
          <div>
            {selectedDiv === "Case History" && (
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="w-[200px] text-left text-[#0F2C64]">
                      Invoice ID
                    </th>
                    <th className="w-[250px] text-left text-[#0F2C64]">Date</th>
                    <th className="w-[200px] text-left text-[#0F2C64]">
                      Case To
                    </th>
                    <th className="text-left text-[#0F2C64] w-[200px]">
                      Case by
                    </th>
                    <th className="w-[100px] text-center text-[#0F2C64]">
                      Location
                    </th>

                    <th className="w-[200px] text-center text-[#0F2C64]">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t-2 border-b-2 m-5">
                    <td className="text-left">#12482834832</td>
                    <td className="text-left">12:33 pm. 13 Nov, 2023</td>
                    <td className="text-left">
                      {" "}
                      <div className="flex items-center gap-2">
                        <img src={userimage} alt="" />
                        john
                      </div>
                    </td>
                    <td className="w-[200px] text-left">
                      {" "}
                      <div className="flex items-center gap-2">
                        <img src={userimage} alt="" />
                        john
                      </div>
                    </td>

                    <td className="text-center">gujrat</td>

                    <td className=" text-center ">
                      <span className="bg-[#D9FFD8] text-[#06FA00] rounded-2xl p-2 ">
                        Done
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            )}

            {selectedDiv === "Payment History" && (
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="w-[200px] text-left text-[#0F2C64]">
                      Invoice ID
                    </th>
                    <th className="w-[250px] text-left text-[#0F2C64]">Date</th>
                    <th className="w-[200px] text-left text-[#0F2C64]">
                      Recipient
                    </th>
                    <th className="text-left text-[#0F2C64] w-[200px]">
                      Payment by
                    </th>
                    <th className="w-[100px] text-center text-[#0F2C64]">
                      Location
                    </th>
                    <th className="w-[100px] text-center text-[#0F2C64]">
                      Type
                    </th>
                    <th className="w-[100px] text-center text-[#0F2C64]">
                      Amount
                    </th>

                    <th className="w-[200px] text-center text-[#0F2C64]">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t-2 border-b-2 m-5">
                    <td className="text-left">#12482834832</td>
                    <td className="text-left">12:33 pm. 13 Nov, 2023</td>
                    <td className="text-left">
                      {" "}
                      <div className="flex items-center gap-2">
                        <img src={userimage} alt="" />
                        john
                      </div>
                    </td>
                    <td className="w-[200px] text-left">
                      {" "}
                      <div className="flex items-center gap-2">
                        <img src={userimage} alt="" />
                        john
                      </div>
                    </td>

                    <td className="text-center">gujrat</td>
                    <td className="text-center">Added</td>
                    <td className="text-center">Rs.500</td>

                    <td className=" text-center ">
                      <span className="bg-[#D9FFD8] text-[#06FA00] rounded-2xl p-2 ">
                        Completed
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
            {selectedDiv === "Call history" && (
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="w-[200px] text-left text-[#0F2C64]">
                      Invoice ID
                    </th>
                    <th className="w-[250px] text-left text-[#0F2C64]">Date</th>
                    <th className="w-[200px] text-left text-[#0F2C64]">
                      Called To
                    </th>
                    <th className="text-left text-[#0F2C64] w-[200px]">
                      Called by
                    </th>
                    <th className="w-[100px] text-center text-[#0F2C64]">
                      Location
                    </th>

                    <th className="w-[200px] text-center text-[#0F2C64]">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t-2 border-b-2 m-5">
                    <td className="text-left">#12482834832</td>
                    <td className="text-left">12:33 pm. 13 Nov, 2023</td>
                    <td className="text-left">
                      {" "}
                      <div className="flex items-center gap-2">
                        <img src={userimage} alt="" />
                        john
                      </div>
                    </td>
                    <td className="w-[200px] text-left">
                      {" "}
                      <div className="flex items-center gap-2">
                        <img src={userimage} alt="" />
                        john
                      </div>
                    </td>

                    <td className="text-center">gujrat</td>

                    <td className=" text-center ">
                      <span className="bg-[#D9FFD8] text-[#06FA00] rounded-2xl p-2 ">
                        Done
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
            {selectedDiv === "Chat history" && (
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="w-[200px] text-left text-[#0F2C64]">
                      Invoice ID
                    </th>
                    <th className="w-[250px] text-left text-[#0F2C64]">Date</th>
                    <th className="w-[200px] text-left text-[#0F2C64]">
                      Chat To
                    </th>
                    <th className="text-left text-[#0F2C64] w-[200px]">
                      Chat by
                    </th>
                    <th className="w-[100px] text-center text-[#0F2C64]">
                      Location
                    </th>

                    <th className="w-[200px] text-center text-[#0F2C64]">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t-2 border-b-2 m-5">
                    <td className="text-left">#12482834832</td>
                    <td className="text-left">12:33 pm. 13 Nov, 2023</td>
                    <td className="text-left">
                      {" "}
                      <div className="flex items-center gap-2">
                        <img src={userimage} alt="" />
                        john
                      </div>
                    </td>
                    <td className="w-[200px] text-left">
                      {" "}
                      <div className="flex items-center gap-2">
                        <img src={userimage} alt="" />
                        john
                      </div>
                    </td>

                    <td className="text-center">gujrat</td>

                    <td className=" text-center ">
                      <span className="bg-[#DFDFDF] rounded-2xl p-2 ">
                        2 days ago
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
