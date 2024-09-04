import React, { useEffect, useState } from "react";
import deletebtn from "../Assets/dltbtn.svg";
import edit from "../Assets/edit.svg";

import { X } from "lucide-react";
import { Baseurl } from "../utlis/apiservices";
import {
  createApiData,
  deleteApiData,
  fetchApiData,
  updateApiData,
} from "../utlis";
const Language = () => {
  const [addservice, setaddserveice] = useState(false);
  const [editservice, setEditService] = useState(false);
  const [name, setName] = useState("");
  const [data, setData] = useState("");
  const [singleServices, setSingleServices] = useState();
  const [selectedServices, setSelectedServices] = useState([]);
  const [editItemId, setEditItemId] = useState(null);
  const [isDelete, setDelete] = useState(false);
  

  /////fetch service//////////

  async function fetchservice() {
    const data = await fetchApiData(`${Baseurl}/api/v1/admin/Language/All`);
    setData(data?.data);
  }
  async function fetchSingleServices(id) {
    const data = await fetchApiData(`${Baseurl}/api/v1/admin/Language/${id}`);
    setSingleServices(data?.data);
  }
  useEffect(() => {
    fetchservice();
  }, []);

  ////////////create department//////////
  const handlecreateservice = async (e) => {
    e.preventDefault();

    const formData = { language: name };

    try {
      await createApiData(`${Baseurl}/api/v1/admin/createLanguage`, formData);
      alert("Language added successfully");
      setaddserveice(false);
      setName("");
      fetchservice();
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  /////////////////Delete Banner///////////

  async function handledelete(_id) {
    try {
      await deleteApiData(`${Baseurl}/api/v1/admin/Language/${_id}`);
      setDelete(false);
      fetchservice();
    } catch (err) {
      console.log(err);
    }
  }

  // Function to handle checkbox toggle
  const handleCheckboxChange = (itemId) => {
    console.log(itemId);
    setEditItemId(itemId);
    const isSelected = selectedServices.includes(itemId);
    if (isSelected) {
      setSelectedServices(selectedServices.filter((id) => id !== itemId));
    } else {
      setSelectedServices([...selectedServices, itemId]);
    }
  };

  ///////update Department///////
  const handleEditService = async (e) => {
    e.preventDefault();
    console.log(editItemId);

    const formData = { language: name };

    try {
      await updateApiData(
        `${Baseurl}/api/v1/admin/Language/${editItemId}`,
        formData
      );
      alert("Language Edited successfully");
      setEditService(false);
      setName("");
      fetchservice();
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  return (
    <>
      {addservice ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
            <div className="relative w-auto my-6 mx-auto max-w-5xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-[600px] bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 rounded-t">
                  <h3 className="text-xl font-semibold">
                    Create Language
                    <br />
                    <span className="text-[15px] text-[#525252]">
                      Customize and change/add Language
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
                  <div className=" justify-center flex">
                    <div>
                      <label>Language Name</label>
                      <br />
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Service Name"
                        className="placeholder: block w-[533px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                    Edit Language
                    <br />
                    <span className="text-[15px] text-[#525252]">
                      Update Language
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
                  <div className=" justify-center flex">
                    <div>
                      <label>Language Name</label>
                      <br />
                      <input
                        value={name || singleServices?.language}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Service Name"
                        className="placeholder: block w-[533px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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

      <div className="h-[600px]">
        <div className="flex justify-between items-center pt-5 ml-5 mr-5">
          <div className="text-2xl mb-5 text-[black] font-semibold ">
            Languages
          </div>
          <div className="flex">
            <div className="flex justify-center items-center gap-5">
              {/* <div className="relative mt-2 rounded-md">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="bg-[#0F2C64] p-2.5  ml-[-3px] rounded-l-full text-white">
                    <FaSearch />
                  </span>
                </div>
                <input
                  type="text"
                  className="placeholder: ml-2 block w-[250px] rounded-3xl border-0 py-1.5 pl-10 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Search Service"
                />
              </div> */}

              <button
                className="bg-[#0F2C64] p-1 pl-3 pr-3 rounded text-white"
                onClick={() => setaddserveice(true)}
              >
                Create Language
              </button>
            </div>
            <div className="flex justify-center items-center gap-3">
              <div>
                <img
                  src={deletebtn}
                  alt=""
                  className="cursor-pointer"
                  onClick={() => setDelete(selectedServices)}
                />
                {isDelete && (
                  <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
                      <div className="relative w-auto my-6 mx-auto max-w-5xl">
                        <div className="border-1 border-[#CACACA] rounded-lg relative py-4 flex flex-col w-[400px] h-[200px] bg-white outline-none focus:outline-none">
                          <div className="text-center font-semibold text-[20px]">
                            Confirm Delete Language ?
                          </div>
                          <hr className="my-6" />

                          <div className="flex justify-center mt-5">
                            <button
                              onClick={(e) => handledelete(isDelete)}
                              className="w-[120px] h-[40px]  text-black font-bold rounded-lg"
                            >
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
                )}
              </div>
              <div>
                <img
                  src={edit}
                  alt=""
                  onClick={() => {
                    fetchSingleServices(editItemId);
                    setEditService(true);
                  }}
                  className="cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
        <hr />
        {/* <div className="flex justify-end gap-2 items-center mt-3">
          <input type="checkbox" className="w-[18px] h-[18px]" />
          <label className="text-[#6D6D6D]">Select All</label>
        </div> */}

        <div className="flex flex-wrap gap-10 mt-10 ml-10">
          {!!data?.length &&
            data?.map((item) => (
              <div className="cursor-pointer" key={item._id}>
                <div className="box-shadow rounded-lg w-[180px] h-[180px] relative flex flex-col justify-center items-center">
                  <input
                    type="checkbox"
                    className="w-[15px] absolute right-1 top-1 h-[15px]"
                    onChange={() => handleCheckboxChange(item._id)}
                    checked={selectedServices.includes(item._id)}
                  />
                 
                  <div className="flex justify-center mt-5 text-black font-semibold">
                    {item.language}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Language;
