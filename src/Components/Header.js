import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { IoCloseSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import userprofile from "../Assets/Header/userprofile.svg";
import history from "../Assets/Header/history.svg";
import filterlogo from "../Assets/Header/filterlogo.svg";
import setting from "../Assets/Header/setting.svg";
import privacy from "../Assets/Header/privacy.svg";
import term from "../Assets/Header/term.svg";
import complaint from "../Assets/Header/complaint.svg";
import logout from "../Assets/Header/logout.svg";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { FaStar } from "react-icons/fa";
import helpandsupport from "../Assets/helpandsupport.svg";
import { fetchApiData } from "../utlis";
import { Baseurl } from "../utlis/apiservices";

const Header = () => {
  const [userDetails, setUserDetails] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setfilter] = useState(false);

  const fetchUser = async (id) => {
    const data = await fetchApiData(`${Baseurl}/api/v1/customer/getProfile`);
    console.log(data);
    setUserDetails(data?.data);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");

    navigate("/");
  };
  return (
    <>
      {filter ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
            <div className="relative w-auto my-6 mx-auto max-w-5xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 rounded-t">
                  <h3 className="text-xl text-[#0F2C64] font-semibold">
                    Sort and Filter
                  </h3>

                  <span
                    onClick={() => setfilter(false)}
                    className="cursor-pointer"
                  >
                    <X className="bg-[#0F2C64] text-white rounded-full" />
                  </span>
                </div>
                <div className="ml-5 text-[#1D1D1D]">Sort by Ratings</div>
                <div className="flex gap-5 ml-5">
                  <div className="flex bg-[#D9D9D9] rounded-xl  h-[20px] px-5 py-0.5">
                    <FaStar style={{ color: "#0F2C64" }} />
                    <FaStar style={{ color: "#0F2C64" }} />
                    <FaStar style={{ color: "#0F2C64" }} />
                    <FaStar style={{ color: "#0F2C64" }} />
                    <FaStar style={{ color: "#0F2C64" }} />
                  </div>
                  <div className="flex bg-[#D9D9D9] rounded-xl h-[20px] px-5 py-0.5">
                    <FaStar style={{ color: "#0F2C64" }} />
                    <FaStar style={{ color: "#0F2C64" }} />
                    <FaStar style={{ color: "#0F2C64" }} />
                    <FaStar style={{ color: "#0F2C64" }} />
                  </div>
                  <div className="flex bg-[#D9D9D9] rounded-xl  h-[20px] px-5 py-0.5">
                    <FaStar style={{ color: "#0F2C64" }} />
                    <FaStar style={{ color: "#0F2C64" }} />
                    <FaStar style={{ color: "#0F2C64" }} />
                  </div>
                  <div className="flex bg-[#D9D9D9] rounded-xl  h-[20px] px-5 py-0.5">
                    <FaStar style={{ color: "#0F2C64" }} />
                    <FaStar style={{ color: "#0F2C64" }} />
                  </div>
                  <div className="flex bg-[#D9D9D9] rounded-xl  h-[20px] px-5 py-0.5">
                    <FaStar style={{ color: "#0F2C64" }} />
                  </div>
                </div>
                <div className="mt-5">
                  <div className=" flex gap-2">
                    <div className="flex flex-col">
                      <div>sort by experience</div>

                      <div className="flex gap-2">
                        <div className="bg-[#0F2C64] rounded-3xl text-white p-2 w-[150px] flex justify-center">
                          High to Low
                        </div>
                        <div className="bg-[#D9D9D9] rounded-3xl text-white p-2 w-[150px] flex justify-center">
                          Low to High
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div>Sort by availability</div>

                      <div className="flex gap-2">
                        <div className="bg-[#0F2C64] rounded-3xl text-white p-2 w-[150px] flex justify-center">
                          Available Now
                        </div>
                        <div className="bg-[#D9D9D9] rounded-3xl text-white p-2 w-[150px] flex justify-center">
                          Schedule for Later
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div>Sort by distance</div>

                      <div className="flex gap-2">
                        <div className="bg-[#0F2C64] rounded-3xl text-white p-2 w-[100px] flex justify-center">
                          Near You
                        </div>
                        <div className="bg-[#D9D9D9] rounded-3xl text-white p-2 w-[200px] flex justify-center">
                          Anywhere from India
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-10 ml-5">
                  <div className="flex">
                    <div className="flex flex-col">
                      <div>Select specialization</div>
                      <div>
                        <div className="relative mt-2">
                          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <span className=" p-2.5 ml-[-3px] rounded-tl rounded-bl text-white">
                              <FaSearch style={{ color: "black" }} />
                            </span>
                          </div>
                          <input
                            type="text"
                            className="placeholder: ml-2 block w-[350px] rounded-3xl border-0 py-1.5 pl-10 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Specialization"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div>Select Language</div>
                      <div>
                        <div className="relative mt-2">
                          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <span className=" p-2.5 ml-[-3px] rounded-tl rounded-bl text-white">
                              <FaSearch style={{ color: "black" }} />
                            </span>
                          </div>
                          <input
                            type="text"
                            className="placeholder: ml-2 block w-[350px] rounded-3xl border-0 py-1.5 pl-10 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Language spaking Lawyer"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-5 m-5">
                  <button
                    className="text-[#0F2C64] p-2 pl-5 pr-5 rounded bg-white border border-[#0F2C64]"
                    onClick={() => setfilter(false)}
                  >
                    Cancel
                  </button>
                  <button className="bg-[#0F2C64] p-2 pl-5 pr-5 rounded text-white flex justify-center items-center gap-2">
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      <div className="bg-[white]  h-[100px]  mt-5 flex flex-col shadow-lg ">
        <div className="flex justify-between items-center mt-7 mr-5">
          <div className="ml-10 flex justify-center items-center gap-2 cursor-pointer" onClick={()=> navigate('/profile')}>
            <img src={userDetails?.image} alt="" className="w-[50px] h-[50px] rounded-full"/>
            <span className="font-bold">
            {userDetails?.fullName ||
                      userDetails?.firstName + " " + userDetails?.lastName}
              <br />
              <span className="text-[#808080]">{userDetails?.email}</span>
            </span>
          </div>

          <div className="flex justify-center items-center gap-10">
            {/* <div className="relative mt-2 rounded-md">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="bg-[#0F2C64] p-2  rounded-tl rounded-bl text-white">
                  <FaSearch />
                </span>
              </div>
              <input
                type="text"
                className="placeholder: ml-2 block w-[350px] rounded-md border-0 py-1.5 pl-10 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Search in admin panel"
              />
            </div> */}
            <div>
              <div className="flex justify-center items-center gap-4">
                <div className="relative">
                  <span onClick={toggleDropdown} className="cursor-pointer">
                    <img src={setting} alt="filter" />
                  </span>
                  {isOpen && (
                    <div className="absolute mt-2 ml-[-100px] w-[200px] bg-white rounded-md shadow-lg z-10">
                      <span className="flex justify-end m-3">
                        <IoCloseSharp
                          size={25}
                          onClick={toggleDropdown}
                          className="cursor-pointer"
                        />
                      </span>

                      <ul>
                        <Link to="/privacy">
                        <li className="p-2 hover:bg-[#0F2C64] hover:text-[white] cursor-pointer flex gap-2">
                          <img src={privacy} alt="" />
                          Privacy Policy
                        </li>
                        </Link>
                        <li className="p-2 hover:bg-[#0F2C64] hover:text-[white] cursor-pointer flex gap-1">
                          <img src={term} alt="" />
                          Terms & Conditinos
                        </li>
                        <li className="p-2 hover:bg-[#0F2C64] hover:text-[white] cursor-pointer flex gap-2">
                          <img src={helpandsupport} alt="" />
                          Help & Support
                        </li>
                        <Link to="/Complaint">
                          <li className="p-2 hover:bg-[#0F2C64] hover:text-[white] cursor-pointer flex gap-2">
                            <img src={complaint} alt="" />
                            Complaints
                          </li>
                        </Link>
                        <li
                          className="p-2 hover:bg-[#0F2C64] hover:text-[white] cursor-pointer flex gap-2"
                          onClick={handleLogout}
                        >
                          <img src={logout} alt="" />
                          Logout
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
                <Link to="/History">
                  <span>
                    <img src={history} alt="filter" />
                  </span>
                </Link>
                <div onClick={() => setfilter(true)} className="cursor-pointer">
                  {/* <img src={filterlogo} alt="filter" /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
