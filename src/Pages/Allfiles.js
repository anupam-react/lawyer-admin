import React, { useEffect, useState } from "react";
import deletebtn from "../Assets/Banners/deletebtn.svg";
import editbtn from "../Assets/Banners/editbtn.svg";
import download from "../Assets/allfiles/download.svg";
import { X } from "lucide-react";
import upload from "../Assets/upload.svg";
import axios from "axios";
import { Baseurl } from "../utlis/apiservices";
import config, { headers } from "../utlis/config";
import { fetchApiData } from "../utlis";
import { Link } from "react-router-dom";

const Allfiles = () => {
  const [addnewfile, setaddnewfile] = useState(false);
  const [data, setdata] = useState("");

  //////////fetch Allfiles//////////

  async function fetchAllfiles() {
    const data = await fetchApiData(`${Baseurl}/api/v1/admin/getSaveDocument`);
    const extractedDocuments =data?.flatMap(obj => obj.documents);

    // Logging the extracted documents array

    setdata(extractedDocuments);
  }


  useEffect(() => {
    fetchAllfiles();
  }, []);



  return (
    <>
      {addnewfile ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
            <div className="relative w-auto my-6 mx-auto max-w-5xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-[600px] bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 rounded-t">
                  <h3 className="text-xl font-semibold">Upload / Edit File</h3>

                  <span
                    onClick={() => setaddnewfile(false)}
                    className="cursor-pointer"
                  >
                    <X />
                  </span>
                </div>

                <div className=" justify-center flex">
                  <div>
                    <label>File Title</label>
                    <br />
                    <input
                      placeholder="File Title"
                      className="placeholder: block w-[533px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className=" justify-center flex gap-9 mt-4">
                  <div>
                    <label>File Status</label>
                    <br />
                    <input
                      placeholder="File Status"
                      className="placeholder: block w-[249px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <div>
                    <label>File Type</label>
                    <br />
                    <input
                      placeholder="File Type"
                      className="placeholder: block w-[249px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="mt-5 flex justify-center">
                  <div>
                    <label>Upload File</label>

                    <div className="bg-[#E6EEFD] h-[150px] w-[533px] rounded-xl">
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
                </div>

                <div className="flex justify-center gap-5 m-5">
                  <button
                    className="text-[#0F2C64] p-2 pl-5 pr-5 rounded bg-white border border-[#0F2C64]"
                    onClick={() => setaddnewfile(false)}
                  >
                    Cancel
                  </button>
                  <button className="bg-[#0F2C64] p-2 pl-5 pr-5 rounded text-white flex justify-center items-center gap-2">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

      <div className="flex justify-between items-center pt-5 ml-5 mr-5">
        <div className="text-2xl mb-5 text-[black] font-semibold ">
          Upload files
          <br />
          <span className="text-[15px] text-[#525252]">
            Upload and view files
          </span>
        </div>
        {/* <div className="flex">
          <div className="flex justify-center items-center gap-5">
            <button
              className="bg-[#0F2C64] p-2 pl-5 pr-5 rounded-3xl text-white"
              onClick={() => setaddnewfile(true)}
            >
              Upload a New file
            </button>
          </div>
        </div> */}
      </div>
      <div className="mt-5 ml-1 mr-1">
        <table className="w-full border-collapse border border-slate-400 ... ">
          <thead>
            <tr>
              {/* <th className="w-[50px] text-[#6D6D6D] border border-slate-300 ... bg-[#F6F9FF]">
                <input type="checkbox" />
              </th> */}
              <th className="w-[200px] text-[#6D6D6D] border border-slate-300 ... bg-[#F6F9FF]">
                File CaseId
              </th>
              <th className="text-center text-[#6D6D6D] w-[300px] border border-slate-300 ... bg-[#F6F9FF]">
                File Type
              </th>
              <th className="w-[300px] text-center text-[#6D6D6D] border border-slate-300 ... bg-[#F6F9FF]">
                File Status
              </th>

              <th className="w-[200px] text-center text-[#6D6D6D] border border-slate-300 ... bg-[#F6F9FF]">
                Case LawyerId
              </th>

              <th className="w-[150px] text-center text-[#6D6D6D] border border-slate-300 ... bg-[#F6F9FF]"></th>
            </tr>
          </thead>
          <tbody>
            {!!data?.length && data?.map((item) => (
              <tr className="" key={item._id}>
                {/* <td className="text-center p-5 border border-slate-300 ... bg-[#F6F9FF]">
                  <input type="checkbox" />
                </td> */}
                <td className="text-center p-5 border border-slate-300 ... bg-[#F6F9FF]">
                  {item?.id?.casesId
                  }
                </td>
                <td className="w-[200px]  border border-slate-300 ... bg-[#F6F9FF]">
                  <div className="flex justify-center items-center">
                    <img
                      src={item?.id?.image}
                      className="w-[50px] h-[50px]"
                      alt=""
                    />
                  </div>
                </td>
                <td className="w-[200px] text-center border border-slate-300 ... bg-[#F6F9FF] text-sm">
                  {item?.id?.desc}
                </td>

                <td className="w-[50px] text-center border border-slate-300 ... bg-[#F6F9FF]">
                  {item?.id?.lawyerId}
                </td>
                <td className="w-[50px] text-center border border-slate-300 ... bg-[#F6F9FF]">
                <Link to={`${item?.id?.image}`}>
                  <span className="flex gap-2 justify-center">
                    <img src={download} alt="" />
                    {/* <img src={deletebtn} alt="" />
                    <img src={editbtn} alt="" /> */}
                  </span>
                </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Allfiles;
