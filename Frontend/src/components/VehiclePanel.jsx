import React from 'react';
import {convertDistance} from "../utils/Conversion.js"
function VehiclePanel(props) {
  const images = {
    "car" : "/ubersmall.jpg",
    "moto" : "/uberbike.png",
    "auto" : "/uberauto.png"
  }
  return (
    <div>
      <h5 className="p-1  text-center absolute top-0 w-[93%] " onClick={() => {
          props.setVehiclePanel(false);
        }}><i className=" text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
        <h3 className="text-2xl font-semibold mb-5">Choose a Vehicle</h3>
        <div onClick={() => {
            props.setRide(true)
            props.setvehicletype("car")
        }} className="border-2 w-full active:border-black rounded-xl flex mb-2 p-3 items-center justify-between">
          <img className="h-10" src="/ubersmall.jpg" alt="" />
          <div className="w-1/2 ml-2">
            <h4 className="font-medium text-base">
              UberGo{" "}
              <span>
                <i className="ri-user-fill"></i>4
              </span>
            </h4>
            <h5 className="font-medium text-sm">{convertDistance(props.distance)} Km away</h5>
            <p className="font-normal text-sm text-gray-600">
              Affordable, compact rides
            </p>
          </div>
          <h2 className="font-semibold text-xl">₹ {props.fare.car}</h2>
        </div>
        <div onClick={() => {
            props.setRide(true)
            props.setvehicletype("moto")
        }} className="border-2 w-full active:border-black rounded-xl flex mb-2 p-3 items-center justify-between">
          <img className="h-10" src="/uberbike.png" alt="" />
          <div className="w-1/2 ml-2">
            <h4 className="font-medium text-base">
              UberGo{" "}
              <span>
                <i className="ri-user-fill"></i>2
              </span>
            </h4>
            <h5 className="font-medium text-sm">{convertDistance(props.distance)} Km away</h5>
            <p className="font-normal text-sm text-gray-600">
              Affordable, motor rides
            </p>
          </div>
          <h2 className="font-semibold text-xl">₹ {props.fare.moto}</h2>
        </div>
        <div onClick={() => {
            props.setRide(true)
            props.setvehicletype("auto")
        }} className="border-2 w-full active:border-black rounded-xl flex mb-2 p-3 items-center justify-between">
          <img className="h-10" src="/uberauto.png" alt="" />
          <div className="w-1/2 ml-2">
            <h4 className="font-medium text-base">
              UberGo{" "}
              <span>
                <i className="ri-user-fill"></i>3
              </span>
            </h4>
            <h5 className="font-medium text-sm">{convertDistance(props.distance)} Km away</h5>
            <p className="font-normal text-sm text-gray-600">
              Affordable, tuk-tuk rides
            </p>
          </div>
          <h2 className="font-semibold text-xl">₹ {props.fare.auto}</h2>
        </div>
    </div>
  );
}

export default VehiclePanel;
