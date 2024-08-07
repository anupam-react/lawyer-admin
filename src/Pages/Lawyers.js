import { FaSearch } from "react-icons/fa";
import "../css/index.css";
import { useEffect, useState } from "react";
import dltbtn from "../Assets/dltbtn.svg";
import edit from "../Assets/edit.svg";
import userimage from "..//Assets/userimage.svg";
import { X } from "lucide-react";
import axios from "axios";
import { Baseurl } from "../utlis/apiservices";
import { Navigate } from "react-router-dom";
import config, { headers } from "../utlis/config";
import { useNavigate } from "react-router-dom";
import Spinner from "../utlis/Spinner";
import goback from "../Assets/goback.svg";
import { MdOutlineFileDownload } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import {
  createApiData,
  deleteApiData,
  fetchApiData,
  updateApiData,
} from "../utlis";
// import { headers } from "../utlis/config";
const Lawyers = () => {
  const [editlawyers, setEditlawyers] = useState(false);
  const [addnewlawyer, setaddnewlawyer] = useState(false);
  const [data, setData] = useState([]);
  const [lawyer, setLawyer] = useState();

  const [fullname, setFullname] = useState("");
  const [lastName, setLastname] = useState("");
  const [firstLineAddress, setFirstLineAddress] = useState("");
  const [secondLineAddress, setSecondLineAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [kyc, setKyc] = useState("");
  const [barRegistrationNo, setBarRegistrationNo] = useState("");
  const [barCertificateNo, setBarCertificateNo] = useState("");
  const [barRegistrationImage, setBarRegistrationImage] = useState("");
  const [barCertificateImage, setBarCertificateImage] = useState("");
  const [district, setDistrict] = useState("");
  const [pincode, setPincode] = useState("");
  const [expertises, setExpertises] = useState([]);

  const [fullName, setFullName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [editItemId, setEditItemId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(data);
  const [isDelete , setDelete] = useState(false)

  const [category, setCategory] = useState()

  const navigate = useNavigate();

  async function fetchCategory() {
    const data = await fetchApiData('https://shlok-mittal-lawyer-backend.vercel.app/api/v1/category');
    setCategory(data?.data);
  }

  useEffect(()=>{
    fetchCategory()
  },[])



  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    // Filter the data based on the search term
    const results = data?.filter(
      (item) =>
        item?.fullName?.toLowerCase().includes(term.toLowerCase()) ||
        item?.firstName?.toLowerCase().includes(term.toLowerCase()) ||
        item?.email?.toLowerCase().includes(term.toLowerCase()) ||
        item?.phone?.toLowerCase().includes(term.toLowerCase()) ||
        item?.country?.toLowerCase().includes(term.toLowerCase())   
    );
    setSearchResults(results);
  };

  console.log(data);

  // Logic to calculate the index of the last item on the current page
  const lastIndex = currentPage * itemsPerPage;
  // Logic to calculate the index of the first item on the current page
  const firstIndex = lastIndex - itemsPerPage;
  // Slice the data array to get the items for the current page
  let currentItems = !searchResults?.length
  ? data?.slice(firstIndex, lastIndex)
  : searchResults?.slice(firstIndex, lastIndex);



  // Function to handle next page
  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  // Function to handle previous page
  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  ///////////fetch lawyer////////////
  async function fetchLawyer() {
    const data = await fetchApiData(`${Baseurl}/api/v1/admin/lawyer`);
    console.log(data);
    setData(data?.data?.reverse());
  }
  useEffect(() => {
    fetchLawyer();
  }, []);

  const fetchSingleLawyer = async (id) => {
    const data = await fetchApiData(`${Baseurl}/api/v1/admin/User/${id}`);
    console.log(data);
    setLawyer(data?.data);
  };

  //////////delete lawyer/////////
  async function handledelete(_id) {
      try {
        await deleteApiData(`${Baseurl}/api/v1/admin/User/${_id}`);
        setDelete(false)
        fetchLawyer();

      } catch (err) {
        console.log(err);
      }

  }

  //////create lawyer/////////
  const handlecreatelawyer = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("firstName", fullname);
    formData.append("lastName", lastName);
    formData.append("phone", phone);
    formData.append("firstLineAddress", firstLineAddress);
    formData.append("secondLineAddress", secondLineAddress);
    formData.append("email", email);
    formData.append("country", country);
    formData.append("kyc", kyc);
    formData.append("aadhar", aadhar);
    formData.append("barRegistrationNo", barRegistrationNo);
    formData.append("barCertificateNo", barCertificateNo);
    formData.append("barRegistrationImage", barRegistrationImage);
    formData.append("barCertificateImage", barCertificateImage);
    formData.append("categoryId[0]", categoryId || category[0]?._id);
    formData.append("state", state);
    formData.append("district", district);
    formData.append("pincode", pincode);
    // formData.append("expertises", expertises);

    try {
      await createApiData(
        "https://shlok-mittal-lawyer-backend.vercel.app/api/v1/admin/CreateLawyer",
        formData
      );
      alert("Data added successfully");
      setaddnewlawyer(false);
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  //////////edit Lawyer/////////
  const handleeditLawyer = async (e) => {
    e.preventDefault();
    // console.log(name, email);
    console.log(editItemId);
    const formData = new FormData();
    formData.append("firstName", fullName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("phone", phone);

    formData.append("firstLineAddress", firstLineAddress);
    formData.append("secondLineAddress", secondLineAddress);
    formData.append("country", country);
    formData.append("state", state);
    formData.append("pincode", pincode);
    formData.append("district", district);
    formData.append("kyc", kyc);
    formData.append("aadhar", aadhar);
    formData.append("barRegistrationNo", barRegistrationNo);
    formData.append("barCertificateNo", barCertificateNo);
    formData.append("barRegistrationImage", barRegistrationImage);
    formData.append("barCertificateImage", barCertificateImage);
    formData.append("categoryId[0]", categoryId || category[0]?._id);

    try {
      await updateApiData(
        `${Baseurl}/api/v1/admin/updateLawyer/${editItemId}`,
        formData
      );
      alert("Data Edited Successfully");
      setEditlawyers(false);
    } catch (error) {
      console.error("Error editing data:", error);
    }
  };

  console.log(lawyer);
  console.log(expertises);

  return (
    <>
      {editlawyers ? (
        <>
          <div className="rounded h-[700px]">
            <div className="flex  justify-between items-center pt-5 ml-5 mr-5">
              <div className="text-2xl mb-5  text-black font-semibold">
                Lawyer Profile
                <br />
                <span className="text-[15px] text-[#525252]">
                  View and edit profile settings
                </span>
              </div>
              <div className="flex justify-center items-center gap-5">
                <button
                  className="text-[#0F2C64] pr-1 rounded bg-white border border-[#0F2C64] flex items-center"
                  onClick={() => {
                    setEditlawyers(false);
                  }}
                >
                  <img
                    src={goback}
                    alt="goback"
                    className="mr-2 bg-[#0F2C64] p-1.5"
                  />
                  Go Back
                </button>
              </div>
            </div>
            <hr />

            <div className="mt-5 flex justify-between items-center">
              <div className="text-center flex items-center gap-1">
                <img
                  src={lawyer?.image}
                  alt=""
                  className="w-[82px] h-[82px] rounded-full"
                />
                <div className="flex flex-col ">
                  <span className="text-left text-xl">
                    {lawyer?.fullName ||
                      lawyer?.firstName + " " + lawyer?.lastName}
                  </span>
                  <span className="text-[#8B8B8B] text-left text-[10px]">
                    Verified Account
                  </span>
                </div>
                <div>
                  <span class="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                    New
                  </span>
                </div>
              </div>
              <div className="flex">
                <button className="bg-[#0F2C64] flex justify-center items-center h-[39px] w-[153px] rounded-lg text-white">
                  Approve
                </button>
                <span className="flex">
                  <img src={dltbtn} alt="" />
                  <img className="cursor-pointer" src={edit} alt="" />
                </span>
              </div>
            </div>

            <form onSubmit={handleeditLawyer}>
              <div className="flex flex-wrap gap-5  mt-10">
                <div>
                  <label>First Name</label>
                  <br />
                  <input
                    value={fullName || lawyer?.firstName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="First Name"
                    className="placeholder: block w-[264px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div>
                  <label>Last Name</label>
                  <br />
                  <input
                    value={lastName || lawyer?.lastName}
                    onChange={(e) => setLastname(e.target.value)}
                    placeholder="Last Name"
                    className="placeholder: block w-[264px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div>
                  <label>Email</label>
                  <br />
                  <input
                    value={email || lawyer?.email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="placeholder: block w-[264px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div>
                  <label>Phone Number</label>
                  <br />
                  <input
                    value={phone || lawyer?.phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone Number"
                    className="placeholder: block w-[264px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-5  mt-10">
                <div>
                  <label>First Line Address</label>
                  <br />
                  <input
                    value={firstLineAddress || lawyer?.firstLineAddress}
                    onChange={(e) => setFirstLineAddress(e.target.value)}
                    placeholder="First Line Address"
                    className="placeholder: block w-[264px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div>
                  <label>Second Line Address</label>
                  <br />
                  <input
                    value={secondLineAddress || lawyer?.secondLineAddress}
                    onChange={(e) => setSecondLineAddress(e.target.value)}
                    placeholder="Second Line Address"
                    className="placeholder: block w-[264px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div>
                  <label>Country</label>
                  <br />
                  <input
                    value={country || lawyer?.country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="Country"
                    className="placeholder: block w-[264px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div>
                  <label>State</label>
                  <br />
                  <input
                    value={state || lawyer?.state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="State"
                    className="placeholder: block w-[264px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-5  mt-10">
                <div>
                  <label>District</label>
                  <br />
                  <input
                    value={district || lawyer?.district}
                    onChange={(e) => setDistrict(e.target.value)}
                    placeholder="District"
                    className="placeholder: block w-[264px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div>
                  <label>Pin Code</label>
                  <br />
                  <input
                    value={pincode || lawyer?.pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="Pin Code"
                    className="placeholder: block w-[264px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div>
                  <label>Kyc</label>
                  <br />
                  <input
                    value={kyc || lawyer?.kyc}
                    onChange={(e) => setKyc(e.target.value)}
                    placeholder="Kyc"
                    className="placeholder: block w-[264px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div>
                  <label>Adaahar card No.</label>
                  <br />
                  <input
                    type="file"
                    onChange={(e) => setAadhar(e.target.files[0])}
                    className="placeholder: block w-[264px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            
              <div className="flex flex-wrap gap-5  mt-10">
              <div>
                        <label>Category</label>
                        <br />
          <select name="" id=""  className="placeholder: block w-[264px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={categoryId} onChange={(e)=> setCategoryId(e.target.value)}>
                {category?.map((d, i)=>(
                    <option value={d?._id}>{d?.name}</option>

                ))}
              </select>
          </div>
                <div>
                  <label>Bar registration Number</label>
                  <br />
                  <input
                    value={barRegistrationNo || lawyer?.barRegistrationNo}
                    onChange={(e) => setBarRegistrationNo(e.target.value)}
                    placeholder="bar Registration No"
                    className="placeholder: block w-[264px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div>
                  <label>Bar certificate No</label>
                  <br />
                  <input
                    value={barCertificateNo || lawyer?.barCertificateNo}
                    onChange={(e) => setBarCertificateNo(e.target.value)}
                    placeholder="bar Certificate No"
                    className="placeholder: block w-[264px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div>
                  <label>Bar registration Image</label>
                  <br />
                  <input
                    type="file"
                    onChange={(e) => setBarRegistrationImage(e.target.files[0])}
                    className="placeholder: block w-[264px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div>
                  <label>Bar certificate</label>
                  <br />
                  <input
                    type="file"
                    onChange={(e) => setBarCertificateImage(e.target.files[0])}
                    className="placeholder: block w-[264px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="mt-10 flex gap-5">
                <div className="border-[#0F2C64] text-[#0F2C64] border bg-[#EEF4FF] flex justify-center items-center h-[39px] w-[153px] rounded-lg ">
                  Legal Adviser
                </div>
                <div className="border-[#0F2C64] text-[#0F2C64] border bg-[#EEF4FF] flex justify-center items-center h-[39px] w-[153px] rounded-lg ">
                  Real State Lawyer
                </div>
                <div className="border-[#0F2C64] text-[#0F2C64] border bg-[#EEF4FF] flex justify-center items-center h-[39px] w-[153px] rounded-lg ">
                  Corporate Lawyer
                </div>
                <div className="border-[#0F2C64] text-[#0F2C64] border bg-[#EEF4FF] flex justify-center items-center h-[39px] w-[153px] rounded-lg ">
                  Corporate Advisor
                </div>
              </div>
              <div className="mt-10 flex gap-5">
                <div className="bg-[#0F2C64] flex justify-center items-center gap-2 h-[33px] w-[324px] rounded-lg text-white">
                  Download Bar Registration Certificate{" "}
                  <MdOutlineFileDownload style={{ color: "white" }} />
                </div>
                <div className="bg-[#0F2C64] flex justify-center items-center gap-2 h-[33px] w-[324px] rounded-lg text-white">
                  Download Aadhaar{" "}
                  <MdOutlineFileDownload style={{ color: "white" }} />
                </div>
              </div>
              <div className="mt-10">
                <div className="font-semibold">Reviews & Ratings</div>
                <div className="mt-5 flex gap-5">
                  <div className="w-[267px] h-[212px] rounded-xl shadow-2xl flex justify-center items-center flex-col gap-2">
                    <img src={userimage} alt="" className="w-10" />
                    <div className="flex items-center font-semibold">
                      <FaStar style={{ color: "#FFA73F" }} />
                      4.75
                    </div>
                    <div className="text-[#646464] font-semibold">
                      Wade Warren
                    </div>
                    <div className="text-[#868686] text-center">
                      Lorem ipsum dolor sit amet consectetur. Quisque lobortis{" "}
                    </div>
                  </div>
                  <div className="w-[267px] h-[212px] rounded-xl shadow-2xl flex justify-center items-center flex-col gap-2">
                    <img src={userimage} alt="" className="w-10" />
                    <div className="flex items-center font-semibold">
                      <FaStar style={{ color: "#FFA73F" }} />
                      4.75
                    </div>
                    <div className="text-[#646464] font-semibold">
                      Wade Warren
                    </div>
                    <div className="text-[#868686] text-center">
                      Lorem ipsum dolor sit amet consectetur. Quisque lobortis{" "}
                    </div>
                  </div>
                  <div className="w-[267px] h-[212px] rounded-xl shadow-2xl flex justify-center items-center flex-col gap-2">
                    <img src={userimage} alt="" className="w-10" />
                    <div className="flex items-center font-semibold">
                      <FaStar style={{ color: "#FFA73F" }} />
                      4.75
                    </div>
                    <div className="text-[#646464] font-semibold">
                      Wade Warren
                    </div>
                    <div className="text-[#868686] text-center">
                      Lorem ipsum dolor sit amet consectetur. Quisque lobortis{" "}
                    </div>
                  </div>
                  <div className="w-[267px] h-[212px] rounded-xl shadow-2xl flex justify-center items-center flex-col gap-2">
                    <img src={userimage} alt="" className="w-10" />
                    <div className="flex items-center font-semibold">
                      <FaStar style={{ color: "#FFA73F" }} />
                      4.75
                    </div>
                    <div className="text-[#646464] font-semibold">
                      Wade Warren
                    </div>
                    <div className="text-[#868686] text-center">
                      Lorem ipsum dolor sit amet consectetur. Quisque lobortis{" "}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-5 mt-20 mr-5">
                <div
                  onClick={() => setEditlawyers(false)}
                  className="text-[#0F2C64] p-2 pl-5 pr-5 cursor-pointer rounded bg-white border border-[#0F2C64]"
                >
                  Cancel
                </div>
                <button
                  type="submit"
                  className="bg-[#0F2C64] p-2 pl-5 pr-5 rounded text-white flex justify-center items-center gap-2"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </>
      ) : (
        <>
          {addnewlawyer ? (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
                <div className="relative w-auto my-6 mx-auto max-w-5xl">
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-[1200px] bg-white outline-none focus:outline-none">
                    <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                      <h3 className="text-3xl font-semibold">
                        Add New Lawyer
                        <br />
                        <span className="text-[15px] text-[#525252]">
                          fill detail of new lawyer
                        </span>
                      </h3>

                      <span
                        onClick={() => setaddnewlawyer(false)}
                        className="cursor-pointer"
                      >
                        <X />
                      </span>
                    </div>
                    <hr />
                    <form>
                      <div className="flex justify-center  flex-wrap gap-5 mt-5">
                        <div>
                          <label>First Name</label>
                          <br />
                          <input
                            value={fullname}
                            onChange={(e) => setFullname(e.target.value)}
                            placeholder="First Name"
                            className="placeholder: block w-[250px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                        <div>
                          <label>Last Name</label>
                          <br />
                          <input
                            value={lastName}
                            onChange={(e) => setLastname(e.target.value)}
                            placeholder="Last Name"
                            className="placeholder: block w-[250px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>

                        <div>
                          <label>Email</label>
                          <br />
                          <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            className="placeholder: block w-[250px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                        <div>
                          <label>Phone Number</label>
                          <br />
                          <input
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Phone Number"
                            className="placeholder: block w-[250px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                        <div>
                          <label>First Line Address</label>
                          <br />
                          <input
                            value={firstLineAddress}
                            onChange={(e) =>
                              setFirstLineAddress(e.target.value)
                            }
                            placeholder="First Line Address"
                            className="placeholder: block w-[250px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                        <div>
                          <label>Second Line Address</label>
                          <br />
                          <input
                            value={secondLineAddress}
                            onChange={(e) =>
                              setSecondLineAddress(e.target.value)
                            }
                            placeholder="Second Line Address"
                            className="placeholder: block w-[250px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                        <div>
                          <label>Country</label>
                          <br />
                          <input
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            placeholder="Country"
                            className="placeholder: block w-[250px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>

                        <div>
                          <label>State</label>
                          <br />
                          <input
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            placeholder="State"
                            className="placeholder: block w-[250px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                        <div>
                          <label>District</label>
                          <br />
                          <input
                            value={district}
                            onChange={(e) => setDistrict(e.target.value)}
                            placeholder="District"
                            className="placeholder: block w-[250px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                        <div>
                          <label>Pin Code</label>
                          <br />
                          <input
                            value={pincode}
                            onChange={(e) => setPincode(e.target.value)}
                            placeholder="Pin Code"
                            className="placeholder: block w-[250px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                        <div>
                          <label>Kyc</label>
                          <br />
                          <input
                            value={kyc}
                            onChange={(e) => setKyc(e.target.value)}
                            placeholder="Kyc"
                            className="placeholder: block w-[250px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                        <div>
                          <label for="aadharImage">Upload Aadhar Number</label>
                          <br />
                          <input
                            type="file"
                            onChange={(e) => setAadhar(e.target.files[0])}
                            className="block w-[250px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                        <div>
                        <label>Category</label>
                        <br />
          <select name="" id=""  className="placeholder: block w-[264px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={categoryId} onChange={(e)=> setCategoryId(e.target.value)}>
                {category?.map((d, i)=>(
                    <option value={d?._id}>{d?.name}</option>

                ))}
              </select>
          </div>
                        <div>
                          <label>Bar registration Number</label>
                          <br />
                          <input
                            value={barRegistrationNo}
                            onChange={(e) =>
                              setBarRegistrationNo(e.target.value)
                            }
                            placeholder="bar Registration No"
                            className="placeholder: block w-[264px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                        <div>
                          <label>Bar certificate No</label>
                          <br />
                          <input
                            value={barCertificateNo}
                            onChange={(e) =>
                              setBarCertificateNo(e.target.value)
                            }
                            placeholder="bar Certificate No"
                            className="placeholder: block w-[264px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                        <div>
                          <label>Bar registration Image</label>
                          <br />
                          <input
                            type="file"
                            onChange={(e) =>
                              setBarRegistrationImage(e.target.files[0])
                            }
                            className="block w-[250px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                        <div>
                          <label>Bar Certificate Image</label>
                          <br />
                          <input
                            type="file"
                            onChange={(e) =>
                              setBarCertificateImage(e.target.files[0])
                            }
                            className="block w-[250px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="ml-20">
                        <div>State Lawyer Services</div>
                        <div className="flex gap-2">
                          <div
                            onClick={() => {
                              setExpertises([...expertises, "Legal Adviser"]);
                            }}
                            className={
                              expertises?.includes("Legal Adviser")
                                ? "text-[#0F2C64] p-2 pl-5 pr-5 rounded bg-[#EEF4FF]  border border-[#0F2C64]"
                                : "text-[#585858] p-2 pl-5 pr-5 rounded bg-[#EEF4FF]  border border-[#585858] cursor-pointer"
                            }
                          >
                            Legal Adviser
                          </div>
                          <div
                            onClick={() => {
                              setExpertises([
                                ...expertises,
                                "Real State Lawyer",
                              ]);
                            }}
                            className={
                              expertises?.includes("Real State Lawyer")
                                ? "text-[#0F2C64] p-2 pl-5 pr-5 rounded bg-[#EEF4FF]  border border-[#0F2C64]"
                                : "text-[#585858] p-2 pl-5 pr-5 rounded bg-[#EEF4FF]  border border-[#585858] cursor-pointer"
                            }
                          >
                            Real State Lawyer
                          </div>
                          <div
                            onClick={() => {
                              setExpertises([
                                ...expertises,
                                "Corporate Lawyer",
                              ]);
                            }}
                            className={
                              expertises?.includes("Corporate Lawyer")
                                ? "text-[#0F2C64] p-2 pl-5 pr-5 rounded bg-[#EEF4FF]  border border-[#0F2C64]"
                                : "text-[#585858] p-2 pl-5 pr-5 rounded bg-[#EEF4FF]  border border-[#585858] cursor-pointer"
                            }
                          >
                            Corporate Lawyer
                          </div>
                          <div
                            onClick={() => {
                              setExpertises([
                                ...expertises,
                                "Corporate Advisor",
                              ]);
                            }}
                            className={
                              expertises?.includes("Corporate Advisor")
                                ? "text-[#0F2C64] p-2 pl-5 pr-5 rounded bg-[#EEF4FF]  border border-[#0F2C64]"
                                : "text-[#585858] p-2 pl-5 pr-5 rounded bg-[#EEF4FF]  border border-[#585858] cursor-pointer"
                            }
                          >
                            Corporate Advisor
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end gap-5 m-5">
                        <button
                          className="text-[#0F2C64] p-2 pl-5 pr-5 rounded bg-white border border-[#0F2C64]"
                          onClick={() => setaddnewlawyer(false)}
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handlecreatelawyer}
                          className="bg-[#0F2C64] p-2 pl-5 pr-5 rounded text-white flex justify-center items-center gap-2"
                        >
                          Save Changes
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null}

          <div>
            <div className="flex justify-between">
              <div className="text-4xl font-semibold pl-6">All Lawyers</div>
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
                      value={searchTerm}
                      onChange={handleSearch}
                      className="placeholder: ml-2 block w-[250px] rounded-3xl border-0 py-1.5 pl-10 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="Search Lawyer"
                    />
                  </div>

                  <button
                    className="bg-[#0F2C64] p-2 pl-5 pr-5 rounded-3xl text-white"
                    onClick={() => setaddnewlawyer(true)}
                  >
                    Add New Lawyer
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-slate-50 mb-[200px] mt-5 p-5">
              <table className="w-full ">
                <thead>
                  <tr>
                    {/* <th className="w-[50px] text-left text-[#6D6D6D]"></th> */}
                    <th className="w-[200px] text-left pl-5 text-[#6D6D6D]">
                      Lawyer Name
                    </th>
                    <th className="text-left text-[#6D6D6D] w-[200px]">
                      Email
                    </th>
                    <th className="w-[200px] text-left text-[#6D6D6D]">
                      Phone no.
                    </th>
                    <th className=" w-[200px] text-center text-[#6D6D6D]">
                      Total Consultations
                    </th>

                    <th className="w-[200px] text-center text-[#6D6D6D]">
                      Status
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className="">
                  {!!data?.length &&
                    currentItems?.map((item) => (
                      <tr
                        className="shadow-lg bg-[white] h-[80px] border-b"
                        key={item._id}
                      >
                        {/* <td className="text-center w-[80px]">
                        <span class="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                          New
                        </span>
                      </td> */}
                        <td className="text-left">
                          <div className="flex items-center justify-left pl-5 gap-2">
                            <img
                              src={item.image}
                              alt=""
                              className="w-[50px] h-[50px] rounded-full"
                            />
                            {item?.fullName ||
                              item?.firstName + " " + item?.lastName}
                          </div>
                        </td>
                        <td className="w-[200px] text-left">{item.email}</td>

                        <td className="w-[150px] text-left">{item.phone}</td>
                        <td className="w-[50px] text-center">
                          {item.totalConsultancy}
                        </td>
                        <td className=" text-center ">
                          <span
                            className={
                              item.status === "Done"
                                ? "bg-[#D9FFD8] text-[#06FA00] px-6 text-[14px] rounded-2xl py-2"
                                : "bg-[#D8E3FF] text-[#0055FA] px-6 text-[14px] rounded-2xl py-2"
                            }
                          >
                            {item.status}
                          </span>
                        </td>
                        <td className=" text-center ">
                          <div className="flex">
                            <div
                              onClick={()=> setDelete(item?._id)}
                              className="cursor-pointer"
                            >
                              <img src={dltbtn} alt="" />
                            </div>
                          {isDelete &&
                          <>
                            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
                              <div className="relative w-auto my-6 mx-auto max-w-5xl">
                                <div className="border-1 border-[#CACACA] rounded-lg relative py-4 flex flex-col w-[400px] h-[200px] bg-white outline-none focus:outline-none">
                                  <div className="text-center font-semibold text-[20px]">
                                    Confirm Delete Profile ?
                                  </div>
                                  <hr className="my-6" />

                                  <div className="flex justify-center mt-5">
                                    <button onClick={(e)=>handledelete(isDelete)} className="w-[120px] h-[40px]  text-black font-bold rounded-lg">
                                      Yes
                                    </button>
                                    <button
                                      onClick={() => setDelete(false)}
                                      className="w-[120px] h-[40px] bg-[#0F2C64] text-white font-bold rounded-lg"
                                    >
                                      Not Now
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="opacity-10 fixed inset-0 z-40 bg-black"></div>
                          </>
                            
                            }
                            <div
                              onClick={(e) => {
                                setEditlawyers(true);
                                setEditItemId(item._id);
                                fetchSingleLawyer(item._id);
                              }}
                              className="cursor-pointer"
                            >
                              <img src={edit} alt="" />
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <nav
                className="flex items-center flex-column flex-wrap md:flex-row justify-between px-4"
                aria-label="Table navigation"
              >
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
                  Showing
                  <span className="font-semibold text-gray-900 dark:text-white px-1">
                    {currentPage}
                  </span>
                  of
                  <span className="font-semibold text-gray-900 dark:text-white pl-1">
                    {Math.ceil(data?.length / itemsPerPage)}
                  </span>
                </span>

                <div className="pagination">
                  <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className="pagination__selected"
                  >
                    <img src="./Vector (36).png" alt="" />
                  </button>
                  <button
                    onClick={nextPage}
                    // disabled={lastIndex >= transaction?.length}
                    className="pagination__selected"
                  >
                    <img src="./Vector (37).png" alt="" />
                  </button>
                </div>
              </nav>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Lawyers;
