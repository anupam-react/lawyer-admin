import { FaSearch } from "react-icons/fa";
import lawermsg from "../Assets/lawyermsg.svg";
import usermsg from "../Assets/usermsg.svg";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isSender, setIsSender] = useState(true); // Assume current user is sender

  useEffect(() => {
    const q = query(collection(db, "Messages"), orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages = [];
      querySnapshot.forEach((doc) => {
        messages.push(doc.data());
      });
      setMessages(messages);
    });

    return () => unsubscribe();
  }, []);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSend = async () => {
    console.log(input);
    if (input.trim()) {
      await addDoc(collection(db, "messages"), {
        text: input,
        sender: isSender,
        timestamp: new Date(),
      });
      setInput("");
      setIsSender(!isSender); // Toggle sender/receiver for demonstration

      // Add the new message to the messages state
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: input,
          sender: isSender,
          timestamp: new Date(),
        },
      ]);
    }
  };

  return (
    <div>
      <div className="flex justify-between">
        <div className="text-3xl font-semibold">
          Real Time Chats
          <br />
          <span className="text-[15px] text-[#525252]">
            View all real time chats
          </span>
        </div>
        <div>
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
                placeholder="Search Chats"
              />
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className=" h-[650px]  mt-5 flex">
        <div className="w-4/12 border">
          <div className="pl-5 pt-5 text-xl">All Chats</div>
          <input
            type="text"
            className="placeholder: ml-5 mt-2 block w-[300px] rounded-3xl border-0 py-1.5 pl-10 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Search in Chats"
          />
          <div className="h-[549px] border-t flex flex-col mt-2 overflow-y-scroll">
            <div className="flex items-center justify-between p-5 ">
              <div className="relative">
                <img
                  src={lawermsg}
                  alt="Lawyer Message"
                  className="absolute right-3 -top-4"
                />
                <img src={usermsg} alt="User Message" className="relative" />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold">Mr.shlok</span>
                <span className="font-semibold">Mr.client</span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="w-[55px] h-[14px] border rounded-3xl text-[10px] flex justify-center items-center text-[#979797]">
                  Advocate
                </div>
                <div className="w-[55px] h-[14px] border rounded-3xl text-[10px] flex justify-center items-center text-[#979797]">
                  User
                </div>
              </div>
              <div>
                <div className="w-[55px] h-[14px] border border-[#007AFF] bg-[#F5F5FF] rounded-3xl text-[10px] flex justify-center items-center text-[#007AFF]">
                  online
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-5 border-t">
              <div className="relative">
                <img
                  src={lawermsg}
                  alt="Lawyer Message"
                  className="absolute right-3 -top-4"
                />
                <img src={usermsg} alt="User Message" className="relative" />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold">Mr.shlok</span>
                <span className="font-semibold">Mr.client</span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="w-[55px] h-[14px] border rounded-3xl text-[10px] flex justify-center items-center text-[#979797]">
                  Advocate
                </div>
                <div className="w-[55px] h-[14px] border rounded-3xl text-[10px] flex justify-center items-center text-[#979797]">
                  User
                </div>
              </div>
              <div>
                <div className="w-[55px] h-[14px] border border-[#E4A400] bg-[#FFF8E5] rounded-3xl text-[10px] flex justify-center items-center text-[#E4A400]">
                  online
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-10/12 border">
          <div className="h-[100px] border-b flex items-center">
            <div className="flex items-center ml-2 gap-2">
              <div className="">
                <img src={usermsg} alt="" />
                Mr. Shlok <span className="text-[#979797]">Advocate</span>
              </div>
              <div>
                <img src={lawermsg} alt="" />
                Mr. Client <span className="text-[#979797]">User</span>
              </div>
            </div>
          </div>
          <div className="bg-sky-50 border-b h-[549px] overflow-y-scroll relative">
            <div className="p-5">
              {messages?.map((message, index) => (
                <div
                  key={index}
                  className={`p-3 mb-2 rounded shadow-sm ${
                    message.sender
                      ? "bg-blue-100 text-right"
                      : "bg-white text-left"
                  }`}
                >
                  {message.text}
                </div>
              ))}
            </div>
            <div className="absolute bottom-0 left-0 w-full bg-white bg-opacity-60 backdrop-filter backdrop-blur-lg p-4 flex items-center">
              <input
                placeholder="Message..."
                className="flex-grow h-[50px] placeholder:pl-5 pl-5 border-t border-gray-300 rounded-l-full"
                value={input}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSend();
                  }
                }}
              />
              <button
                onClick={handleSend}
                className="bg-blue-500 text-white h-[50px] w-[100px] rounded-r-full"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
