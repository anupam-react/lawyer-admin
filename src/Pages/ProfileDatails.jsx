import React, { useEffect, useState } from "react";
import { fetchApiData, updateApiData } from "../utlis";
import { Baseurl } from "../utlis/apiservices";

const ProfileDatails = () => {
  const [userDetails, setUserDetails] = useState();
  const [firstname, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [image, setImage] = useState("");

  const fetchUser = async (id) => {
    const data = await fetchApiData(`${Baseurl}/api/v1/customer/getProfile`);
    console.log(data);
    setUserDetails(data?.data);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("firstName", firstname);
    formData.append("lastName", lastName );

    formData.append("email", email);
    formData.append("phone", phone);

    formData.append("password", password);
    formData.append("image", image);

    try {
      await updateApiData(`${Baseurl}/api/v1/admin/update`, formData);
      alert("Profile Update Successfully");
    } catch (error) {
      console.error("Error editing data:", error);
    }
  };

  return (
    <div className="shadow ">
      <div className="flex items-center gap-4 p-4">
        <img src="../Mask group (2).png" alt="" />
        <p className="text-[24px]">Edit Profile</p>
      </div>
      <hr className="my-4" />
      <div className="px-6 py-4">
        <p className="text-[18px] font-[500]">Admin Profile</p>
        <p className="text-[#868686] text-[14px]">
          Update and edit profile settings
        </p>
      </div>
      <div className="px-6 py-4 flex gap-4 items-center">
        <div className="relative">
          <img
            src={image || userDetails?.image}
            alt=""
            className="w-[80px] h-[80px] rounded-full"
          />
          <input
            type="file"
            id="image-file"
            className="hidden"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <label for="image-file">
            <img
              src="../Group 1686552271.png"
              alt=""
              className="absolute bottom-0 right-0 cursor-pointer"
            />
          </label>
        </div>
        <div>
          <p className="text-[18px] font-[500]">{userDetails?.fullName ||
                      userDetails?.firstName + " " + userDetails?.lastName}</p>
          <p className="text-[#8B8B8B] text-[14px]">Verified Account</p>
        </div>
      </div>
      <div className="px-6 py-4">
        <div className="flex flex-wrap gap-5  mt-10">
          <div>
            <label>First Name</label>
            <br />
            <input
              value={firstname || userDetails?.firstName}
              onChange={(e) => setFirstname(e.target.value)}
              placeholder="First Name"
              className="placeholder: block w-[264px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div>
            <label>Last Name</label>
            <br />
            <input
              value={lastName || userDetails?.lastName}
              onChange={(e) => setLastname(e.target.value)}
              placeholder="Last Name"
              className="placeholder: block w-[264px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-5  mt-10">
          <div>
            <label>Email</label>
            <br />
            <input
              value={email || userDetails?.email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="placeholder: block w-[264px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div>
            <label>Phone Number</label>
            <br />
            <input
              value={phone || userDetails?.phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone Number"
              className="placeholder: block w-[264px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-5  mt-10">
          <div>
            <label>Password</label>
            <br />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="************"
              className="placeholder: block w-[264px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div>
            <label>Confirm Password</label>
            <br />
            <input
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              placeholder="************"
              className="placeholder: block w-[264px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="flex justify-end gap-5 mt-20 mr-5">
          <button
            onClick={handleUpdate}
            className="bg-[#0F2C64] p-2 pl-5 pr-5 rounded text-white flex justify-center items-center gap-2"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileDatails;
