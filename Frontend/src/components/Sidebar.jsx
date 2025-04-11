import React, { useState ,useContext} from "react";
import "../CSS/extra.css";
import { useDispatch, useSelector } from "react-redux";
import { SidebarContext } from "../context/SidebarContext";
import {setcurrentState} from "../context/ridesSlice.js";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const currentStepIndex = useSelector((state) => state.ride.currentState);
  const {setsideOpen,sideOpen} = useContext(SidebarContext);
  const dispatch =  useDispatch();
  const rideData = useSelector((state)=>state.ride.rideData);
  const state = localStorage.getItem("state");

  const changeState = (x) => {
    if (currentStepIndex > x){
      dispatch(setcurrentState(x));
    }else{
      if (rideData){
        dispatch(setcurrentState(x));
      }
    }
  }

  return (
    <div
      className={`${
       sideOpen? "translate-x-0" : "-translate-x-full"
      } h-screen w-64 bg-gray-200 fixed top-0 left-0 transition-transform duration-500 ease-in-out z-50`}
    >
      <div className="h-full p-6 flex flex-col text-white">
      <div className="p-6 flex items-center justify-between top-0 mb-6 w-full">
        <img onClick={() => setsideOpen((state) => !state)} className="w-28" src="/uberlogo.png" alt="" />
      </div>

        <div className="flex flex-col space-y-4">
          <div className="bg-blue-300 p-3 rounded-md hover:bg-blue-700 transition duration-300">
            <h1 className="text-lg font-semibold">Dashboard</h1>
          </div>

          <div className="border-t-2 border-black pt-4">
            <h2 className="text-2xl text-black font-bold mb-8">Riding</h2>
            <div className="space-y-3">
              <div
              onClick={() =>
                changeState(1)
              }
                className={`${
                  state > 0 ? "bg-green-400" : "bg-gray-400"
                } p-3 rounded-md hover:bg-gray-800 transition duration-300`}
              >
                <h1  className="text-lg font-semibold">Select Ride</h1>
              </div>
              <div
                onClick={() =>
                  changeState(2)
                }
                className={`${
                  state > 1 ? "bg-green-400" : "bg-gray-400"
                } p-3 rounded-md hover:bg-gray-800 transition duration-300`}
              >
                <h1 className="text-lg font-semibold">Confirm Ride</h1>
              </div>
              <div
              onClick={() =>
                changeState(3)
              }
                className={`${
                  state > 2 ? "bg-green-400" : "bg-gray-400"
                } p-3 rounded-md hover:bg-gray-800 transition duration-300`}
              >
                <h1 className="text-lg font-semibold">Start Riding</h1>
              </div>
              <div
              onClick={() =>
                changeState(4)
              }
                className={`${
                  state > 3 ? "bg-green-400" : "bg-gray-400"
                } p-3 rounded-md hover:bg-gray-800 transition duration-300`}
              >
                <h1 className="text-lg font-semibold">End Ride</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
