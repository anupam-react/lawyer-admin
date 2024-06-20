import dashboard from "../Assets/Sidebar/dashboard.svg";
import lawyer from "../Assets/Sidebar/lawyer.svg";
import totaluser from "../Assets/Sidebar/totaluser.svg";
import cases from "../Assets/cases.svg";
import department from "../Assets/department.svg";
import notification from "../Assets/notification.svg";
import meeting from "../Assets/meeting.svg";
import booking from "../Assets/booking.svg";
import services from "../Assets/services.svg";
import banner from "../Assets/banners.svg";
import allfiles from "../Assets/allfiles.svg";
import todolist from "../Assets/todolist.svg";
import permission from "../Assets/permission.svg";
import message from "../Assets/message.svg";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="bg-[#0F2C64] h-[1000px]">
      <div className="text-center text-white text-2xl pt-10">Admin</div>
      <ul className="mt-10 items-start">
        <Link to="/dashboard">
          <li className="flex pl-[50px] pt-[12px] pb-[12px] items-left cursor-pointer hover:bg-[#1e3a8a]">
            <img src={dashboard} alt="" className="logo" />

            <div className="text-white ml-2 font-semibold">Dashboard</div>
          </li>
        </Link>
        <Link to="/Lawyers">
          <li className="flex pl-[50px] pt-[12px] pb-[12px] items-left cursor-pointer hover:bg-[#1e3a8a]">
            <img src={lawyer} alt="" className="logo" />

            <span className="text-white ml-2 font-semibold">Lawyers</span>
          </li>
        </Link>
        <Link to="/totalusers">
          <li className="flex pl-[50px] pt-[12px] pb-[12px] items-center cursor-pointer hover:bg-[#1e3a8a] ">
            <img src={totaluser} alt="" className="logo" />

            <span className="text-white ml-2 font-semibold">Total Users</span>
          </li>
        </Link>
        <Link to="/cases">
          <li className="flex pl-[50px] pt-[12px] pb-[12px] items-center cursor-pointer hover:bg-[#1e3a8a]">
            <img src={cases} alt="" className="logo"/>

            <span className="text-white ml-2 font-semibold">Cases</span>
          </li>
        </Link>
        <Link to="/department">
          <li className="flex  pl-[50px] pt-[12px] pb-[12px] items-center cursor-pointer hover:bg-[#1e3a8a]">
            <img src={department} alt="" className="logo" />

            <span className="text-white ml-2 font-semibold">Department</span>
          </li>
        </Link>
        <Link to="/notification">
          <li className="flex  pl-[50px] pt-[12px] pb-[12px] items-center cursor-pointer hover:bg-[#1e3a8a]">
            <img src={notification} alt="" className="logo"/>

            <span className="text-white ml-2 font-semibold">Notification</span>
          </li>
        </Link>
        <Link to="/meeting">
          <li className="flex  pl-[50px] pt-[12px] pb-[12px] items-center cursor-pointer hover:bg-[#1e3a8a]">
            <img src={meeting} alt="" className="logo"/>

            <span className="text-white ml-2 font-semibold">Meeting</span>
          </li>
        </Link>
        <Link to="/Booking">
          <li className="flex  pl-[50px] pt-[12px] pb-[12px] items-center cursor-pointer hover:bg-[#1e3a8a]">
            <img src={booking} alt="" className="logo"/>

            <span className="text-white ml-2 font-semibold">Booking</span>
          </li>
        </Link>
        <Link to="/services">
          <li className="flex  pl-[50px] pt-[12px] pb-[12px] items-center cursor-pointer hover:bg-[#1e3a8a]">
            <img src={services} alt="" className="logo" />

            <span className="text-white ml-2 font-semibold">Services</span>
          </li>
        </Link>
        <Link to="/banners">
          <li className="flex  pl-[50px] pt-[12px] pb-[12px] items-center cursor-pointer hover:bg-[#1e3a8a]">
            <img src={banner} alt="" className="logo"/>

            <span className="text-white ml-2 font-semibold">Banners</span>
          </li>
        </Link>
        <Link to="allfiles">
          <li className="flex  pl-[50px] pt-[12px] pb-[12px] items-center cursor-pointer hover:bg-[#1e3a8a] ">
            <img src={allfiles} alt="" className="logo"/>

            <span className="text-white ml-2 font-semibold">All Files</span>
          </li>
        </Link>
        <Link to="todolist">
          <li className="flex  pl-[50px] pt-[12px] pb-[12px] items-center cursor-pointer hover:bg-[#1e3a8a] ">
            <img src={todolist} alt="" className="logo"/>

            <span className="text-white ml-2 font-semibold">To-Do List</span>
          </li>
        </Link>
        <Link to="permissions">
          <li className="flex  pl-[50px] pt-[12px] pb-[12px] items-center cursor-pointer  hover:bg-[#1e3a8a]">
            <img src={permission} alt="" className="logo"/>

            <span className="text-white ml-2 font-semibold">Permissions</span>
          </li>
        </Link>
        <Link to="messages">
          <li className="flex  pl-[50px] pt-[12px] pb-[12px] items-center cursor-pointer hover:bg-[#1e3a8a] ">
            <img src={message} alt="" className="logo"/>

            <span className="text-white ml-2 font-semibold">Messages</span>
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default Sidebar;
