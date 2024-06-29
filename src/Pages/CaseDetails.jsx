import React from 'react'

import goback from "../Assets/goback.svg";
import { Link } from 'react-router-dom';

const CaseDetails = ({caseData , setEditcases, setCaseDetails , setEditItemId}) => {



  return (
    <div>    
         <div className="rounded h-[700px]">
    <div className="flex  justify-between items-center pt-5 ml-5 mr-5">
      <div className="text-2xl mb-5  text-black font-semibold">
      Case Details
     
      </div>
      <div className="flex justify-center items-center gap-5">
        <button
          className="text-[#0F2C64] pr-1 rounded bg-white border border-[#0F2C64] flex items-center"
          onClick={() => {
            setCaseDetails(false);
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
<div className='border border-[#808080] mb-4 p-4 rounded-md'>
    <p className='text-[#808080]'>{caseData?._id}</p>
    <div className='flex justify-between'>
    <div className="mt-5 flex justify-between items-center">
      <div className="text-center flex items-center gap-4">
        <img src={caseData?.lawyer?.image } alt="" className="w-[80px] h-[80px] rounded-full" />
        <div className="flex flex-col ">
          <span className="text-left text-xl">{caseData?.lawyer?.fullName || caseData?.lawyer?.firstName + " " + caseData?.lawyer?.lastName }</span>
          <span className="text-[#0F2C64] text-left text-[17px]">
       {caseData?.lawyer?.userType}
          </span>
        </div>
       
      </div>
    </div>
    <div className='flex flex-col items-center cursor-pointer' onClick={() => {
            setEditcases(true);
            setEditItemId(caseData?._id)
          }}>
        <img src="../Group 1686552334.png" alt="" className='h-fit w-fit' />
        <p className='text-[#0F2C64]'>Edit Case Details</p>
    </div>

    </div>

    <div >
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
            value={caseData?.caseTitle}
            // onChange={(e) => setCaseTitle(e.target.value)}
            placeholder="Case Title"
            className="placeholder: block w-[264px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div>
          <label>Case Category</label>
          <br />
          <input
            value={caseData?.caseName}
            // onChange={(e) => setCaseNumber(e.target.value)}
            placeholder="Case Category"
            className="placeholder: block w-[264px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
    
      </div>
      <div className="flex flex-wrap gap-5  mt-10">
      <div>
          <label>Court Name</label>
          <br />
          <input
            placeholder="Court Name"
            value={caseData?.courtName}
            // onChange={(e) => setCourtName(e.target.value)}
            className="placeholder: block w-[264px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div>
          <label>Court Number</label>
          <br />
          <input
            placeholder="Court Number"
            value={caseData?.courtNumber}
            // onChange={(e) => setCourtNumber(e.target.value)}
            className="placeholder: block w-[264px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div>
          <label>Case Number</label>
          <br />
          <input
            placeholder="Case Number"
            value={caseData?.caseNumber}
            // onChange={(e) => setCaseNumber(e.target.value)}
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
      
      </div>
      <div className="flex flex-wrap gap-5  mt-10">
      <div>
          <label>Name of the Judge</label>
          <br />
          <input
            placeholder="Name of the Judge"
            value={caseData?.judge}
            // onChange={(e) => setJudge(e.target.value)}
            className="placeholder: block w-[264px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div>
          <label>Last date of hearing</label>
          <br />
          <input
            placeholder="Last date of hearing"
            value={caseData?.lastDateOfHearing}
            // onChange={(e) => setLastDateOfHearing(e.target.value)}
            className="placeholder: block w-[264px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div>
          <label>Next date of hearing</label>
          <br />
          <input
            placeholder="Next date of hearing"
            value={caseData?.nextHearingDate}
            // onChange={(e) => setNextHearingDate(e.target.value)}
            className="placeholder: block w-[264px] rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div className="mt-10">
     <p className='text-[#0F2C64] text-[18px] font-[500] '>Reason <span className='text-[#292929] text-[16px] pl-2'>{caseData?.caseName}</span></p>
      </div>
      <div className='bg-[#F7F7F7] rounded-lg mt-6 p-3 w-[60vw]'>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vulputate turpis elit, quis pellentesque ante bibendum nec. In posuere finibus risus auctor auctor. Aenean sem justo, sollicitudin non nisl vel, fermentum aliquam tellus. Quisque nec nisi id ante gravida tempus. Etiam accumsan imperdiet ex, in pellentesque turpis luctus at. Nam blandit justo non est faucibus.
    </div>

      <div className="flex justify-end gap-5 mt-20 mr-5">
        <Link to={`${caseData?.notes?.[0]?.image}`}>
        <button  className="bg-[#0F2C64] p-2 pl-5 pr-5 rounded text-white flex justify-center items-center gap-2">
        Download Case File
        <img src='../Mask group (3).png' alt="" />
        </button>
        </Link>
      </div>
    </div>

</div>

  </div></div>
  )
}

export default CaseDetails