import { FaSearch } from "react-icons/fa";
import deletebtn from "../Assets/Banners/deletebtn.svg";
import editbtn from "../Assets/Banners/editbtn.svg";
import download from "../Assets/allfiles/download.svg";
import userimage from "..//Assets/userimage.svg";
import upload from "../Assets/upload.svg";
import goback from "../Assets/goback.svg";
import { useEffect, useState } from "react";
import axios from "axios";
import { Baseurl } from "../utlis/apiservices";
import { useNavigate } from "react-router-dom";
import { headers } from "../utlis/config";
import { createApiData, deleteApiData, fetchApiData, updateApiData } from "../utlis";
import CaseDetails from "./CaseDetails";

const Cases = () => {
  const [editcases, setEditcases] = useState(false);
  const [newcases, setnewcases] = useState(false);
  const [caseDetails , setCaseDetails] = useState(false)
  const [caseData , setCaseData]= useState({})
  const [data, setData] = useState("");
  const [newCaseData , setNewCaseData] = useState([])
  const [oldCaseData , setOldCaseData] = useState([])
  const [closeCaseData , setCloseCaseData] = useState([])

  const [selectedDiv, setSelectedDiv] = useState("All Cases");

  const [caseTitle, setCaseTitle] = useState("");
  const [caseNumber, setCaseNumber] = useState("");
  const [courtName, setCourtName] = useState("");
  const [courtNumber, setCourtNumber] = useState("");
  const [judge, setJudge] = useState("");
  const [lastDateOfHearing, setLastDateOfHearing] = useState("");
  const [nextHearingDate, setNextHearingDate] = useState("");
  const [type, setType] = useState("");
  const [file, setFile] = useState("");
  const [editItemId, setEditItemId] = useState(null);
  const [isDelete , setDelete] = useState(false)
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);


    // Logic to calculate the index of the last item on the current page
    const lastIndex = currentPage * itemsPerPage;
    // Logic to calculate the index of the first item on the current page
    const firstIndex = lastIndex - itemsPerPage;
    // Slice the data array to get the items for the current page
    let currentItems = selectedDiv === "All Cases" ? data?.slice(firstIndex, lastIndex) : selectedDiv === "Old Cases" ? oldCaseData?.slice(firstIndex, lastIndex) :  selectedDiv === "New Cases" ? newCaseData?.slice(firstIndex, lastIndex) : selectedDiv === "Closed Cases" ? closeCaseData?.slice(firstIndex, lastIndex) :  data?.slice(firstIndex, lastIndex)

  // Function to handle next page
  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  // Function to handle previous page
  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };




  /////////fetch allcase//////////


  const fetchAllCase = async() =>{
    const data = await fetchApiData(`${Baseurl}/api/v1/admin/case/all`)

    setData(data?.data?.reverse());
  }
  const fetchNewCases = async() =>{
    const data = await fetchApiData(`${Baseurl}/api/v1/admin/NewCase/all`)

    setNewCaseData(data?.data?.reverse());
  }

  const fetchOldCases = async() =>{
    const data = await fetchApiData(`${Baseurl}/api/v1/admin/OldCase/all`)

    setOldCaseData(data?.data?.reverse());
  }

  const fetchCloseCases = async() =>{
    const data = await fetchApiData(`${Baseurl}/api/v1/admin/case/getClosed`)

    setCloseCaseData(data?.data?.reverse());
  }

  const fetchSingleCase = async(id) =>{
    const data = await fetchApiData(`${Baseurl}/api/v1/admin/case/get/${id}`)

    setCaseData(data?.data);
  }

  useEffect(() => {
    fetchAllCase();
    fetchNewCases();
    fetchOldCases();
    fetchCloseCases();
  }, []);

  ////////////delete case//////////
 async function handleDelete(_id) {

    try {
      await deleteApiData(`${Baseurl}/api/v1/admin/case/delete/${_id}`);
      setDelete(false)

    } catch (err) {
      console.log(err);
    }

  }

  ////////create cases //////////////
  const handleCreateCases = async (e) => {
    e.preventDefault();
    console.log({
      caseTitle,
      caseNumber,
      courtName,
      courtNumber,
      judge,
      lastDateOfHearing,
      nextHearingDate,
    });

    const requestData = {
      caseTitle: caseTitle,
      caseNumber: caseNumber,
      courtName: courtName,
      courtNumber: courtNumber,
      judge: judge,
      lastDateOfHearing: lastDateOfHearing,
      nextHearingDate: nextHearingDate,
      type: type,
    };

    try {
      await createApiData(
        `${Baseurl}/api/v1/admin/case/add`,
        requestData
      );
      alert("Data added successfully");
      setnewcases(false);
    } catch (error) {
      console.error("Error adding data:", error);
    }

  };

  //////Edit Cases //////////
  const handleEditCases = async(e) => {
    e.preventDefault();
    console.log(caseTitle);
    console.log(editItemId);
    const formData = {
      caseTitle: caseTitle,
      caseNumber: caseNumber,
      courtName: courtName,
      courtNumber: courtNumber,
      judge: judge,
      lastDateOfHearing: lastDateOfHearing,
      nextHearingDate: nextHearingDate,
      type: type,
    };

    try {
      await updateApiData(
       `${Baseurl}/api/v1/admin/case/update/${editItemId}`,
        formData
      );
      alert("Data Edited Successfully");
      setEditcases(false);

    } catch (error) {
      console.error("Error editing data:", error);
    }
  };

  return (
    <>
      {editcases ? (
        <>
          <div className="rounded h-[700px]">
            <div className="flex  justify-between items-center pt-5 ml-5 mr-5">
              <div className="text-2xl mb-5  text-black font-semibold">
                All Cases
                <br />
                <span className="text-[15px] text-[#525252]">
                  Add or update cases
                </span>
              </div>
              <div className="flex justify-center items-center gap-5">
                <button
                  className="text-[#0F2C64] pr-1 rounded bg-white border border-[#0F2C64] flex items-center"
                  onClick={() => {
                    setEditcases(false);
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
              <div className="text-center flex items-center gap-4">
                <img src={caseData?.lawyer?.image } alt="" className="w-[80px] h-[80px] rounded-full" />
                <div className="flex flex-col ">
                  <span className="text-left text-xl">{caseData?.lawyer?.fullName || caseData?.lawyer?.firstName + " " + caseData?.lawyer?.lastName }</span>
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
            </div>

            <form onSubmit={handleEditCases}>
              <div className="flex flex-wrap gap-5  mt-10">
                <div>
                  <label>Consultant</label>
                  <br />
                  <input
                    placeholder="Consultant"
                    value={caseData?.userId?.fullName || caseData?.userId?.firstName + " " + caseData?.userId?.lastName }
                    className="placeholder: block w-[264px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div>
                  <label>Case Title</label>
                  <br />
                  <input
                    value={caseTitle || caseData?.caseTitle}
                    onChange={(e) => setCaseTitle(e.target.value)}
                    placeholder="Case Title"
                    className="placeholder: block w-[264px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div>
                  <label>Case Category</label>
                  <br />
                  <input
                    value={type || caseData?.type}
                    onChange={(e) => setCaseNumber(e.target.value)}
                    placeholder="Case Category"
                    className="placeholder: block w-[264px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div>
                  <label>Court Name</label>
                  <br />
                  <input
                    placeholder="Court Name"
                    value={courtName ||  caseData?.courtName}
                    onChange={(e) => setCourtName(e.target.value)}
                    className="placeholder: block w-[264px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-5  mt-10">
                <div>
                  <label>Court Number</label>
                  <br />
                  <input
                    placeholder="Court Number"
                    value={courtNumber ||  caseData?.courtNumber}
                    onChange={(e) => setCourtNumber(e.target.value)}
                    className="placeholder: block w-[264px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div>
                  <label>Case Number</label>
                  <br />
                  <input
                    placeholder="Case Number"
                    value={caseNumber ||  caseData?.caseNumber}
                    onChange={(e) => setCaseNumber(e.target.value)}
                    className="placeholder: block w-[264px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                {/* <div>
                  <label>Country</label>
                  <br />
                  <input
                    placeholder="Country"
                    value={country}
                    onChange={(e) => setCaseNumber(e.target.value)}
                    className="placeholder: block w-[264px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div> */}
                <div>
                  <label>Name of the Judge</label>
                  <br />
                  <input
                    placeholder="Name of the Judge"
                    value={judge ||  caseData?.judge}
                    onChange={(e) => setJudge(e.target.value)}
                    className="placeholder: block w-[264px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-5  mt-10">
                <div>
                  <label>Last date of hearing</label>
                  <br />
                  <input
                    placeholder="Last date of hearing"
                    value={lastDateOfHearing ||  caseData?.lastDateOfHearing}
                    onChange={(e) => setLastDateOfHearing(e.target.value)}
                    className="placeholder: block w-[264px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div>
                  <label>Next date of hearing</label>
                  <br />
                  <input
                    placeholder="Next date of hearing"
                    value={nextHearingDate ||  caseData?.nextHearingDate}
                    onChange={(e) => setNextHearingDate(e.target.value)}
                    className="placeholder: block w-[264px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="mt-10">
                <label>Case Documents</label>

                <div className="bg-[#E6EEFD] h-[150px] w-[600px] rounded-xl">
                  <div className="p-5 relative rounded-lg h-[200px]">
                    <div className="flex flex-col justify-center text-center mt-3">
                      <label>
                        <input
                          className="text-sm cursor-pointer w-36 hidden"
                          type="file"
                          multiple
                        />
                        <div className="flex justify-center">
                          <img src={upload} alt="" className="w-[50px]" />
                        </div>
                      </label>

                      <div className="title text-[#0B50B3]">
                        Upload Files from Device/ Browser
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-5 mt-20 mr-5">
                <div onClick={()=> setEditcases(false)} className="text-[#0F2C64] p-2 pl-5 pr-5 cursor-pointer rounded bg-white border border-[#0F2C64]">
                  Cancel
                </div>
                <button type="submit" className="bg-[#0F2C64] p-2 pl-5 pr-5 rounded text-white flex justify-center items-center gap-2">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </>
      ) :
      caseDetails ? (
        <CaseDetails caseData={caseData} setEditItemId={setEditItemId} setEditcases={setEditcases} setCaseDetails={setCaseDetails}/>
      ):
      (
        <>
          <>
            {newcases ? (
              <>
                <div className="rounded h-[700px]">
                  <div className="flex  justify-between items-center pt-5 ml-5 mr-5">
                    <div className="text-2xl mb-5  text-black font-semibold">
                      All Cases
                      <br />
                      <span className="text-[15px] text-[#525252]">
                        Add or update cases
                      </span>
                    </div>
                    <div className="flex justify-center items-center gap-5">
                      <button
                        className="text-[#0F2C64] pr-1 rounded bg-white border border-[#0F2C64] flex items-center"
                        onClick={() => {
                          setnewcases(false);
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

                  <div className="flex ml-20 mt-5 items-center gap-2">
                    <img src={userimage} alt="userimage" className="w-[80px]" />

                    <div className="flex flex-col gap-1">
                      Edit Profile
                      <span className="text-[#8B8B8B]">verified profile</span>
                    </div>
                  </div>

                  <form onSubmit={handleCreateCases}>
                    <div className="flex flex-wrap gap-5 ml-20 mt-10">
                      <div>
                        <label>Consultant</label>
                        <br />
                        <input
                          placeholder="Consultant"
                          className="placeholder: block w-[300px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                      <div>
                        <label>Case Title</label>
                        <br />
                        <input
                          value={caseTitle}
                          onChange={(e) => setCaseTitle(e.target.value)}
                          placeholder="Case Title"
                          className="placeholder: block w-[300px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                      <div>
                        <label>Case Category</label>
                        <br />
                        <input
                          placeholder="Case Category"
                          value={type}
                          onChange={(e) => setType(e.target.value)}
                          className="placeholder: block w-[300px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                      <div>
                        <label>Court Name</label>
                        <br />
                        <input
                          value={courtName}
                          onChange={(e) => setCourtName(e.target.value)}
                          placeholder="Court Name"
                          className="placeholder: block w-[300px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                      <div>
                        <label>Court Number</label>
                        <br />
                        <input
                          value={courtNumber}
                          onChange={(e) => setCourtNumber(e.target.value)}
                          placeholder="Court Number"
                          className="placeholder: block w-[300px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                      <div>
                        <label>Case Number</label>
                        <br />
                        <input
                          value={caseNumber}
                          onChange={(e) => setCaseNumber(e.target.value)}
                          placeholder="Case Number"
                          className="placeholder: block w-[300px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                      <div>
                        <label>Name of the judge</label>
                        <br />
                        <input
                          value={judge}
                          onChange={(e) => setJudge(e.target.value)}
                          placeholder="Name of the judge"
                          className="placeholder: block w-[300px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                      <div>
                        <label>Last date of hearing</label>
                        <br />
                        <input
                          value={lastDateOfHearing}
                          onChange={(e) => setLastDateOfHearing(e.target.value)}
                          placeholder="Last date of hearing"
                          className="placeholder: block w-[300px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                      <div>
                        <label>Next date of hearing</label>
                        <br />
                        <input
                          value={nextHearingDate}
                          onChange={(e) => setNextHearingDate(e.target.value)}
                          placeholder="Next date of hearing"
                          className="placeholder: block w-[300px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                     
                    </div>

                    <div className="ml-10 mt-6">
                      <label>Case Documents</label>

                      <div className="bg-[#E6EEFD] h-[150px] w-[600px] rounded-xl">
                        <div className="p-5 relative rounded-lg h-[200px]">
                          <div className="flex flex-col justify-center text-center mt-3">
                            <label>
                              <input
                                className="text-sm cursor-pointer w-36 hidden"
                                type="file"
                                multiple
                              />
                              <div className="flex justify-center">
                                <img src={upload} alt="" className="w-[50px]" />
                              </div>
                            </label>

                            <div className="title text-[#0B50B3]">
                              upload Image From Device /Browser
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end gap-5 mr-5">
                      <div onClick={()=> setnewcases(false)} className="text-[#0F2C64] p-2 pl-5 pr-5 rounded cursor-pointer bg-white border border-[#0F2C64]">
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
                <>
                  <div className="flex justify-between items-center pt-5 ml-5 mr-5">
                    <div className="text-2xl mb-5 text-[black] font-semibold ">
                      All Cases
                      <br />
                      <span className="text-[15px] text-[#525252]">
                        Add and view legal cases
                      </span>
                    </div>
                    <div className="flex">
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
                            placeholder="Search Cases"
                          />
                        </div>

                        <button
                          className="bg-[#0F2C64] p-2 pl-5 pr-5 rounded-3xl text-white"
                          onClick={() => setnewcases(true)}
                        >
                          Add New Case
                        </button>
                      </div>
                    </div>
                  </div>

                  <hr />
                  <div className="flex gap-10 ml-8 mt-3 mb-3">
                    <div
                      className={`cursor-pointer ${
                        selectedDiv === "All Cases"
                          ? "underline font-bold text-[#0F2C64] underline-offset-8"
                          : "font-bold text-[#868686]"
                      }`}
                      onClick={() => setSelectedDiv("All Cases")}
                    >
                      All Cases
                    </div>
                    <div
                      className={`cursor-pointer ${
                        selectedDiv === "Old Cases"
                          ? "underline font-bold text-[#0F2C64] underline-offset-8"
                          : "font-bold text-[#868686]"
                      }`}
                      onClick={() => setSelectedDiv("Old Cases")}
                    >
                      Old Cases
                    </div>
                    <div
                      className={`cursor-pointer ${
                        selectedDiv === "New Cases"
                          ? "underline font-bold text-[#0F2C64] underline-offset-8"
                          : "font-bold text-[#868686]"
                      }`}
                      onClick={() => setSelectedDiv("New Cases")}
                    >
                      New Cases
                    </div>

                    <div
                      className={`cursor-pointer ${
                        selectedDiv === "Judgement Cases"
                          ? "underline text-[#0F2C64] font-bold underline-offset-8"
                          : "font-bold text-[#868686]"
                      }`}
                      onClick={() => setSelectedDiv("Judgement Cases")}
                    >
                     Judgement Cases
                    </div>
                    <div
                      className={`cursor-pointer ${
                        selectedDiv === "Closed Cases"
                          ? "underline font-bold text-[#0F2C64] underline-offset-8"
                          : "font-bold text-[#868686]"
                      }`}
                      onClick={() => setSelectedDiv("Closed Cases")}
                    >
                      Closed Cases
                    </div>
                  </div>
                  <hr />
                  <div className="mt-5 ml-1 mr-1">
                    {selectedDiv && (
                      <div>
                        {selectedDiv === "All Cases" && (
                          <div>
                          <table className="w-full border-collapse border border-slate-400 ... ">
                            <thead>
                              <tr className="">
                                <th className="w-[50px] text-[#6D6D6D] border border-slate-300 ... bg-[#F6F9FF]"></th>
                                <th className="w-[200px] text-[#6D6D6D] border border-slate-300 ... bg-[#F6F9FF]">
                                  Cases Title
                                </th>
                                <th className="text-center text-[#6D6D6D] w-[300px] border border-slate-300 ... bg-[#F6F9FF]">
                                  Case Number
                                </th>
                                <th className="w-[200px] text-center text-[#6D6D6D] border border-slate-300 ... bg-[#F6F9FF]">
                                  Court Number
                                </th>

                                <th className="w-[300px] text-center text-[#6D6D6D] border border-slate-300 ... bg-[#F6F9FF]">
                                  Consultant by
                                </th>

                                <th className="w-[150px] text-center text-[#6D6D6D] border border-slate-300 ... bg-[#F6F9FF]"></th>
                              </tr>
                            </thead>
                            <tbody>
                              {!!data?.length && currentItems?.map((item) => (
                                <tr  className="border border-slate-300 cursor-pointer" key={item._id}>
                                  <td className="text-center p-5 border border-slate-300 ... bg-[#F6F9FF]">
                                    <span class="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                      New
                                    </span>
                                  </td>
                                  <td onClick={()=>{
                                    setCaseDetails(true)
                                  fetchSingleCase(item._id)
                                  }} className="text-center text-[#0F2C64] p-5 border border-slate-300 ...  bg-[#F6F9FF]">
                                    {item.caseTitle}
                                  </td>
                                  <td className="w-[200px] text-[#0F2C64] text-center bg-[#F6F9FF]">
                                    {item.caseNumber}
                                  </td>
                                  <td className="w-[200px] text-[#0F2C64] text-center  bg-[#F6F9FF]">
                                    {item.courtNumber}
                                  </td>

                                  <td className="w-[50px]  text-[#0F2C64] text-center  bg-[#F6F9FF]">
                                    <div className="flex justify-center items-center gap-2">
                                      <img
                                        src={item.userId?.image}
                                        alt=""
                                        className="w-[50px] h-[50px] rounded-full"
                                      />
                                      {item.judge}
                                    </div>
                                  </td>

                                  <td className="w-[50px] text-center  bg-[#F6F9FF]">
                                    <span className="flex gap-2 justify-center">
                                      <img src={download} alt="" />
                                      <img
                                        src={deletebtn}
                                        alt=""
                                        onClick={() => setDelete(item._id)}
                                        className="cursor-pointer"
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
                                    <button onClick={()=>handleDelete(isDelete)} className="w-[120px] h-[40px]  text-black font-bold rounded-lg">
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
                                        src={editbtn}
                                        alt=""
                                        onClick={() => {
                                          fetchSingleCase(item._id)
                                          setEditcases(true);
                                          setEditItemId(item._id);

                                        }}
                                      />
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          </div>
                          
                        )}

                        {selectedDiv === "Old Cases" && (
                          <table className="w-full border-collapse border border-slate-400 ... ">
                            <thead>
                              <tr>
                                <th className="w-[50px] text-[#6D6D6D] border border-slate-300 ... bg-[#F6F9FF]"></th>
                                <th className="w-[200px] text-[#6D6D6D] border border-slate-300 ... bg-[#F6F9FF]">
                                  Cases Title
                                </th>
                                <th className="text-center text-[#6D6D6D] w-[300px] border border-slate-300 ... bg-[#F6F9FF]">
                                  Case Number
                                </th>
                                <th className="w-[200px] text-center text-[#6D6D6D] border border-slate-300 ... bg-[#F6F9FF]">
                                  Court Number
                                </th>

                                <th className="w-[300px] text-center text-[#6D6D6D] border border-slate-300 ... bg-[#F6F9FF]">
                                  Consultant by
                                </th>

                                <th className="w-[150px] text-center text-[#6D6D6D] border border-slate-300 ... bg-[#F6F9FF]"></th>
                              </tr>
                            </thead>
                            <tbody>
                              {currentItems?.map((item) => (
                                <tr  className="border cursor-pointer border-slate-300" key={item._id}>
                                  <td className="text-center p-5 border border-slate-300 ... bg-[#F6F9FF]">
                                    <span class="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                      New
                                    </span>
                                  </td>
                                  <td onClick={()=>{setCaseDetails(true)
                                  fetchSingleCase(item._id)}} className="text-center text-[#0F2C64] p-5 border border-slate-300 ...  bg-[#F6F9FF]">
                                    {item.caseTitle}
                                  </td>
                                  <td className="w-[200px]  text-[#0F2C64] text-center bg-[#F6F9FF]">
                                    {item.caseNumber}
                                  </td>
                                  <td className="w-[200px] text-[#0F2C64] text-center  bg-[#F6F9FF]">
                                    {item.courtNumber}
                                  </td>

                                  <td className="w-[50px] text-[#0F2C64] text-center  bg-[#F6F9FF]">
                                    <div className="flex justify-center items-center gap-2">
                                      <img
                                        src={item.userId?.image}
                                        alt=""
                                        className="w-[50px]  text-[#0F2C64] h-[50px] rounded-full"
                                      />
                                      {item.judge}
                                    </div>
                                  </td>

                                  <td className="w-[50px] text-[#0F2C64] text-center  bg-[#F6F9FF]">
                                    <span className="flex gap-2 justify-center">
                                      <img src={download} alt="" />
                                      <img
                                        src={deletebtn}
                                        alt=""
                                        onClick={() => setDelete(item._id)}
                                        className="cursor-pointer"
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
                                    <button onClick={()=>handleDelete(isDelete)} className="w-[120px] h-[40px]  text-black font-bold rounded-lg">
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
                                        src={editbtn}
                                        alt=""
                                        onClick={() => {
                                          fetchSingleCase(item._id)
                                          setEditcases(true);
                                          setEditItemId(item._id);
                                        }}
                                      />
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        )}
                        {selectedDiv === "New Cases" && (
                          <table className="w-full border-collapse border border-slate-400 ... ">
                            <thead>
                              <tr>
                                <th className="w-[50px] text-[#6D6D6D] border border-slate-300 ... bg-[#F6F9FF]"></th>
                                <th className="w-[200px] text-[#6D6D6D] border border-slate-300 ... bg-[#F6F9FF]">
                                  Cases Title
                                </th>
                                <th className="text-center text-[#6D6D6D] w-[300px] border border-slate-300 ... bg-[#F6F9FF]">
                                  Case Number
                                </th>
                                <th className="w-[200px] text-center text-[#6D6D6D] border border-slate-300 ... bg-[#F6F9FF]">
                                  Court Number
                                </th>

                                <th className="w-[300px] text-center text-[#6D6D6D] border border-slate-300 ... bg-[#F6F9FF]">
                                  Consultant by
                                </th>

                                <th className="w-[150px] text-center text-[#6D6D6D] border border-slate-300 ... bg-[#F6F9FF]"></th>
                              </tr>
                            </thead>
                            <tbody>
                              {currentItems?.map((item) => (
                                <tr  className="border border-slate-300 cursor-pointer" key={item._id}>
                                  <td className="text-center p-5 border border-slate-300 ... bg-[#F6F9FF]">
                                    <span class="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                      New
                                    </span>
                                  </td>
                                  <td onClick={()=>{setCaseDetails(true) 
                                  fetchSingleCase(item._id)}} className="text-center text-[#0F2C64] p-5 border border-slate-300 ...  bg-[#F6F9FF]">
                                    {item.caseTitle}
                                  </td>
                                  <td className="w-[200px] text-[#0F2C64] text-center bg-[#F6F9FF]">
                                    {item.caseNumber}
                                  </td>
                                  <td className="w-[200px] text-[#0F2C64] text-center  bg-[#F6F9FF]">
                                    {item.courtNumber}
                                  </td>

                                  <td className="w-[50px] text-[#0F2C64] text-center  bg-[#F6F9FF]">
                                    <div className="flex justify-center items-center gap-2">
                                      <img
                                        src={item.userId?.image}
                                        alt=""
                                        className="w-[50px] h-[50px] rounded-full"
                                      />
                                      {item.judge}
                                    </div>
                                  </td>

                                  <td className="w-[50px] text-center  bg-[#F6F9FF]">
                                    <span className="flex gap-2 justify-center">
                                      <img src={download} alt="" />
                                      <img
                                        src={deletebtn}
                                        alt=""
                                        onClick={() => setDelete(item._id)}
                                        className="cursor-pointer"
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
                                    <button onClick={()=>handleDelete(isDelete)} className="w-[120px] h-[40px]  text-black font-bold rounded-lg">
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
                                        src={editbtn}
                                        alt=""
                                        onClick={() => {
                                          fetchSingleCase(item._id)
                                          setEditcases(true);
                                          setEditItemId(item._id);
                                        }}
                                      />
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        )}

                        {selectedDiv === "Judgement Cases" && (
                          <table className="w-full border-collapse border border-slate-400 ... ">
                            <thead>
                              <tr>
                                <th className="w-[50px] text-[#6D6D6D] border border-slate-300 ... bg-[#F6F9FF]"></th>
                                <th className="w-[200px] text-[#6D6D6D] border border-slate-300 ... bg-[#F6F9FF]">
                                  Cases Title
                                </th>
                                <th className="text-center text-[#6D6D6D] w-[300px] border border-slate-300 ... bg-[#F6F9FF]">
                                  Case Number
                                </th>
                                <th className="w-[200px] text-center text-[#6D6D6D] border border-slate-300 ... bg-[#F6F9FF]">
                                  Court Number
                                </th>

                                <th className="w-[300px] text-center text-[#6D6D6D] border border-slate-300 ... bg-[#F6F9FF]">
                                  Consultant by
                                </th>

                                <th className="w-[150px] text-center text-[#6D6D6D] border border-slate-300 ... bg-[#F6F9FF]"></th>
                              </tr>
                            </thead>
                            <tbody>
                              {currentItems?.map((item) => (
                                <tr onClick={()=>{setCaseDetails(true) 
                                  fetchSingleCase(item._id)}} className="border border-slate-300 cursor-pointer" key={item._id}>
                                  <td className="text-center p-5 border border-slate-300 ... bg-[#F6F9FF]">
                                    <span class="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                      New
                                    </span>
                                  </td>
                                  <td className="text-center text-[#0F2C64] p-5 border border-slate-300 ...  bg-[#F6F9FF]">
                                    {item.caseTitle}
                                  </td>
                                  <td className="w-[200px] text-[#0F2C64] text-center bg-[#F6F9FF]">
                                    {item.caseNumber}
                                  </td>
                                  <td className="w-[200px] text-[#0F2C64] text-center  bg-[#F6F9FF]">
                                    {item.courtNumber}
                                  </td>

                                  <td className="w-[50px] text-[#0F2C64] text-center  bg-[#F6F9FF]">
                                    <div className="flex justify-center items-center gap-2">
                                      <img
                                        src={item.userId?.image}
                                        alt=""
                                        className="w-[50px] h-[50px] rounded-full"
                                      />
                                      {item.judge}
                                    </div>
                                  </td>

                                  <td className="w-[50px] text-center  bg-[#F6F9FF]">
                                    <span className="flex gap-2 justify-center">
                                      <img src={download} alt="" />
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        )}
                        {selectedDiv === "Closed Cases" && (
                          <table className="w-full border-collapse border border-slate-400 ... ">
                            <thead>
                              <tr>
                                <th className="w-[50px] text-[#6D6D6D] border border-slate-300 ... bg-[#F6F9FF]"></th>
                                <th className="w-[200px] text-[#6D6D6D] border border-slate-300 ... bg-[#F6F9FF]">
                                  Cases Title
                                </th>
                                <th className="text-center text-[#6D6D6D] w-[300px] border border-slate-300 ... bg-[#F6F9FF]">
                                  Case Number
                                </th>
                                <th className="w-[200px] text-center text-[#6D6D6D] border border-slate-300 ... bg-[#F6F9FF]">
                                  Court Number
                                </th>

                                <th className="w-[300px] text-center text-[#6D6D6D] border border-slate-300 ... bg-[#F6F9FF]">
                                  Consultant by
                                </th>

                                <th className="w-[150px] text-center text-[#6D6D6D] border border-slate-300 ... bg-[#F6F9FF]"></th>
                              </tr>
                            </thead>
                            <tbody>
                              {currentItems?.map((item) => (
                                <tr onClick={()=>{setCaseDetails(true)
                                  fetchSingleCase(item._id)}} className="border border-slate-300 cursor-pointer" key={item._id}>
                                  <td className="text-center p-5 border border-slate-300 ... bg-[#F6F9FF]">
                                    <span class="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                      New
                                    </span>
                                  </td>
                                  <td className="text-center text-[#0F2C64] p-5 border border-slate-300 ...  bg-[#F6F9FF]">
                                    {item.caseTitle}
                                  </td>
                                  <td className="w-[200px] text-[#0F2C64] text-center bg-[#F6F9FF]">
                                    {item.caseNumber}
                                  </td>
                                  <td className="w-[200px] text-[#0F2C64] text-center  bg-[#F6F9FF]">
                                    {item.courtNumber}
                                  </td>

                                  <td className="w-[50px] text-[#0F2C64] text-center  bg-[#F6F9FF]">
                                    <div className="flex justify-center items-center gap-2">
                                      <img
                                        src={item.userId?.image}
                                        alt=""
                                        className="w-[50px] h-[50px] rounded-full"
                                      />
                                      {item.judge}
                                    </div>
                                  </td>

                                  <td className="w-[50px] text-center  bg-[#F6F9FF]">
                                    <span className="flex gap-2 justify-center">
                                      <img src={download} alt="" />
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        )}
                                  <nav
              className="flex items-center flex-column flex-wrap md:flex-row justify-end px-4"
              aria-label="Table navigation"
            >

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
                    )}

                  </div>
                </>
              </>
            )}
          </>
        </>
      )}
    </>
  );
};

export default Cases;
