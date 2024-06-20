import { FaSearch } from "react-icons/fa";
import userimage from "../Assets/userimage.svg";
import permissionclose from "../Assets/permissionclose.svg";
import permissionedit from "../Assets/permissionedit.svg";
import { useEffect, useState } from "react";
import axios from "axios";
import { Baseurl } from "../utlis/apiservices";
import { headers } from "../utlis/config";
const Permissions = () => {
  const [createpermission, setceatepermission] = useState(false);
  const [editpermission, seteditpermission] = useState(false);
  const [data, setData] = useState("");

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [permission, setPermission] = useState([]);
  const [status, setStatus] = useState("Active");

  const [editItemId, setEditItemId] = useState(null);

  /////fetch Permissions//////////
  function fetchPermissions() {
    axios
      .get(`${Baseurl}/api/v1/admin/getStaff`)
      .then((response) => {
        setData(response.data);
        // console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }
  useEffect(() => {
    fetchPermissions();
  }, []);

  ////////////Create Permission//////////
  const handleCreatePermission = (e) => {
    e.preventDefault();
    console.log(fullName, phone, email, status, permission);
    const permissionString = JSON.stringify(permission);

    const data = {
      fullName: fullName,
      phone: phone,
      email: email,
      permission: permissionString,
      status: status,
    };

    axios
      .post(`${Baseurl}/api/v1/admin/CreateStaff`, data, {
        headers: headers,
      })
      .then((res) => {
        alert("Data added successfully");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error creating staff:", error);
      });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      // If checkbox is checked, add the value to the permission state
      setPermission((prevPermission) => [...prevPermission, value]);
    } else {
      // If checkbox is unchecked, remove the value from the permission state
      setPermission((prevPermission) =>
        prevPermission.filter((item) => item !== value)
      );
    }
  };

  //////////edit Lawyer/////////
  const handleEditPermission = (e) => {
    e.preventDefault();

    const permissionString = JSON.stringify(permission);
    console.log(editItemId);
    const Data = {
      email: email,
      phone: phone,
      fullName: fullName,
      permission: permissionString,
      status: status,
    };

    axios
      .patch(`${Baseurl}/api/v1/admin/updateStaff/${editItemId}`, Data)
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
      {editpermission ? (
        <>
          <div className=" w-full h-[700px] shadow-lg">
            <div className="bg-[#0F2C64] h-[90px] flex justify-between items-center pl-3 pr-3">
              <div className="text-white text-3xl">
                Edit Permissions & Role’s
              </div>
              <div
                onClick={() => seteditpermission(false)}
                className="cursor-pointer"
              >
                <img src={permissionclose} alt="" />
              </div>
            </div>
            <div className="p-5">
              <form onSubmit={handleEditPermission}>
                <div className="flex items-center">
                  <div className="w-[150px] text-[#0F2C64] font-semibold">
                    Employee Details
                  </div>
                  <hr className=" border-gray-400 w-full" />
                </div>
                <div className="flex justify-between mt-5">
                  <div>
                    <label className="text-[#0F2C64] font-semibold">
                      Employee Type
                    </label>
                    <br />
                    <select className="placeholder: block w-[350px] h-[40px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                      <option>Advocate</option>
                      <option>Junior Lawyer</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[#0F2C64] font-semibold">Name</label>
                    <br />
                    <input
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Name"
                      className="placeholder: block w-[350px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="flex justify-between mt-5">
                  <div>
                    <label className="text-[#0F2C64] font-semibold">
                      Mobile
                    </label>
                    <br />
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Mobile"
                      className="placeholder: block w-[350px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <div>
                    <label className="text-[#0F2C64] font-semibold">
                      Email
                    </label>
                    <br />
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      className="placeholder: block w-[350px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="flex items-center mt-10">
                  <div className="w-[120px] text-[#0F2C64] font-semibold">
                    Assign Roles
                  </div>
                  <hr className=" border-gray-400 w-full" />
                </div>
                <div className="flex justify-between mt-5">
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                      <input
                        type="checkbox"
                        value="Lawyer Profile & Total users"
                        onChange={handleCheckboxChange}
                      />{" "}
                      Lawyer Profile & Total users
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="checkbox"
                        value="Meetings, Messages, Cases & Bookings"
                        onChange={handleCheckboxChange}
                      />
                      Meetings, Messages, Cases & Bookings
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="checkbox"
                        value="Services, Departments"
                        onChange={handleCheckboxChange}
                      />{" "}
                      Services, Departments
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="checkbox"
                        value="Banners"
                        onChange={handleCheckboxChange}
                      />{" "}
                      Banners
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="checkbox"
                        value="All files / Categories"
                        onChange={handleCheckboxChange}
                      />{" "}
                      All files / Categories
                    </div>
                  </div>
                  <div>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="placeholder: block w-[350px] h-[40px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end gap-5 mt-10">
                  <button className="bg-[#0F2C64] p-2 pl-5 pr-5 rounded text-white flex justify-center items-center gap-2">
                    Delete
                  </button>
                  <button
                    type="submit"
                    className="bg-[#0F2C64] p-2 pl-5 pr-5 rounded text-white flex justify-center items-center gap-2"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      ) : (
        <>
          {createpermission ? (
            <div className=" w-full h-[700px] shadow-lg">
              <div className="bg-[#0F2C64] h-[90px] flex justify-between items-center pl-3 pr-3">
                <div className="text-white text-3xl">
                  Create Permissions & Role’s
                </div>
                <div
                  onClick={() => setceatepermission(false)}
                  className="cursor-pointer"
                >
                  <img src={permissionclose} alt="" />
                </div>
              </div>
              <div className="p-5">
                <form onSubmit={handleCreatePermission}>
                  <div className="flex items-center">
                    <div className="w-[150px] text-[#0F2C64] font-semibold">
                      Employee Details
                    </div>
                    <hr className=" border-gray-400 w-full" />
                  </div>
                  <div className="flex justify-between mt-5">
                    <div>
                      <label className="text-[#0F2C64] font-semibold">
                        Employee Type
                      </label>
                      <br />
                      <select className="placeholder: block w-[350px] h-[40px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                        <option>Advocate</option>
                        <option>Junior Lawyer</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[#0F2C64] font-semibold">
                        Name
                      </label>
                      <br />
                      <input
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Name"
                        className="placeholder: block w-[350px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="flex justify-between mt-5">
                    <div>
                      <label className="text-[#0F2C64] font-semibold">
                        Mobile
                      </label>
                      <br />
                      <input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Mobile"
                        className="placeholder: block w-[350px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    <div>
                      <label className="text-[#0F2C64] font-semibold">
                        Email
                      </label>
                      <br />
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="placeholder: block w-[350px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="flex items-center mt-10">
                    <div className="w-[120px] text-[#0F2C64] font-semibold">
                      Assign Roles
                    </div>
                    <hr className=" border-gray-400 w-full" />
                  </div>
                  <div className="flex justify-between mt-5">
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2">
                        <input
                          type="checkbox"
                          value="Lawyer Profile & Total users"
                          onChange={handleCheckboxChange}
                        />{" "}
                        Lawyer Profile & Total users
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="checkbox"
                          value="Meetings, Messages, Cases & Bookings"
                          onChange={handleCheckboxChange}
                        />
                        Meetings, Messages, Cases & Bookings
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="checkbox"
                          value="Services, Departments"
                          onChange={handleCheckboxChange}
                        />{" "}
                        Services, Departments
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="checkbox"
                          value="Banners"
                          onChange={handleCheckboxChange}
                        />{" "}
                        Banners
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="checkbox"
                          value="All files / Categories"
                          onChange={handleCheckboxChange}
                        />{" "}
                        All files / Categories
                      </div>
                    </div>
                    <div>
                      <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="placeholder: block w-[350px] h-[40px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex justify-end gap-5 mt-10">
                    <button
                      type="submit"
                      className="bg-[#0F2C64] p-2 pl-5 pr-5 rounded text-white flex justify-center items-center gap-2"
                    >
                      Create
                    </button>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex justify-between">
                <div className="text-3xl font-semibold">
                  Permissions & Rolls
                </div>
                <div>
                  <div className="flex justify-center items-center gap-2">
                    <button
                      className="bg-[#0F2C64] p-2 pl-5 pr-5 rounded-xl text-white"
                      onClick={() => setceatepermission(true)}
                    >
                      Create Permission
                    </button>
                    <div className="relative  rounded-md">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <span className="bg-[#0F2C64] p-2.5  ml-[-3px] rounded-l-full text-white">
                          <FaSearch />
                        </span>
                      </div>
                      <input
                        type="text"
                        className="placeholder: ml-2 block w-[250px] rounded-3xl border-0 py-1.5 pl-10 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Search Rolls"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-10 ml-1 mr-1">
                <table className=" ">
                  <thead>
                    <tr>
                      <th className="w-[200px] text-left text-[#0F2C64]">
                        Name
                      </th>
                      <th className="text-left text-[#0F2C64] w-[180px] ">
                        Mobile
                      </th>
                      <th className="w-[180px] text-left text-[#0F2C64] ">
                        Email
                      </th>

                      <th className="w-[180px] text-left text-[#0F2C64] ">
                        Status
                      </th>
                      <th className="text-left text-[#0F2C64] w-[400px] ">
                        Permissions
                      </th>
                      <th className="text-left text-[#0F2C64] "></th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.data?.map((item) => (
                      <tr
                        className="border-t-2 border-b-2 h-[60px]"
                        key={item._id}
                      >
                        <td className="text-center flex items-center h-[60px]">
                          <img
                            src={item.image}
                            alt=""
                            className="w-[50px] h-[50px] rounded-full"
                          />
                          <div>
                            <div className="text-xl">{item.fullName}</div>
                            <div className="text-[#0F2C64] text-[10px]">
                              Real Estate
                            </div>
                          </div>
                        </td>
                        <td className=" text-leftborder ">+91{item.phone}</td>
                        <td className="text-leftborder  ">{item.email}</td>

                        <td className="text-[#26A843]">{item.status}</td>
                        <td>{item.permission}</td>
                        <td
                          className="cursor-pointer"
                          onClick={() => {
                            seteditpermission(true);
                            setEditItemId(item._id);
                          }}
                        >
                          <img src={permissionedit} alt="" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Permissions;
