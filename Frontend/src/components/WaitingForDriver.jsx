import React, { useState, useContext, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import ChatBox from './ChatBox';
import axios from "axios";
import { SocketContext } from "../context/SocketContext";
function WaitingForDriver(props) {
  const images = {
    "car" : "/ubersmall.jpg",
    "moto" : "/uberbike.png",
    "auto" : "/uberauto.png"
  }
  const user = useSelector((state) => state.user.currentUser);
  const { socket } = useContext(SocketContext);
  
  const [chat, setchat] = useState(() => {
    const savedChats = localStorage.getItem("chats");
    return savedChats ? JSON.parse(savedChats) : [];
  });
  
  const [message, setmessage] = useState("");
  const createChat = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/chats/user/createchat",
        {
          ride: {
            _id: "678807e89f3646acfe31018c",
            user: user._id,
            captain: props?.driver?.captain?._id,
          },
        },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        localStorage.setItem("chats", JSON.stringify([]));
      } else {
        console.log("Unable to Create Chats");
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  const chatRef = useRef(chat);
  chatRef.current = chat; // Ensure chat updates in the socket listener.
  const sendmessage = async (e) => {
    e.preventDefault();
    try {
      const body = {
        message: message,
        sender: {
          type: "user",
          _id: user?._id,
        },
        receiver: {
          type: "captain",
          _id: props?.driver?.captain?._id,
        },
      };
      const res = await axios.post("http://localhost:4000/chats/user/sendchat", body, {
        withCredentials: true,
      });
      console.log(res.data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setmessage("");
    }
  };
  useEffect(() => {
    socket.on("recive-message", (data) => {
      setchat((prev) => {
        const updatedChats = [...prev, data];
        localStorage.setItem("chats", JSON.stringify(updatedChats));
        return updatedChats;
      });
    });
    return () => {
      socket.off("recive-message"); 
    };
  }, [socket]);
  const [chatting, setchatting] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem("chats")) {
      createChat();
    }
  }, []);
  return (
    <div>
      {
        chatting && (
          <ChatBox sendmessage={sendmessage} setmessage={setmessage} message={message} chat={chat} sethatting={setchatting} ride={props?.driver} captain={props?.driver?.captain} />
        )
      }
      <div>
      <h5
        className="p-1  text-center absolute top-0 w-[93%] "
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>
      </div>
      <div className='flex items-center justify-between'>
        <img className="h-12" src={images[props?.driver?.captain?.vehicle?.vehicleType]} alt="" />
        <div className='text-right'>
          <h2 className='text-lg font-medium'>
            {props?.driver?.captain?.fullname?.firstname + " " + props?.driver?.captain?.fullname?.lastname}
          </h2>
          <h4 className='-mt-1 -mb-1 text-xl font-semibold'>{props?.driver?.captain?.vehicle?.plate}</h4>
          <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p>
          <h3 className='text-lg font-semibold'>{props?.driver?.otp}</h3>
        </div>
      </div>
      <h3 className="text-2xl font-semibold mb-5">Wating for a driver</h3>
      <div className="flex gap-2 justify-between flex-col items-center">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 border-b-2 p-3">
            <i className="text-lg ri-map-pin-user-line"></i>
            <div>
              <h3 className="text-lg font-medium">{props?.driver?.pickup?.split(",")[0]}</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {props?.driver?.pickup}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 border-b-2 p-3">
            <i className="text-lg ri-map-pin-fill"></i>
            <div>
              <h3 className="text-lg font-medium">{props?.driver?.destination?.split(",")[0]}</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {props?.driver?.destination}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
            <i className="text-lg ri-secure-payment-line"></i>
            <div className='w-[95%]'>
              <h3 className="text-lg font-medium">₹ {props?.driver?.fare}</h3>
              <p className="text-sm -mt-1 text-gray-600">Online</p>
            </div>
            <div onClick={() => setchatting(true)} className='bg-blue-400 cursor-pointer p-3 w-28 right-0 rounded-2xl'>
              Quick Chat
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WaitingForDriver;
