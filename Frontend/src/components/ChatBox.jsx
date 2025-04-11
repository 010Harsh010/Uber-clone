import React, { useState, useContext, useEffect, useRef } from "react";
import "../CSS/extra.css";



const ChatBox = (props) => {
  const chat = props.chat;
  function convertToNormalTime(isoTimestamp) {
    const date = new Date(isoTimestamp);
    const options = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    };
    return date.toLocaleString("en-US", options);
  }
  return (
    <div className="z-50 w-72 shadow-2xl border-cyan-950 border-2 mr-2 right-0 rounded-2xl fixed bg-blue-300 h-full">
      <div className="h-[15%] p-4 flex justify-center border-b-2 align-middle">
        <i
          onClick={() => props.sethatting(false)}
          className="z-10 cursor-pointer fixed right-0 mr-6 ri-eye-close-fill"
        ></i>
        <h2 className="text-white font-semibold text-2xl">Chat Box</h2>
      </div>
      <div className="chat-box p-2 h-[90%]">
        <div className="flex flex-col chatting overflow-auto h-[65%]">
          {chat.length > 0 ? (
            chat.map((chats, index) => (
              <div key={index}>
                {chats.sender !== "user" ? (
                  <>
                    <div className="flex flex-row justify-between align-middle h-min rounded-2xl p-1">
                      <img
                        src="./me.jpg"
                        className="object-cover h-10 w-10 rounded-full"
                        alt=""
                      />
                      <div className="w-56 ml-2 flex flex-row justify-center align-middle h-min p-1 rounded-2xl bg-pink-400">
                        <h3 className="ml-2">{chats.message}</h3>
                      </div>
                    </div>
                    <div className="right-0 flex flex-row justify-end pr-3">
                      <p className="text-gray-600 text-xs">
                        {convertToNormalTime(chats.timestamp)}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex flex-row justify-between align-middle h-min rounded-2xl p-1">
                      <div className="w-56 mr-2 flex flex-row justify-center align-middle h-min p-1 rounded-2xl bg-purple-400">
                        <h3 className="ml-2">{chats.message}</h3>
                      </div>
                      <img
                        src="./me.jpg"
                        className="object-cover h-10 w-10 rounded-full"
                        alt=""
                      />
                    </div>
                    <div className="right-0 flex flex-row justify-start pr-3">
                      <p className="text-gray-600 text-xs">
                        {convertToNormalTime(chats.timestamp)}
                      </p>
                    </div>
                  </>
                )}
              </div>
            ))
          ) : (
            <div className="flex justify-center flex-col align-middle">
              <i className="justify-center flex text-white w-full h-full text-9xl ri-wechat-fill"></i>
              <div className="flex justify-center">
                <h1 className="text-2xl">Start Chat</h1>
              </div>
            </div>
          )}
        </div>
        <form onSubmit={props.sendmessage} className="h-[10%] mt-3">
          <input
            value={props.message}
            onChange={(e) => props.setmessage(e.target.value)}
            type="text"
            className="w-full p-3 cursor-text h-full rounded-3xl"
          />
        </form>
      </div>
    </div>
  );
};

export default ChatBox;
