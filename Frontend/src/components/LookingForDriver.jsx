import React from "react";

function LookingForDriver(props) {
  const images = {
    "car" : "/ubersmall.jpg",
    "moto" : "/uberbike.png",
    "auto" : "/uberauto.png"
  }
  return (
    <div>
      <h5
        className="p-1  text-center absolute top-0 w-[93%] "
        onClick={() => {
          props.setVehicleFound(false);
          
        }}
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Looking for a driver</h3>
      <div className="flex gap-2 justify-between flex-col items-center">
        <img className="h-20" src={images[props.vehicleType]} alt="" />
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 border-b-2 p-3">
            <i className="text-lg ri-map-pin-user-line"></i>
            <div>
              <h3 className="text-lg font-medium">{props.pickup.split(",")[0]}</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {props.pickup}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 border-b-2 p-3">
            <i className="text-lg ri-map-pin-fill"></i>
            <div>
              <h3 className="text-lg font-medium">{props.destination.split(",")[0]}</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {props.destination}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
            <i className="text-lg ri-secure-payment-line"></i>
            <div>
              <h3 className="text-lg font-medium">₹ {props.fare[props.vehicleType]}</h3>
              <p className="text-sm -mt-1 text-gray-600"> Online </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LookingForDriver;
