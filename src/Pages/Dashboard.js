import React, { useEffect, useState } from "react";
import userreview from "../Assets/dashboard/userreview.svg";
import { IoIosStar } from "react-icons/io";
import { Link } from "react-router-dom";
import axios from "axios";
import { Baseurl } from "../utlis/apiservices";
import { headers } from "../utlis/config";
import Spinner from "../utlis/Spinner";
import userimage from "../Assets/userimage.svg";
import { createApiData, currentDate, fetchApiData } from "../utlis";
import { X } from "lucide-react";
import upload from "../Assets/upload.svg";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [dashboard, setdashboard] = useState("");
  const [Transactions, setTransaction] = useState("");
  const [ratings, setRatings] = useState("");
  const [status, setStatus] = useState("PENDING");
  const [image, setImage] = useState("");
  const [addservice, setaddserveice] = useState(false);

  ///////fecting dashboard///////
 async function fetchdashboard() {
    const data = await fetchApiData(`${Baseurl}/api/v1/admin/dashboard`)
    setdashboard(data.data);
  }
  console.log(dashboard)

  ///////fecting Transaction///////
 async function fetchtransaction() {
    const data = await fetchApiData(`${Baseurl}/api/v1/user/allTransaction`)
    setTransaction(data?.data?.reverse());
   
  }

  ///////fecting Ratings///////
 async function fetchRatings() {

    const data =  await fetchApiData(`${Baseurl}/api/v1/user/allRating`)
    setRatings(data.data);
  }

  const handleApprove = async(id) => {
    console.log(id)
    const formData = new FormData();
    formData.append("image", image);
    formData.append("status", status);
 
    try {
      await createApiData(
       `${Baseurl}/api/v1/admin/withdrawApprove/${id}`,
       formData
      );
      setaddserveice(false);

    } catch (error) {
      console.error("Error adding data:", error);
    }

    
  };
  useEffect(() => {
    fetchtransaction();
    fetchdashboard();
    fetchRatings();
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
           {addservice ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
            <div className="relative w-auto my-6 mx-auto max-w-5xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-[600px] bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 rounded-t">
                  <h3 className="text-xl font-semibold">
                    Approve Form
                  
                  </h3>

                  <span
                    onClick={() => setaddserveice(false)}
                    className="cursor-pointer"
                  >
                    <X />
                  </span>
                </div>
                <div >
                  <div className=" justify-center flex">
                    <div>
                      <label>Status</label>
                      <br />
                      <select name="" id="" onChange={(e)=> setStatus(e.target.value)} value={status}  className="placeholder: block w-[264px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
        
                    <option value="PENDING">PENDING</option>
                    <option value="PAID">PAID</option>
                    <option value="FAILED">FAILED</option>

              </select>
                    </div>
                  </div>
                

                  <div className="mt-4 flex flex-col items-center text-left justify-center">
                    <div className="">Upload Image</div>
                    <div className="bg-[#E6EEFD] h-[150px] w-[533px]  rounded-xl">
                      <div className="p-5 relative rounded-lg h-[200px]">
                        <div className="flex flex-col justify-center text-center mt-3">
                          <label>
                            <input
                              className="text-sm cursor-pointer w-36 hidden"
                              type="file"
                          
                              onChange={(e) => setImage(e.target.files[0])}
                            />
                            <div className="flex justify-center">
                              <img src={upload} alt="" className="w-[50px]" />
                            </div>
                          </label>

                          <div className="title text-[#0B50B3]">
                          {image?.name || " upload Image From Device /Browser"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                 

                  <div className="flex justify-end gap-5 m-5">
                    <div
                      className="text-[#0F2C64] p-2 pl-5 pr-5 rounded bg-white border border-[#0F2C64] cursor-pointer"
                      onClick={() => setaddserveice(false)}
                    >
                      Cancel
                    </div>
                    <button
                      onClick={()=>handleApprove(addservice)}
                      className="bg-[#0F2C64] p-2 pl-5 pr-5 rounded text-white flex justify-center cursor-pointer items-center gap-2"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
          <div>
            <div className="flex flex-wrap gap-10 justify-start">
              <Link to="/Lawyers">
                <div className="w-[350px] pb-2 shadow-lg">
                  <div className="text-2xl font-medium mt-5 ml-5">
                    Total Lawyers
                  </div>
                  <hr />
                  <span className="flex justify-center text-4xl font-semibold mt-2">
                    {dashboard?.totalLawyer}
                  </span>
                  <div className="flex justify-between ml-2 mr-2 mt-14">
                    <div className="flex items-center gap-1">
                      <div className="bg-[#E6EEFF] rounded-full flex justify-center items-center w-[30px] h-[30px]">
                        {dashboard?.oldLawyer}
                      </div>
                      old lawyers
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="bg-[#E6EEFF] rounded-full flex justify-center items-center w-[30px] h-[30px]">
                        {dashboard?.newLawyer}
                      </div>
                      New lawyers
                    </div>
                  </div>
                </div>
              </Link>
              <Link to="/totalusers">
                <div className="w-[350px] pb-2 shadow-lg">
                  <div className="text-2xl font-medium mt-5 ml-5">
                    Total Users
                  </div>
                  <hr />
                  <span className="flex justify-center text-4xl font-semibold mt-2">
                    {dashboard?.totalUser}
                  </span>
                  <div className="flex justify-between ml-2 mr-2 mt-14">
                    <div className="flex items-center gap-1">
                      <div className="bg-[#E6EEFF] rounded-full flex justify-center items-center w-[30px] h-[30px]">
                        {dashboard?.newUser}
                      </div>
                      New User
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="bg-[#E6EEFF] rounded-full flex justify-center items-center w-[30px] h-[30px]">
                        {dashboard?.oldUser}
                      </div>
                      Old User
                    </div>
                  </div>
                </div>
              </Link>
              <Link to="/Booking">
                <div className="w-[350px] pb-2 shadow-lg">
                  <div className="text-2xl font-medium mt-5 ml-5">
                    Total Bookings
                  </div>
                  <hr />
                  <span className="flex justify-center text-4xl font-semibold mt-2">
                    {dashboard?.totalBooking}
                  </span>
                  <div className="flex justify-between ml-2 mr-2 mt-14">
                    <div className="flex items-center gap-1">
                      <div className="bg-[#E6EEFF] rounded-full flex justify-center items-center w-[30px] h-[30px]">
                        {dashboard?.oldBooking}
                      </div>
                      Done
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="bg-[#E6EEFF] rounded-full flex justify-center items-center w-[30px] h-[30px]">
                        {dashboard?.newBooking}
                      </div>
                      Upcoming
                    </div>
                  </div>
                </div>
              </Link>
              <Link to="/cases">
                <div className="w-[350px] pb-2 shadow-lg">
                  <div className="text-2xl font-medium mt-5 ml-5">
                    Total Cases
                  </div>
                  <hr />
                  <span className="flex justify-center text-4xl font-semibold mt-2">
                    {dashboard?.totalCases}
                  </span>
                  <div className="flex justify-between ml-2 mr-2 mt-14">
                    <div className="flex items-center gap-1">
                      <div className="bg-[#E6EEFF] rounded-full flex justify-center items-center w-[30px] h-[30px]">
                        {dashboard?.oldCases}
                      </div>
                      Old Cases
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="bg-[#E6EEFF] rounded-full flex justify-center items-center w-[30px] h-[30px]">
                        {dashboard?.newCases}
                      </div>
                      New Cases
                    </div>
                  </div>
                </div>
              </Link>
              <Link to="/services">
                <div className="w-[350px] pb-2 shadow-lg">
                  <div className="text-2xl font-medium mt-5 ml-5">
                    Total Services
                  </div>
                  <hr />
                  <span className="flex justify-center text-4xl font-semibold mt-2">
                    {dashboard?.totalService}
                  </span>
                  <div className="flex justify-between ml-2 mr-2 mt-14">
                    <div className="flex items-center gap-1">
                      <div className="bg-[#E6EEFF] rounded-full flex justify-center items-center w-[30px] h-[30px]">
                        {dashboard?.oldService}
                      </div>
                      Old Services
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="bg-[#E6EEFF] rounded-full flex justify-center items-center w-[30px] h-[30px]">
                        {dashboard?.newService}
                      </div>
                      New Services
                    </div>
                  </div>
                </div>
              </Link>
              <Link to="/department">
                <div className="w-[350px] pb-2 shadow-lg">
                  <div className="text-2xl font-medium mt-5 ml-5">
                    Total Departments
                  </div>
                  <hr />
                  <span className="flex justify-center text-4xl font-semibold mt-2">
                    {dashboard?.totalDepartment}
                  </span>
                  <div className="flex justify-between ml-2 mr-2 mt-14">
                    <div className="flex items-center gap-1">
                      <div className="bg-[#E6EEFF] rounded-full flex justify-center items-center w-[30px] h-[30px]">
                        {dashboard?.oldDepartment}
                      </div>
                      Old Departments
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="bg-[#E6EEFF] rounded-full flex justify-center items-center w-[30px] h-[30px]">
                        {dashboard?.newDepartment}
                      </div>
                      New Departments
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            <div className=" mt-5">
              <div className="text-2xl font-medium">Reviews</div>
              <div className="flex gap-10">
                {!!ratings?.length && ratings?.map((item,i) => (
                  <div className="w-[350px] h-[220px] shadow-lg" key={i}>
                    <div className="flex gap-2 ml-5 mt-5">
                      <img
                        src={item.userId?.image}
                        alt=""
                        className="w-[50px] h-[50px] rounded-full"
                      />
                      <div className="flex flex-col justify-start">
                        <div>{item.userId?.firstName}</div>
                        <div className="text-slate-400">Realesta</div>
                        <div className="flex">
                          {[...Array(item.rating)].map((_, index) => (
                            <IoIosStar
                              key={index}
                              style={{ color: "#FFB800" }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    <span className="flex justify-left m-3">
                      {item.comment}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className=" mt-5">
              <div className="flex justify-between items-center">
                <div className="text-2xl font-medium">Latest Transactions</div>

                {/* <div>
                  <select className="bg-[#0F2C64] text-white px-6 h-[50px] rounded-2xl">
                    <option>All Transactions</option>
                  </select>
                </div> */}
              </div>
              <div className="box-shadow rounded-xl mb-[200px] mt-5 p-5 h-[500px] overflow-scroll">
                <table className="w-full ">
                  <thead>
                    <tr>
                      <th className="w-[200px] text-center ">Name</th>

                      <th className="w-[200px] text-center ">Date</th>

                      <th className="w-[200px] text-center ">Amount</th>
                      <th className="w-[200px] text-center ">Account Number</th>
                      <th className="w-[200px] text-center ">IFSC</th>
                      <th className="w-[200px] text-center ">UPI Id</th>
                      <th className="w-[200px] text-center ">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!!Transactions?.length && Transactions?.map((item) => (
                      <tr className="h-[40px]  border-b">
                        <td>
                          <div className="text-center flex items-center justify-start gap-4 h-[60px]">
                            <img
                              src={item.user?.image}
                              alt=""
                              className="w-[40px] h-[40px] rounded-full"
                            />
                            <div className="flex flex-col ">
                              <span className="text-left font-bold text-[16px]">
                                {item.user?.fullName || item.user?.firstName + " " + item.user?.lastName}
                              </span>
                              <span className="text-[#0F2C64] text-left text-[12px]">
                                {item.user?.email}
                              </span>
                            </div>
                          </div>
                        </td>

                        <td className="w-[50px] text-center">{currentDate(item.date)}</td>

                        <td className="w-[50px] text-center text-[#26A843]">
                          {item.amount}
                        </td>
                        <td className="w-[50px] text-center text-[#26A843]">
                          {item.accountNumber}
                        </td>
                        <td className="w-[50px] text-center text-[#26A843]">
                          {item.ifsc}
                        </td>
                        <td className="w-[50px] text-center text-[#26A843]">
                          {item.upiId}
                        </td>
                        <td className="flex justify-center">
                          {item?.type === "Debit" && 
                          
                        <button
                        onClick={() => setaddserveice(item?._id)}
                      className="bg-[#0F2C64] cursor-pointer p-1 pl-5 pr-5 rounded text-white flex justify-center items-center gap-2"
                    >
                      Approve
                    </button>
                          }
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Dashboard;
