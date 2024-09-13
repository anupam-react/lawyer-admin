import React, { useEffect, useState } from "react";
import deletebtn from "../Assets/dltbtn.svg";
import { FaSearch } from "react-icons/fa";
import edit from "../Assets/edit.svg";
import upload from "../Assets/upload.svg";
import property from "../Assets/department/property.svg";
import corporate from "../Assets/department/corporate.svg";
import civil from "../Assets/department/civil.svg";
import criminal from "../Assets/department/criminal.svg";
import { X } from "lucide-react";
import config, { headers } from "../utlis/config";
import { Baseurl } from "../utlis/apiservices";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  createApiData,
  deleteApiData,
  fetchApiData,
  updateApiData,
} from "../utlis";

const Terms = () => {
  const [addservice, setaddserveice] = useState(false);
  const [editservice, setEditService] = useState(false);

  const [singleServices, setSingleServices] = useState();
  const [content, setContent] = useState("");
  const [editItemId, setEditItemId] = useState(null);
  const navigate = useNavigate();

  /////fetch service//////////

  async function fetchservice() {
    const data = await fetchApiData(`${Baseurl}/api/v1/Term/all`);
    setSingleServices(data?.data);
  }

  useEffect(() => {
    fetchservice();
  }, []);

  ////////////create department//////////
  // const handlecreateservice = async (e) => {
  //   e.preventDefault();

  //   try {
  //     await createApiData(`${Baseurl}/api/v1/privacy/add`, {
  //       content: content,
  //     });
  //     alert("Privacy Policy added successfully");
  //     setaddserveice(false);
  //     setContent("");

  //     fetchservice();
  //   } catch (error) {
  //     console.error("Error adding data:", error);
  //   }
  // };

  ///////update Department///////
  const handleEditService = async (e) => {
    e.preventDefault();
    console.log(editItemId);

    try {
      await updateApiData(`${Baseurl}/api/v1/Term/update/${singleServices?._id}`, {
        content: content,
      });
      alert("Data Edited successfully");
      setEditService(false);
      fetchservice();
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };
  return (
    <div>
      {addservice ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
            <div className="relative w-auto my-6 mx-auto max-w-5xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-[600px] bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 rounded-t">
                  <h3 className="text-xl font-semibold">
                    Create Manager
                    <br />
                    <span className="text-[15px] text-[#525252]">
                      Customize and add Policy
                    </span>
                  </h3>

                  <span
                    onClick={() => setaddserveice(false)}
                    className="cursor-pointer"
                  >
                    <X />
                  </span>
                </div>
                <form onSubmit={handlecreateservice}>
                  <div className=" justify-center flex mt-4">
                    <div>
                      <label>Content</label>
                      <br />
                      <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Add Policy Content"
                        className="placeholder: block w-[533px] h-40 rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-5 m-5">
                    <div
                      className="text-[#0F2C64] p-2 pl-5 pr-5 rounded bg-white border border-[#0F2C64] cursor-pointer"
                      onClick={() => setaddserveice(false)}
                    >
                      Cancel
                    </div>
                    <button
                      type="submit"
                      className="bg-[#0F2C64] p-2 pl-5 pr-5 rounded text-white flex justify-center cursor-pointer items-center gap-2"
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
      {editservice ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
            <div className="relative w-auto my-6 mx-auto max-w-5xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-[600px] bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 rounded-t">
                  <h3 className="text-xl font-semibold">
                    Edit Terms And Conditions
                    <br />
                    <span className="text-[15px] text-[#525252]">
                      Customize and change Terms And Conditions
                    </span>
                  </h3>

                  <span
                    onClick={() => setEditService(false)}
                    className="cursor-pointer"
                  >
                    <X />
                  </span>
                </div>
                <div>
                  <div className=" justify-center flex mt-4">
                    <div>
                      <label>Description</label>
                      <br />
                      <textarea
                        value={content || singleServices?.content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Update Terms And Conditions Content"
                        className="placeholder: block w-[533px] h-40 rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-5 m-5">
                    <div
                      className="text-[#0F2C64] p-2 pl-5 pr-5 rounded bg-white border border-[#0F2C64] cursor-pointer"
                      onClick={() => setEditService(false)}
                    >
                      Cancel
                    </div>
                    <button
                      type="submit"
                      onClick={handleEditService}
                      className="bg-[#0F2C64] p-2 pl-5 pr-5 rounded text-white flex justify-center items-center gap-2 cursor-pointer"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      <div>
        <div className="flex justify-end">
          {/* <div className="flex justify-center items-center gap-5">
            <button
              className="bg-[#0F2C64] p-1 pl-3 pr-3 rounded text-white"
              onClick={() => setaddserveice(true)}
            >
              Create Policy
            </button>
          </div> */}
          <div className="flex justify-center items-center gap-3">
            <div>
              <img
                src={edit}
                alt=""
                onClick={() => {
                  setEditService(true);
                }}
                className="cursor-pointer"
              />
            </div>
          </div>
        </div>
        <div className="bg-[#0F2C64] text-center py-8">
          <p className="text-white text-[40px]">Terms And Conditions</p>
          <p className="text-white">{singleServices?.content}</p>
        </div>
      </div>
    </div>
  );
};

export default Terms;
