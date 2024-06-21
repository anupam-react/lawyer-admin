import { FaSearch } from "react-icons/fa";
import dltbtn from "../Assets/dltbtn.svg";
import edit from "../Assets/edit.svg";
import '../css/index.css'
import userimage from "..//Assets/userimage.svg";
import { Baseurl } from "../utlis/apiservices";
import axios from "axios";
import { headers } from "../utlis/config";
import { useEffect, useState } from "react";
import goback from "../Assets/goback.svg";
import Spinner from "../utlis/Spinner";
import { useNavigate } from "react-router-dom";
import { setSelectionRange } from "@testing-library/user-event/dist/utils";
import { deleteApiData, fetchApiData, updateApiData } from "../utlis";
const Totalusers = () => {
  const [edituser, setedituser] = useState();
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [kyc, setKyc] = useState("");
  const [firstLineAddress, setFirstLineAddress] = useState("");
  const [secondLineAddress, setSecondLineAddress] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [district, setDistrict] = useState("");
  const [editItemId, setEditItemId] = useState(null);
  const [singleUser, setSingleUser] = useState()
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [isDelete , setDelete] = useState(false)

  const navigate = useNavigate();




   // Logic to calculate the index of the last item on the current page
   const lastIndex = currentPage * itemsPerPage;
   // Logic to calculate the index of the first item on the current page
   const firstIndex = lastIndex - itemsPerPage;
   // Slice the data array to get the items for the current page
   let currentItems = data?.slice(firstIndex, lastIndex)
     
 
   // Function to handle next page
   const nextPage = () => {
     setCurrentPage((prevPage) => prevPage + 1);
   };
 
   // Function to handle previous page
   const prevPage = () => {
     setCurrentPage((prevPage) => prevPage - 1);
   };

  //////fetching user/////////

  async function fetchuser() {
    const data = await fetchApiData(`${Baseurl}/api/v1/admin/users`)
    console.log(data)
    setData(data?.data?.reverse());

  }

  const fetchSingleUsers = async (id)=>{
    const data = await fetchApiData(`${Baseurl}/api/v1/admin/User/${id}`)
    console.log(data)
    setSingleUser(data?.data);
  }

  console.log(data)

  useEffect(() => {
    fetchuser();
  }, []);

  //////////delete lawyer/////////
  async function handledelete(_id) {
    try {
      await deleteApiData(`${Baseurl}/api/v1/admin/User/${_id}`);
      setDelete(false)
      fetchuser();

    } catch (err) {
      console.log(err);
    }

   
  }

  //////////edit User/////////

  const handleedituser = async(e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return; // Stop further execution if passwords don't match
    }

    // Passwords match, proceed with form submission
    console.log("Password submitted:", password);
    setErrorMessage(""); // Reset the error message if it was previously set

    // Continue with form submission
    console.log(firstName, lastName, email);
    console.log(editItemId);
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("kyc", kyc);
    formData.append("firstLineAddress", firstLineAddress);
    formData.append("secondLineAddress", secondLineAddress);
    formData.append("country", country);
    formData.append("state", state);
    formData.append("pincode", pincode);
    formData.append("district", district);

    try{
      await updateApiData(`${Baseurl}/api/v1/admin/updateUser/${editItemId}`, formData)  
      alert("Data Edited Successfully");
      setedituser(false)
      } catch (error){
        console.error("Error editing data:", error);
      }

  
  };

  return (
    <>
      {edituser ? (
        <>
          <div className="rounded h-[700px]">
            <div className="flex  justify-between items-center pt-5 ml-5 mr-5">
              <div className="text-2xl mb-5  text-black font-semibold">
                User Profile
                <br />
                <span className="text-[15px] text-[#525252]">
                  View and edit profile settings
                </span>
              </div>
              <div className="flex justify-center items-center gap-5">
                <button
                  className="text-[#0F2C64] pr-1 rounded bg-white border border-[#0F2C64] flex items-center"
                  onClick={() => {
                    setedituser(false);
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
                <img src={singleUser?.image} alt="" className="w-[82px] h-[82px] rounded-full" />
                <div className="flex flex-col ">
                  <span className="text-left text-xl">{singleUser?.fullName || singleUser?.firstName + " " + singleUser?.lastName}</span>
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
              <div>
                <span className="flex">
                  <img src={dltbtn} alt="" />
                  <img className="cursor-pointer" src={edit} alt="" />
                </span>
              </div>
            </div>

            <form onSubmit={handleedituser}>
              <div className="flex flex-wrap gap-5  mt-10">
                <div>
                  <label>First Name</label>
                  <br />
                  <input
                    value={firstName || singleUser?.firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                    className="placeholder: block w-[264px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div>
                  <label>Last Name</label>
                  <br />
                  <input
                    value={lastName || singleUser?.lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                    className="placeholder: block w-[264px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div>
                  <label>Email</label>
                  <br />
                  <input
                    value={email || singleUser?.email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="placeholder: block w-[264px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div>
                  <label>Phone Number</label>
                  <br />
                  <input
                    value={phone || singleUser?.phone}
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
                    value={firstLineAddress || singleUser?.firstLineAddress}
                    onChange={(e) => setFirstLineAddress(e.target.value)}
                    placeholder="First Line Address"
                    className="placeholder: block w-[264px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div>
                  <label>Second Line Address</label>
                  <br />
                  <input
                    value={secondLineAddress || singleUser?.secondLineAddress}
                    onChange={(e) => setSecondLineAddress(e.target.value)}
                    placeholder="Second Line Address"
                    className="placeholder: block w-[264px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div>
                  <label>Country</label>
                  <br />
                  <input
                    value={country || singleUser?.country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="Country"
                    className="placeholder: block w-[264px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div>
                  <label>State</label>
                  <br />
                  <input
                    value={state || singleUser?.state}
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
                    value={district || singleUser?.district}
                    onChange={(e) => setDistrict(e.target.value)}
                    placeholder="District"
                    className="placeholder: block w-[264px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div>
                  <label>Pin Code</label>
                  <br />
                  <input
                    value={pincode || singleUser?.pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="Pin Code"
                    className="placeholder: block w-[264px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div>
                  <label>Kyc</label>
                  <br />
                  <input
                    value={kyc || singleUser?.kyc}
                    onChange={(e) => setKyc(e.target.value)}
                    placeholder="Kyc"
                    className="placeholder: block w-[264px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              {/* <div className="flex flex-wrap gap-5  mt-10">
                <div>
                  <label>Password</label>
                  <br />
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password"
                    className="placeholder: block w-[264px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div>
                  <label>Confirm Password</label>
                  <br />
                  <input
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    type="password"
                    placeholder="Confirm Password"
                    className="placeholder: block w-[264px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div> */}
              {errorMessage && <p className="text-red-500">{errorMessage}</p>}

              <div className="flex justify-end gap-5 mt-20 mr-5">
                <div onClick={()=> setedituser(false)} className="text-[#0F2C64] p-2 cursor-pointer pl-5 pr-5 rounded bg-white border border-[#0F2C64]">
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
          <div>
            <div className="flex justify-between">
              <div className="text-4xl font-semibold pl-6">ALL Users</div>
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
                      className="placeholder: ml-2 block w-[250px] rounded-3xl border-0 py-1.5 pl-10 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="Search User"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-slate-50 mb-[200px] mt-5 p-5">
              <table className="w-full">
                <thead>
                  <tr>
                    {/* <th className="w-[100px] text-left text-[#6D6D6D]"></th> */}
                    <th className="w-[200px] pl-5 text-left text-[#6D6D6D]">
                      Lawyer Name
                    </th>
                    <th className="text-left text-[#6D6D6D] w-[250px]">
                      Email
                    </th>
                    <th className="w-[200px] text-left text-[#6D6D6D]">
                      Phone no.
                    </th>
                    <th className=" w-[200px] text-center text-[#6D6D6D]">
                      Total Consultations
                    </th>

                    <th className="w-[100px]"></th>
                  </tr>
                </thead>
                <tbody>
                  {!!data?.length && currentItems?.map((item) => (
                    <tr className="shadow-lg bg-[white] h-[80px] border-b">
                      {/* <td className="text-left">
                        <span class="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                          New
                        </span>
                      </td> */}
                      <td className="text-left">
                        <div className="flex items-center justify-left pl-5 gap-2">
                          <div className="w-[50px]">
                            <img
                              src={item.image}
                              alt=""
                              className="w-[50px] h-[50px] rounded-full"
                            />
                          </div>
                          {item?.fullName ||
                              item?.firstName + " " + item?.lastName}
                        </div>
                      </td>
                      <td className="w-[200px] text-left">{item.email}</td>

                      <td className="w-[150px] text-left">{item.phone}</td>
                      <td className="w-[50px] text-center">
                        {item.totalConsultancy}
                      </td>

                      <td className="w-[50px] text-center text-[#094DB3]">
                        <span className="flex cursor-pointer">
                          <img
                            src={dltbtn}
                            alt=""
                            onClick={() => setDelete(item?._id)}
                          />
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
                                    <button onClick={()=>handledelete(isDelete)} className="w-[120px] h-[40px]  text-black font-bold rounded-lg">
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
                          <img
                            className="cursor-pointer"
                            src={edit}
                            alt=""
                            onClick={(e) => {
                              setedituser(true);
                              setEditItemId(item._id);
                              fetchSingleUsers(item._id)
                            }}
                          />
                        </span>
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

export default Totalusers;
