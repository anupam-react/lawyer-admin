import React, { useEffect, useState } from "react";
import bellicon from "../Assets/Banners/bellicon.svg";
import deletebtn from "../Assets/Banners/deletebtn.svg";
import editbtn from "../Assets/Banners/editbtn.svg";
import upload from "../Assets/upload.svg";
import goback from "../Assets/goback.svg";
import axios from "axios";
import { Baseurl } from "../utlis/apiservices";
import { headers } from "../utlis/config";
import { Navigate } from "react-router-dom";
import Spinner from "../utlis/Spinner";
const Banners = () => {
  const [loading, setLoading] = useState(true);
  const [addbanner, setaddbanner] = useState(false);
  const [editBanner, setEditbanner] = useState(false);

  const [data, setData] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);

  const [editItemId, setEditItemId] = useState(null);

  /////////fetch banner ///////////
  function fetchbanner() {
    axios
      .get(`${Baseurl}/api/v1/admin/AllBanner`)
      .then((response) => {
        setData(response.data);
        // console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }
  useEffect(() => {
    fetchbanner();
    setTimeout(() => {
      setLoading();
    }, 1000);
  }, []);

  ////////create Banner ////////////
  const handlecreateBanner = (e) => {
    e.preventDefault();

    console.log({ title, image });

    const formData = new FormData();
    formData.append("desc", title);
    formData.append("image", image);

    axios
      .post(`${Baseurl}/api/v1/admin/CreateBanner`, formData, {
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
        .delete(`${Baseurl}/api/v1/admin/delete/${_id}`)
        .then((res) => {
          alert("record had deleted");
          window.location.reload();
          Navigate("/Banners");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      Navigate("/Banners");
    }
  }

  //////////edit banner/////////
  const handleeditbanner = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("desc", title);
    formData.append("image", image);

    axios
      .put(`${Baseurl}/api/v1/admin/updateBanner/${editItemId}`, formData, {
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
      {loading ? (
        <Spinner />
      ) : (
        <>
          {editBanner ? (
            <div className="rounded h-[700px]">
              <div className="flex  justify-between items-center pt-5 ml-5 mr-5">
                <div className="text-2xl mb-5  text-black font-semibold">
                  Banners
                  <br />
                  <span className="text-[15px] text-[#525252]">
                    Edit,Delete or Push Banner
                  </span>
                </div>
                <div className="flex justify-center items-center gap-5">
                  <button
                    className="text-[#0F2C64] pr-1 rounded bg-white border border-[#0F2C64] flex items-center"
                    onClick={() => {
                      setEditbanner(false);
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

              <form onSubmit={handleeditbanner}>
                <div className="flex flex-wrap gap-5 ml-10 mt-10">
                  <div>
                    <label>Banner Title</label>
                    <br />
                    <input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Banner Title"
                      className="placeholder: block w-[450px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <div>
                    <label>Date Added</label>
                    <br />
                    <input
                      type="date"
                      className="placeholder: block w-[150px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <div>
                    <label>Url Link</label>
                    <br />
                    <input
                      placeholder="Url Link"
                      className="placeholder: block w-[300px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="ml-10 mt-5">
                  <div>
                    <label>Banner Content</label>
                    <br />
                    <input
                      placeholder="Banner Content"
                      className="placeholder: block w-[82%] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="m-10">
                  <label>Upload Banner Cover</label>

                  <div className="bg-[#E6EEFD] h-[150px] w-[600px] rounded-xl">
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

                <div className="ml-10">
                  <label>Status</label>
                  <br />
                  <select className="w-[450px] h-[35px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    <option>Enable</option>
                    <option>Disable</option>
                  </select>
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
          ) : (
            <>
              {addbanner ? (
                <>
                  <div className="rounded h-[700px]">
                    <div className="flex  justify-between items-center pt-5 ml-5 mr-5">
                      <div className="text-2xl mb-5  text-black font-semibold">
                        Banners
                        <br />
                        <span className="text-[15px] text-[#525252]">
                          Edit,Delete or Push Banner
                        </span>
                      </div>
                      <div className="flex justify-center items-center gap-5">
                        <button
                          className="text-[#0F2C64] pr-1 rounded bg-white border border-[#0F2C64] flex items-center"
                          onClick={() => {
                            setaddbanner(false);
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

                    <form onSubmit={handlecreateBanner}>
                      <div className="flex flex-wrap gap-5 ml-10 mt-10">
                        <div>
                          <label>Banner Title</label>
                          <br />
                          <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Banner Title"
                            className="placeholder: block w-[450px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                        <div>
                          <label>Date Added</label>
                          <br />
                          <input
                            type="date"
                            className="placeholder: block w-[150px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                        <div>
                          <label>Url Link</label>
                          <br />
                          <input
                            placeholder="Url Link"
                            className="placeholder: block w-[300px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                      <div className="ml-10 mt-5">
                        <div>
                          <label>Banner Content</label>
                          <br />
                          <input
                            placeholder="Banner Content"
                            className="placeholder: block w-[82%] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="m-10">
                        <label>Upload Banner Cover</label>

                        <div className="bg-[#E6EEFD] h-[150px] w-[600px] rounded-xl">
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
                                  <img
                                    src={upload}
                                    alt=""
                                    className="w-[50px]"
                                  />
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
                  <div className="flex justify-between items-center pt-5 ml-5 mr-5">
                    <div className="text-2xl mb-5 text-[black] font-semibold ">
                      Banners
                    </div>
                    <div className="flex">
                      <div className="flex justify-center items-center gap-5">
                        <button
                          className="bg-[#0F2C64] p-2 pl-5 pr-5 rounded-3xl text-white"
                          onClick={() => setaddbanner(true)}
                        >
                          Create Banners +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="ml-5 mr-5 mt-5">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-t-2 border-b-2 m-5">
                          <th className="text-center text-[#6D6D6D] w-[100px]">
                            Banner
                          </th>
                          <th className="w-[100px] text-center text-[#6D6D6D]">
                            Title
                          </th>
                          <th className="w-[150px] text-center text-[#6D6D6D]">
                            Url Link
                          </th>
                          <th className="w-[150px] text-center text-[#6D6D6D]">
                            Banner info
                          </th>
                        </tr>
                      </thead>
                      <tbody className="mt-4">
                        {data?.data?.map((item) => (
                          <tr
                            className="border-t-2 border-b-2 m-5"
                            key={item._id}
                          >
                            <td className="flex justify-center items-center h-[70px]">
                              <img
                                src={item.image}
                                alt=""
                                type="file"
                                className="w-10"
                              />
                            </td>
                            <td className="w-[100px]  text-center p-2">
                              {item.desc}
                            </td>
                            <td className="w-[150px] text-center p-2">
                              Loreum Ipsum
                            </td>
                            <td className="w-[200px] text-left p-2">
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Proin ut suscipit eros
                            </td>
                            <td className="w-[150px]">
                              <span className="flex ml-20 gap-5">
                                <img
                                  src={bellicon}
                                  alt=""
                                  className="cursor-pointer"
                                />
                                <img
                                  src={deletebtn}
                                  alt=""
                                  className="cursor-pointer"
                                  onClick={(e) => handledelete(item._id)}
                                />
                                <img
                                  src={editbtn}
                                  alt=""
                                  className="cursor-pointer"
                                  onClick={(e) => {
                                    setEditbanner(true);
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
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default Banners;
