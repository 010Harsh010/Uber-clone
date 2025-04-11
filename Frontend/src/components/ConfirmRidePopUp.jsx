import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { convertDistance } from "../utils/Conversion";
import Captainchatbox from "./Captainchatbox";
import { SocketContext } from "../context/SocketContext";
import { useSelector } from "react-redux";

const ConfirmRidePopUp = (props) => {
  const [otp, setotp] = useState("");
  const navigate = useNavigate();

  const handleSubmit= async(e) => {
    e.preventDefault();
    const response = await axios.post(`http://localhost:4000/ride/startride`,{
      "otp": otp,
      "rideId": props?.ride?._id
    },
    {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    });
    if(response.status===200){
      props.setridemessage(false);
      props.setconfirmridemessage(false);

      navigate("/captainriding",{
        state: {
          ride: props?.ride
        }
      });
    }
  }

  const captain = useSelector((state) => state.captain.currentCaptain);
  const { socket } = useContext(SocketContext);
  const [chatting,setchatting] = useState(false);
  const [message, setMessage] = useState("");
  
  const [chat, setChat] = useState(() => {
    const savedChats = localStorage.getItem("chats");
    return savedChats ? JSON.parse(savedChats) : [];
  });
  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      const body = {
        message,
        sender: { type: "captain", _id: captain?._id },
        receiver: { type: "user", _id: props?.ride?.user?._id },
      };
      const res = await axios.post(
        "http://localhost:4000/chats/captain/sendchat",
        body,
        { withCredentials: true }
      );
    } catch (error) {
      console.error(error.message);
    } finally {
      setMessage("");
    }
  };

  const createChat = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/chats/captain/createchat",
        {
          ride: props?.ride
        },
        { withCredentials: true }
      );
      if (response.status === 200) {
        setChat([]);
        localStorage.setItem("chats", JSON.stringify([]));
      }
    } catch (error) {
      console.error("Unable to Create Chats:", error.message);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("chats")) {
      createChat();
    }
  }, []);

  useEffect(() => {
    const handleMessage = (data) => {
      setChat((prev) => {
        const updatedChat = [...prev, data];
        localStorage.setItem("chats", JSON.stringify(updatedChat));
        return updatedChat;
      });
    };

    socket.on("recive-message", handleMessage);
    return () => socket.off("recive-message", handleMessage); // Clean up listener
  }, [socket]);
  return (
    <div>
      {
        chatting && (
            <div className="h-full">
                <Captainchatbox setMessage={setMessage} sendMessage={sendMessage} message={message} chat={chat} setchatting={setchatting} user={props?.ride?.user} ride={props?.ride}/>
            </div>
        )
      }
      <div>
      <h5
        className="p-1  text-center absolute top-0 w-[93%] "
        onClick={() => {
          props.setconfirmridemessage(false);
        }}
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Confirm To Start Jounary</h3>
      <div className="flex items-center justify-between mt-4 p-4 border-2 border-yellow-400 rounded-lg">
        <div className="flex items-center gap-3 ">
          <img
            className="object-cover  h-12 w-12 rounded-full"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-CLu8oGWqWKR7-RE73C9JQw8xGSS67OiLLg&s"
            alt=""
          />
          <h2 className="text-xl font-medium">{props?.ride?.user?.fullname?.firstname + " " + props?.ride?.user?.fullname?.lastname}</h2>
        </div>
        <h5 className="text-lg font-semibold">{convertDistance(props?.ride?.distance)} Km</h5>
      </div>
      <div className="flex gap-2 justify-between flex-col items-center">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 border-b-2 p-3">
            <i className="text-lg ri-map-pin-user-line"></i>
            <div>
              <h3 className="text-lg font-medium">{props?.ride?.pickup.split(",")[0]}</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {props?.ride?.pickup}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 border-b-2 p-3">
            <i className="text-lg ri-map-pin-fill"></i>
            <div>
              <h3 className="text-lg font-medium">{props?.ride?.destination.split(",")[0]}</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {props?.ride?.destination}
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
        <div className="mt-6 w-full">
          <form onSubmit={(e) => {
            handleSubmit(e);
          }}> 
          <input value={otp} onChange={(e)=>{
            setotp(e.target.value);
          }} type="number" className="bg-[#eee] px-6 py-4 font-mono text-base rounded-lg w-full mt-5" placeholder="Enter OTP" />
          <button
            className="flex justify-center mt-5 w-full bg-green-600 text-white font-semibold p-3 text-lg rounded-lg"
          >
            Confirm
          </button>
          <button
            onClick={() => {
              props.setridemessage(false);
              props.setconfirmridemessage(false);
            }}
            className=" mt-1 w-full bg-red-600 text-white font-semibold p-3 rounded-lg"
          >
            Cancel
          </button>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ConfirmRidePopUp;
