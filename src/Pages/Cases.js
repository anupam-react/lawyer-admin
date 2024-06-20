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

const Cases = () => {
  const [editcases, setEditcases] = useState(false);
  const [newcases, setnewcases] = useState(false);
  const [deletepopup, setDeletepopup] = useState(false);
  const [data, setData] = useState("");

  const [selectedDiv, setSelectedDiv] = useState("All Cases");

  const [caseTitle, setCaseTitle] = useState("");
  const [caseNumber, setCaseNumber] = useState("");
  const [courtName, setCourtName] = useState("");
  const [courtNumber, setCourtNumber] = useState("");
  const [judge, setJudge] = useState("");
  const [lastDateOfHearing, setLastDateOfHearing] = useState("");
  const [nextHearingDate, setNextHearingDate] = useState("");
  const [type, setType] = useState("General");
  const [editItemId, setEditItemId] = useState(null);
  const navigate = useNavigate();
  /////////fetch allcase//////////
  function fetchAllCase() {
    axios
      .get(`${Baseurl}/api/v1/admin/case/all`)
      .then((response) => {
        setData(response.data);
        // console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }
  useEffect(() => {
    fetchAllCase();
  }, []);

  ////////////delete case//////////
  function handleDelete(_id) {
    const confirm = window.confirm("do you want to delete ?");
    if (confirm) {
      axios
        .delete(`${Baseurl}/api/v1/admin/case/delete/${_id}`)
        .then((res) => {
          alert("record had deleted");
          window.location.reload();
          navigate("/cases");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      navigate("/cases");
    }
  }

  ////////create cases //////////////
  const handleCreateCases = (e) => {
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

    axios
      .post(`${Baseurl}/api/v1/admin/case/add`, requestData, {
        headers: headers,
      })
      .then((res) => {
        alert("data added successfully");
        window.location.reload();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  //////Edit Cases //////////
  const handleEditCases = (e) => {
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

    axios
      .patch(`${Baseurl}/api/v1/admin/case/update/${editItemId}`, formData, {
        headers: headers,
      })
      .then((res) => {
        alert("Data Edited Successfully");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error editing data:", error);
      });
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
              <div className="text-center flex items-center gap-1">
                <img src={userimage} alt="" className="w-[82px]" />
                <div className="flex flex-col ">
                  <span className="text-left text-xl">Mr. Shlok Admin</span>
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
                    className="placeholder: block w-[264px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div>
                  <label>Case Title</label>
                  <br />
                  <input
                    value={caseTitle}
                    onChange={(e) => setCaseTitle(e.target.value)}
                    placeholder="Case Title"
                    className="placeholder: block w-[264px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div>
                  <label>Case Category</label>
                  <br />
                  <input
                    value={caseNumber}
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
                    className="placeholder: block w-[264px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div>
                  <label>Case Number</label>
                  <br />
                  <input
                    placeholder="Case Number"
                    className="placeholder: block w-[264px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div>
                  <label>Country</label>
                  <br />
                  <input
                    placeholder="Country"
                    className="placeholder: block w-[264px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div>
                  <label>Name of the Judge</label>
                  <br />
                  <input
                    placeholder="Name of the Judge"
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
                    className="placeholder: block w-[264px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div>
                  <label>Next date of hearing</label>
                  <br />
                  <input
                    placeholder="Next date of hearing"
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
                <button className="text-[#0F2C64] p-2 pl-5 pr-5 rounded bg-white border border-[#0F2C64]">
                  Cancel
                </button>
                <button className="bg-[#0F2C64] p-2 pl-5 pr-5 rounded text-white flex justify-center items-center gap-2">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </>
      ) : (
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

                    <div className="ml-10">
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
                      <button className="text-[#0F2C64] p-2 pl-5 pr-5 rounded bg-white border border-[#0F2C64]">
                        Cancel
                      </button>
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
                              {data?.data?.map((item) => (
                                <tr className="border border-slate-300" key={item._id}>
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
                                        onClick={() => handleDelete(item._id)}
                                        className="cursor-pointer"
                                      />

                                      {deletepopup ? (
                                        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
                                          <div className="w-[380px] h-[150px] bg-white  rounded-lg relative  gap-5 p-3">
                                            <div className="text-center font-semibold">
                                              Confirm Delete Cases ?
                                            </div>
                                            <hr />

                                            <div className="flex justify-center mt-5">
                                              <button className="w-[120px] h-[40px]  text-black font-bold rounded-lg">
                                                Yes
                                              </button>
                                              <button
                                                onClick={() =>
                                                  setDeletepopup(false)
                                                }
                                                className="w-[120px] h-[40px] bg-[#0F2C64] text-white font-bold rounded-lg"
                                              >
                                                Not Now
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      ) : null}
                                      <img
                                        className="cursor-pointer"
                                        src={editbtn}
                                        alt=""
                                        onClick={() => {
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
                              {data?.data?.map((item) => (
                                <tr className="border border-slate-300" key={item._id}>
                                  <td className="text-center p-5 border border-slate-300 ... bg-[#F6F9FF]">
                                    <span class="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                      New
                                    </span>
                                  </td>
                                  <td className="text-center text-[#0F2C64] p-5 border border-slate-300 ...  bg-[#F6F9FF]">
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
                                        onClick={() => handleDelete(item._id)}
                                        className="cursor-pointer"
                                      />

                                      {deletepopup ? (
                                        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
                                          <div className="w-[380px] h-[150px] bg-white  rounded-lg relative  gap-5 p-3">
                                            <div className="text-center font-semibold">
                                              Confirm Delete Cases ?
                                            </div>
                                            <hr />

                                            <div className="flex justify-center mt-5">
                                              <button className="w-[120px] h-[40px]  text-black font-bold rounded-lg">
                                                Yes
                                              </button>
                                              <button
                                                onClick={() =>
                                                  setDeletepopup(false)
                                                }
                                                className="w-[120px] h-[40px] bg-[#0F2C64] text-white font-bold rounded-lg"
                                              >
                                                Not Now
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      ) : null}
                                      <img
                                        className="cursor-pointer"
                                        src={editbtn}
                                        alt=""
                                        onClick={() => {
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
                              {data?.data?.map((item) => (
                                <tr className="border border-slate-300" key={item._id}>
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
                                      <img
                                        src={deletebtn}
                                        alt=""
                                        onClick={() => handleDelete(item._id)}
                                        className="cursor-pointer"
                                      />

                                      {deletepopup ? (
                                        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
                                          <div className="w-[380px] h-[150px] bg-white  rounded-lg relative  gap-5 p-3">
                                            <div className="text-center font-semibold">
                                              Confirm Delete Cases ?
                                            </div>
                                            <hr />

                                            <div className="flex justify-center mt-5">
                                              <button className="w-[120px] h-[40px]  text-black font-bold rounded-lg">
                                                Yes
                                              </button>
                                              <button
                                                onClick={() =>
                                                  setDeletepopup(false)
                                                }
                                                className="w-[120px] h-[40px] bg-[#0F2C64] text-white font-bold rounded-lg"
                                              >
                                                Not Now
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      ) : null}
                                      <img
                                        className="cursor-pointer"
                                        src={editbtn}
                                        alt=""
                                        onClick={() => {
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
                              {data?.data?.map((item) => (
                                <tr className="border border-slate-300" key={item._id}>
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
                              {data?.data?.map((item) => (
                                <tr className="border border-slate-300" key={item._id}>
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
