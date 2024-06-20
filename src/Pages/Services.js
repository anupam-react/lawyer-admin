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
const Services = () => {
  const [addservice, setaddserveice] = useState(false);
  const [editservice, setEditService] = useState(false);
  const [name, setName] = useState("");
  const [data, setData] = useState("");

  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [info, setInfo] = useState("");
  const [image, setImage] = useState("");
  const [selectedServices, setSelectedServices] = useState([]);
  const [editItemId, setEditItemId] = useState(null);
  const navigate = useNavigate();

  /////fetch service//////////
  function fetchservice() {
    axios
      .get(`${Baseurl}/api/v1/admin/service`)
      .then((response) => {
        setData(response.data);
        // console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }
  useEffect(() => {
    fetchservice();
  }, []);

  ////////////create department//////////
  const handlecreateservice = (e) => {
    e.preventDefault();
    console.log({ name, type, category, info });

    const formData = new FormData();
    formData.append("name", name);
    formData.append("type", type);
    formData.append("category", category);
    formData.append("info", info);
    formData.append("image", image);

    axios
      .post(`${Baseurl}/api/v1/admin/createService`, formData, {
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

  /////////////////Delete Banner///////////

  function handledelete(_id) {
    console.log(_id);
    const confirm = window.confirm("do you want to delete ?");
    if (confirm) {
      axios
        .delete(`${Baseurl}/api/v1/admin/service/${_id}`, { headers: headers })
        .then((res) => {
          alert("record had deleted");
          window.location.reload();
          navigate("/services");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      navigate("/services");
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
  const handleEditService = (e) => {
    e.preventDefault();
    console.log(editItemId);
    // console.log(editItemId, name, type, info, category, image);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("type", type);
    formData.append("category", category);
    formData.append("info", info);
    formData.append("image", image);

    axios
      .patch(`${Baseurl}/api/v1/admin/service/${editItemId}`, formData, {
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
      {addservice ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
            <div className="relative w-auto my-6 mx-auto max-w-5xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-[600px] bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 rounded-t">
                  <h3 className="text-xl font-semibold">
                    Create Service
                    <br />
                    <span className="text-[15px] text-[#525252]">
                      Customize and change/add Services
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
                      <label>Service Name</label>
                      <br />
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Service Name"
                        className="placeholder: block w-[533px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className=" justify-center flex gap-9 mt-4">
                    <div>
                      <label>Service Type</label>
                      <br />
                      <input
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        placeholder="Service Type"
                        className="placeholder: block w-[249px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    <div>
                      <label>Service Category</label>
                      <br />
                      <input
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder="Service Category"
                        className="placeholder: block w-[249px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="mt-4 flex flex-col items-center text-left justify-center">
                    <div className="">Upload Service image</div>
                    <div className="bg-[#E6EEFD] h-[150px] w-[533px]  rounded-xl">
                      <div className="p-5 relative rounded-lg h-[200px]">
                        <div className="flex flex-col justify-center text-center mt-3">
                          <label>
                            <input
                              className="text-sm cursor-pointer w-36 hidden"
                              type="file"
                              multiple
                              onChange={(e) => setImage(e.target.files[0])}
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
                  <div className=" justify-center flex mt-4">
                    <div>
                      <label>Additional Service Information</label>
                      <br />
                      <textarea
                        value={info}
                        onChange={(e) => setInfo(e.target.value)}
                        placeholder="Additional Service Information"
                        className="placeholder: block w-[533px] h-40 rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-5 m-5">
                    <button
                      className="text-[#0F2C64] p-2 pl-5 pr-5 rounded bg-white border border-[#0F2C64]"
                      onClick={() => setaddserveice(false)}
                    >
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
                    Edit Department
                    <br />
                    <span className="text-[15px] text-[#525252]">
                      Customize and change/add Services
                    </span>
                  </h3>

                  <span
                    onClick={() => setEditService(false)}
                    className="cursor-pointer"
                  >
                    <X />
                  </span>
                </div>
                <form onSubmit={handleEditService}>
                  <div className=" justify-center flex">
                    <div>
                      <label>Service Name</label>
                      <br />
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Service Name"
                        className="placeholder: block w-[533px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className=" justify-center flex gap-9 mt-4">
                    <div>
                      <label>Service Type</label>
                      <br />
                      <input
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        placeholder="Service Type"
                        className="placeholder: block w-[249px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    <div>
                      <label>Service Category</label>
                      <br />
                      <input
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder="Service Category"
                        className="placeholder: block w-[249px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="mt-4 flex flex-col items-center text-left justify-center">
                    <div className="">Upload Service image</div>
                    <div className="bg-[#E6EEFD] h-[150px] w-[533px]  rounded-xl">
                      <div className="p-5 relative rounded-lg h-[200px]">
                        <div className="flex flex-col justify-center text-center mt-3">
                          <label>
                            <input
                              className="text-sm cursor-pointer w-36 hidden"
                              type="file"
                              multiple
                              onChange={(e) => setImage(e.target.files[0])}
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
                  <div className=" justify-center flex mt-4">
                    <div>
                      <label>Additional Service Information</label>
                      <br />
                      <textarea
                        value={info}
                        onChange={(e) => setInfo(e.target.value)}
                        placeholder="Additional Service Information"
                        className="placeholder: block w-[533px] h-40 rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-5 m-5">
                    <button
                      className="text-[#0F2C64] p-2 pl-5 pr-5 rounded bg-white border border-[#0F2C64]"
                      onClick={() => setEditService(false)}
                    >
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
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

      <div className="h-[600px]">
        <div className="flex justify-between items-center pt-5 ml-5 mr-5">
          <div className="text-2xl mb-5 text-[black] font-semibold ">
            Services
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
                  placeholder="Search Service"
                />
              </div>

              <button
                className="bg-[#0F2C64] p-1 pl-3 pr-3 rounded text-white"
                onClick={() => setaddserveice(true)}
              >
                Create Service
              </button>
            </div>
            <div className="flex justify-center items-center gap-3">
              <div>
                <img
                  src={deletebtn}
                  alt=""
                  className="cursor-pointer"
                  onClick={() => handledelete(selectedServices)}
                />
              </div>
              <div>
                <img
                  src={edit}
                  alt=""
                  onClick={() => setEditService(true)}
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
          {data?.data?.map((item) => (
            <div className="cursor-pointer" key={item._id}>
              <div className="box-shadow rounded-lg w-[180px] h-[180px] relative flex flex-col justify-center items-center">
                <input
                  type="checkbox"
                  className="w-[15px] absolute right-1 top-1 h-[15px]"
                  onChange={() => handleCheckboxChange(item._id)}
                  checked={selectedServices.includes(item._id)}
                />
                <div className="w-[100px] h-[100px] border-2 rounded-full flex justify-center items-center">
                  <img src={item.image} alt="" className="w-10" />
                </div>
                <div className="flex justify-center mt-5 text-black font-semibold">
                  {item.name}
                </div>
              </div>
            </div>
          ))}

          {/* <div className="cursor-pointer">
            <div className="box-shadow  w-[180px] h-[180px] rounded-lg flex flex-col justify-center items-center">
              <div>
                <img src={criminal} alt="" />
              </div>
              <div className="flex justify-center mt-5 text-black font-semibold">
                Criminal Lawyer
              </div>
            </div>
          </div>
          <div className="cursor-pointer">
            <div className="box-shadow w-[180px] h-[180px] rounded-lg flex flex-col justify-center items-center">
              <div>
                <img src={property} alt="" />
              </div>
              <div className="flex justify-center mt-5 text-black font-semibold">
                Tax Lawyer
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Services;
