import React, { useEffect, useState } from "react";
import userreview from "../Assets/dashboard/userreview.svg";
import { IoIosStar } from "react-icons/io";
import { Link } from "react-router-dom";
import axios from "axios";
import { Baseurl } from "../utlis/apiservices";
import { headers } from "../utlis/config";
import Spinner from "../utlis/Spinner";
import userimage from "../Assets/userimage.svg";
import { currentDate, fetchApiData } from "../utlis";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [dashboard, setdashboard] = useState("");
  const [Transactions, setTransaction] = useState("");
  const [ratings, setRatings] = useState("");

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
              <div className="box-shadow rounded-xl mb-[200px] mt-5 p-5">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="w-[200px] text-center ">Name</th>

                      <th className="w-[200px] text-center ">Date</th>

                      <th className="w-[200px] text-center ">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!!Transactions?.length && Transactions?.map((item) => (
                      <tr className="h-[40px] border-b">
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
