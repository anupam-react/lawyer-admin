import userimage from "..//Assets/userimage.svg";

const Todolist = () => {
  return (
    <>
      <div className="flex justify-between items-center pt-5 ml-5 mr-5 ">
        <div className="text-2xl mb-5 text-[black] font-semibold ">
          To-Do List
        </div>
      </div>
      <div className="flex justify-between items-center py-4 border-t-2 border-b-2 ">
        <div className="flex gap-2 ">
          <img src={userimage} alt="" />
          <div className="">
            <div>
              John Doe <span className="text-[#808080]">12:33 pm. 13 Nov, 2023</span>
            </div>
            <div className="w-[650px] mt-1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              vulputate turpis elit, quis pellentesque ante bibendum nec.
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="bg-[#0F2C64] p-2 pl-5 pr-5 rounded-2xl w-[100px] h-[40px] text-white">
            Done
          </button>
          <button className="text-[#0F2C64] p-2 pl-5 pr-5 rounded-2xl bg-white border border-[#0F2C64]">
            Remind me Later
          </button>
        </div>
      </div>
    </>
  );
};

export default Todolist;
