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
import { createApiData, deleteApiData, fetchApiData, updateApiData } from "../utlis";
const Blog = () => {
  const [loading, setLoading] = useState(true);
  const [addbanner, setaddbanner] = useState(false);
  const [editBanner, setEditbanner] = useState(false);

  const [data, setData] = useState("");
  const [category, setCategory] = useState([]);
  const [bannerInfo, setBannerInfo] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [desc, setDesc] = useState("");
  const [blogCategoryId, setBlogCategoryId] = useState("");
  const [isDelete , setDelete] = useState(false)

  const [editItemId, setEditItemId] = useState(null);

  /////////fetch banner ///////////
  async function fetchbanner() {
    const data = await fetchApiData(`${Baseurl}/api/v1/Blog/getBlog`);
    setData(data?.data?.reverse());
  }

  const fetchSingleBanner = async(id) =>{
    const data = await fetchApiData(`${Baseurl}/api/v1/Blog/getIdBlog/${id}`)

    setBannerInfo(data?.data);
  }

  async function fetchCategory() {
    const data = await fetchApiData(`${Baseurl}/api/v1/BlogCategory/getBlogCategory`)
    setCategory(data?.data);
  }

  useEffect(() => {
    fetchbanner();
    fetchCategory()
    setTimeout(() => {
      setLoading();
    }, 1000);
  }, []);

  ////////create Banner ////////////
  const handlecreateBanner = async (e) => {
    e.preventDefault();

    console.log({ title, image });

    const formData = new FormData();
    formData.append("description", desc);
    formData.append("image", image);
    formData.append("title", title);
    formData.append("blogCategoryId", blogCategoryId || category[0]?._id);

    try {
      await createApiData(
        `${Baseurl}/api/v1/Blog/createBlog`,
        formData
      );
      alert("Data added successfully");
      setaddbanner(false);
      fetchbanner();
    } catch (error) {
      console.error("Error adding data:", error);
    }



  };

  /////////////////Delete Banner///////////

  async function handledelete(_id) {

    try {
      await deleteApiData(`${Baseurl}/api/v1/Blog/deleteBlog/${_id}`);
      setDelete(false)
      fetchbanner()

    } catch (err) {
      console.log(err);
    }
    
  }

  //////////edit banner/////////
  const handleeditbanner = async(e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("description", desc);
    formData.append("image", image);
    formData.append("title", title);
    formData.append("blogCategoryId", blogCategoryId || bannerInfo?.blogCategoryId);

    try {
      await updateApiData(
        `${Baseurl}/api/v1/Blog/updateBlog/${editItemId}`,
        formData
      );
      alert("Data Edited Successfully");
      setEditbanner(false);
      fetchbanner();
    } catch (error) {
      console.error("Error editing data:", error);
    }

  
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
               Blog
               <br />
               <span className="text-[15px] text-[#525252]">
                 Edit,Delete or Push Blog
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
                 <label>Blog Title</label>
                 <br />
                 <input
                   value={title || bannerInfo?.title}
                   onChange={(e) => setTitle(e.target.value)}
                   placeholder="Blog Title"
                   className="placeholder: block w-[450px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                 />
               </div>
               <div>
                 <label>Category</label>
                 <br />
                 <select name=""  className="placeholder: block w-[150px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" id="" value={blogCategoryId || bannerInfo?.blogCategoryId}
             onChange={(e) => setBlogCategoryId(e.target.value)}>
               {
                 category?.map((d,i)=>(
                   <option value={d?._id}>{d?.title}</option>

                 ))
               }
                 </select>
               
               </div>
             
             </div>
             <div className="ml-10 mt-5">
               <div>
                 <label>Blog Content</label>
                 <br />
                 <input
                   placeholder="Blog Content"
                   value={desc || bannerInfo?.description}
                   onChange={(e) => setDesc(e.target.value)}
                   className="placeholder: block w-[82%] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                 />
               </div>
             </div>

             <div className="m-10">
               <label>Upload Blog Image</label>

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
                     {image?.name || "upload Image From Device /Browser"}
                     </div>
                   </div>
                 </div>
               </div>
             </div>

             <div className="flex justify-end gap-5 mr-5">
               <div onClick={()=> setaddbanner(false)} className="text-[#0F2C64] p-2 pl-5 pr-5 rounded bg-white border border-[#0F2C64] cursor-pointer">
                 Cancel
               </div>
               <button
                 type="submit"
                 className="bg-[#0F2C64] p-2 pl-5 pr-5 rounded text-white flex justify-center items-center gap-2 cursor-pointer"
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
                        Blog
                        <br />
                        <span className="text-[15px] text-[#525252]">
                          Edit,Delete or Push Blog
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
                          <label>Blog Title</label>
                          <br />
                          <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Blog Title"
                            className="placeholder: block w-[450px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                        <div>
                          <label>Category</label>
                          <br />
                          <select name=""  className="placeholder: block w-[150px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" id="" value={blogCategoryId}
                      onChange={(e) => setBlogCategoryId(e.target.value)}>
                        {
                          category?.map((d,i)=>(
                            <option value={d?._id}>{d?.title}</option>

                          ))
                        }
                          </select>
                        
                        </div>
                      
                      </div>
                      <div className="ml-10 mt-5">
                        <div>
                          <label>Blog Content</label>
                          <br />
                          <input
                            placeholder="Blog Content"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                            className="placeholder: block w-[82%] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="m-10">
                        <label>Upload Blog Image</label>

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
                              {image?.name || "upload Image From Device /Browser"}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end gap-5 mr-5">
                        <div onClick={()=> setaddbanner(false)} className="text-[#0F2C64] p-2 pl-5 pr-5 rounded bg-white border border-[#0F2C64] cursor-pointer">
                          Cancel
                        </div>
                        <button
                          type="submit"
                          className="bg-[#0F2C64] p-2 pl-5 pr-5 rounded text-white flex justify-center items-center gap-2 cursor-pointer"
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
                    Blog
                    </div>
                    <div className="flex">
                      <div className="flex justify-center items-center gap-5">
                        <button
                          className="bg-[#0F2C64] p-2 pl-5 pr-5 rounded-3xl text-white"
                          onClick={() => setaddbanner(true)}
                        >
                          Create Blog +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="ml-5 mr-5 mt-5">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-t-2 border-b-2 m-5">
                          <th className="text-center text-[#6D6D6D] w-[100px]">
                          Blog
                          </th>
                          <th className="w-[100px] text-center text-[#6D6D6D]">
                            Title
                          </th>
                         
                          <th className="w-[150px] text-center text-[#6D6D6D]">
                          Blog Description
                          </th>
                        </tr>
                      </thead>
                      <tbody className="mt-4">
                        {!!data?.length && data?.map((item) => (
                          <tr
                            className="border-t-2 border-b-2 m-5"
                            key={item._id}
                          >
                            <td className="flex justify-center items-center h-[70px]">
                              <img
                                src={item?.image}
                                alt=""
                                type="file"
                                className="w-16 h-10 border border-[#0F2C6426]"
                              />
                            </td>
                            <td className="w-[100px]  text-center p-2">
                              {item?.title}
                            </td>
                           
                            <td className="w-[200px] text-left p-2">
                            {item?.description}
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
                                  onClick={(e) => setDelete(item._id)}
                                />
                                {isDelete &&
                          <>
                            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
                              <div className="relative w-auto my-6 mx-auto max-w-5xl">
                                <div className="border-1 border-[#CACACA] rounded-lg relative py-4 flex flex-col w-[400px] h-[200px] bg-white outline-none focus:outline-none">
                                  <div className="text-center font-semibold text-[20px]">
                                    Confirm Delete Blog ?
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
                                <img
                                  src={editbtn}
                                  alt=""
                                  className="cursor-pointer"
                                  onClick={(e) => {
                                    fetchSingleBanner(item._id)
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

export default Blog;
