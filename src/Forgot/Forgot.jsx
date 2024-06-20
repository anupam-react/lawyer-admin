import { useState, useEffect } from "react";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import privacy from "../Assets/privacy.svg";
import term from "../Assets/termandcondition.svg";
import google from "../Assets/google.svg";
import { useNavigate } from "react-router-dom";
import { Baseurl } from "../utlis/apiservices";

const Forgot = () => {
  const Navigate = useNavigate();

  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState('');



  const handlePassword = (e) => {
    e.preventDefault();
   const id =  sessionStorage.getItem('userId')
    axios
      .post(`${Baseurl}/api/v1/admin/changePassword/${id}`, {
        newPassword: newPass,
        confirmPassword: confirmPass,
      })
      .then((response) => {
        // console.log(response.data);
          Navigate("/");

      })
      .catch((error) => {
        console.error("Error forget password in:", error);
      });
    Navigate("/");
  };

  useEffect(() => {
    if (
      typeof localStorage.getItem("accessToken") === "undefined" ||
      localStorage.getItem("accessToken") ||
      localStorage.getItem("accessToken") !== null
    ) {
      Navigate("/dashboard");
    }
  }, []);

  return (
    <div className="flex">
      <div className="bg-[#0F2C64] w-5/12 h-[100vh] flex flex-col justify-around">
        <div className="grid place-items-center">
          {/* <img src={loginimage} style={{ width: "400px" }} alt="" /> */}
        </div>
        <div className="grid place-items-center">
          {/* <span className="text-5xl text-white font-semibold">Welcome !</span> */}
          <span className="text-center text-white w-[300px] mt-5 text-[38px] font-semibold" style={{fontSize:"38px"}}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ac consectetur est.
          </span>
        </div>

        <div className="flex justify-center ml-10 mt-28">
          <div className="flex items-center">
            <img src={privacy} alt="" />{" "}
            <span className="text-white">Privacy Policy</span>
          </div>
          <div className="flex items-center">
            <img src={term} alt="" />{" "}
            <span className="text-white">Term & Condition</span>
          </div>
        </div>
      </div>
      <div className="bg-[#ffffff] w-8/12" style={{ marginTop:"25vh"}}>
       
        <span className="item-center flex justify-center text-[#000000] font-bold text-2xl mt-3">
        Forgot Password ??
        </span>
     
        
        <div className="flex justify-center">
          <form className="mt-5">
           
            <div className="flex justify-end items-center">
              <input
                placeholder="New Password *"
                className="outline-none h-[50px] w-[500px] mt-[10px] border-b-[1px] border-[#5D5D5D] relative"
                type='text'
                id="password"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
              />
             
            </div>
            <br />
            <div className="flex justify-end items-center">
              <input
                placeholder="Confirm Password *"
                className="outline-none h-[50px] w-[500px] mt-[10px] border-b-[1px] border-[#5D5D5D] relative"
                type='text'
                id="password"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
              />
             
            </div>
            <br />
            
            <div className="flex justify-center">
              <button
                className="bg-[#0F2C64] text-white mt-5 p-3 pr-20 pl-20 rounded-xl"
                onClick={handlePassword}
              >
                Update
              </button>
            </div>
          </form>
        </div>
      
      </div>
    </div>
  );
};

export default Forgot;
