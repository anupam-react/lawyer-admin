import { useState, useEffect } from "react";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import privacy from "../Assets/privacy.svg";
import term from "../Assets/termandcondition.svg";
import google from "../Assets/google.svg";
import { useNavigate } from "react-router-dom";
import { Baseurl } from "../utlis/apiservices";

const Email = () => {
  const Navigate = useNavigate();
  const [email, setEmail] = useState("");




  const handlePassword = (e) => {
    e.preventDefault();
    axios
      .post(`${Baseurl}/api/v1/admin/forgetPassword`, {
        email: email,
      })
      .then((response) => {
        // console.log(response.data);
          Navigate("/otp");

      })
      .catch((error) => {
        console.error("Error Register in:", error);
      });

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
       Enter Your Email
        </span>
     
        
        <div className="flex justify-center">
          <form className="mt-5">
            <input
              placeholder="Email"
              className="outline-none h-[50px] w-[500px] border-b-[1px] border-[#5D5D5D]"
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <br />
       
            <br />
            
            <div className="flex justify-center">
              <button
                className="bg-[#0F2C64] text-white mt-5 p-3 pr-20 pl-20 rounded-xl"
                onClick={handlePassword}
              >
                Send Otp
              </button>
            </div>
          </form>
        </div>
      
      </div>
    </div>
  );
};

export default Email;
