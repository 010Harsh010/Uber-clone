import React from "react";
import "../CSS/extra.css";


const Captainchatbox = (props) => {
  const convertToNormalTime = (isoTimestamp) => {
    const date = new Date(isoTimestamp);
    return date.toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };
  return (
    <div className="z-50 w-72 shadow-2xl border-cyan-950 border-2 mr-2 right-0 rounded-2xl fixed bg-blue-300 h-full">
      <div className="h-[8%] p-4 flex justify-center border-b-2 align-middle">
        <i
          onClick={() => props.setchatting(false)}
          className="z-10 cursor-pointer fixed right-0 mr-6 ri-eye-close-fill"
        ></i>
        <h2 className="text-white font-semibold text-2xl">Chat Box</h2>
      </div>
      <div className="chat-box p-2 mt-2 h-[94%]">
        <div className="flex flex-col chatting overflow-auto h-[80%]">
          {Array.isArray(props.chat) && props.chat.length > 0 ? (
            props.chat.map((chats, index) => (
              <div key={index}>
                <div
                  className={`flex flex-row justify-between align-middle h-min rounded-2xl p-1 ${
                    chats.sender === "user"
                      ? "justify-start"
                      : "justify-end"
                  }`}
                >
                  {chats.sender === "user" && (
                    <img
                      src="./me.jpg"
                      className="object-cover h-10 w-10 rounded-full"
                      alt=""
                    />
                  )}
                  <div
                    className={`w-56 ml-2 flex flex-row justify-center align-middle h-min p-1 rounded-2xl ${
                      chats.sender === "user"
                        ? "bg-pink-400"
                        : "bg-purple-400"
                    }`}
                  >
                    <h3 className="ml-2">{chats.message}</h3>
                  </div>
                  {chats.sender !== "user" && (
                    <img
                      src="./me.jpg"
                      className="object-cover h-10 w-10 rounded-full"
                      alt=""
                    />
                  )}
                </div>
                <div
                  className={`right-0 flex flex-row ${
                    chats.sender === "user" ? "justify-end" : "justify-start"
                  } pr-3`}
                >
                  <p className="text-gray-600 text-xs">
                    {convertToNormalTime(chats.timestamp)}
                  </p>
                </div>
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
        <form
          onSubmit={props.sendMessage}
          className="h-[6%] flex justify-between align-middle bottom-0 fixed mb-3 w-64 ml-1 mt-3"
        >
          <input
            value={props.message}
            onChange={(e) => props.setMessage(e.target.value)}
            type="text"
            className="w-full p-3 cursor-text h-full rounded-3xl"
          />
        </form>
      </div>
    </div>
  );
};

export default Captainchatbox;
