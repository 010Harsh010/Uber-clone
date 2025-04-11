import React from "react";
import { convertDistance } from "../utils/Conversion";
import { useDispatch } from "react-redux";
function RidePopUp(props) {
  return (
    <div>
      <h5
        className="p-1  text-center absolute top-0 w-[93%] "
        onClick={() => {
          props.setridemessage(false);
        }}
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">New Ride Avaliable !</h3>
      <div className="flex items-center justify-between mt-4 p-3 bg-yellow-400 rounded-lg">
        <div className="flex items-center gap-3 ">
            <img className="object-cover  h-12 w-12 rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-CLu8oGWqWKR7-RE73C9JQw8xGSS67OiLLg&s" alt="" />
            <h2 className="text-xl font-medium">{props?.ride?.user?.fullname?.firstname + " " + props.ride?.user?.fullname?.lastname}</h2>
        </div> 
        <h5 className="text-lg font-semibold">{convertDistance(props?.ride?.distance)} Km</h5>
      </div>
      <div className="flex gap-2 justify-between flex-col items-center">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 border-b-2 p-3">
            <i className="text-lg ri-map-pin-user-line"></i>
            <div>
              <h3 className="text-lg font-medium">{props.ride?.pickup.split(",")[0]}</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {props.ride?.pickup}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 border-b-2 p-3">
            <i className="text-lg ri-map-pin-fill"></i>
            <div>
              <h3 className="text-lg font-medium">{props.ride?.destination.split(",")[0]}</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {props.ride?.destination}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
            <i className="text-lg ri-secure-payment-line"></i>
            <div>
              <h3 className="text-lg font-medium">₹ {props.ride?.fare}</h3>
              <p className="text-sm -mt-1 text-gray-600">Online</p>
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            props.setridemessage(false);
            props.setconfirmridemessage(true);
            console.log("clicked");
            props.confirmride();
          }}
          className=" mt-5 w-full bg-green-600 text-white font-semibold p-2 rounded-lg"
        >
          Accept
        </button>
        <button
          onClick={() => {
            props.setridemessage(false);
            props.dispatch(props.setcurrentState(0));
          }}
          className=" mt-1 w-full bg-gray-200 text-gray-700 font-semibold p-2 rounded-lg"
        >
          Ignore
        </button>
      </div>
    </div>
  );
}

export default RidePopUp;
