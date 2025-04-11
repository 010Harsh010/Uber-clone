import React from 'react';
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';
import { convertDistance } from '../utils/Conversion.js';
import { useDispatch } from 'react-redux';
import { setcurrentState ,setRideData} from '../context/ridesSlice.js';
function FinishRidePopUp(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const endride = async()=>{
    dispatch(setcurrentState(4));
    console.log("riding iD",props?.rideData?._id);
    
    const response = await  axios.post("http://localhost:4000/ride/end-ride",{
      "rideId":props?.rideData?._id
    },
      {
        headers:{
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        "Content-Type": "application/json"
      }
    )
    if (response.status===200){
      dispatch(setcurrentState(1));
      dispatch(setRideData(null));
      navigate("/Captainhome")
    }
  }
  return (
    <div>
      <h5
        className="p-1  text-center absolute top-0 w-[93%] "
        onClick={() => {
          props.setfinishRidePanel(false);

        }}
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Finish this Ride</h3>
      <div className="flex items-center justify-between mt-4 p-4 border-2 border-yellow-400 rounded-lg">
        <div className="flex items-center gap-3 ">
          <img
            className="object-cover  h-12 w-12 rounded-full"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-CLu8oGWqWKR7-RE73C9JQw8xGSS67OiLLg&s"
            alt=""
          />
          <h2 className="text-xl font-medium">{props?.rideData?.user?.fullname?.firstname + " " + props?.rideData?.user?.fullname?.lastname}</h2>
        </div>
        <h5 className="text-lg font-semibold">{convertDistance(props?.rideData?.distance)} Km</h5>
      </div>
      <div className="flex gap-2 justify-between flex-col items-center">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 border-b-2 p-3">
            <i className="text-lg ri-map-pin-user-line"></i>
            <div>
              <h3 className="text-lg font-medium">{props?.rideData?.pickup.split(",")[0]}</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {props?.rideData?.pickup}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 border-b-2 p-3">
            <i className="text-lg ri-map-pin-fill"></i>
            <div>
              <h3 className="text-lg font-medium">{props?.rideData?.destination.split(",")[0]}</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {props?.rideData?.destination}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
            <i className="text-lg ri-secure-payment-line"></i>
            <div>
              <h3 className="text-lg font-medium">₹ {props?.rideData?.fare}</h3>
              <p className="text-sm -mt-1 text-gray-600">Online</p>
            </div>
          </div>
        </div>
        <div className="mt-6 w-full">
          
          <button
            onClick={endride}
            className="flex justify-center mt-5 w-full bg-green-600 text-white text-lg font-semibold p-3 rounded-lg"
          >
            Finish Ride
          </button>
        </div>
      </div>
    </div>
  );
}

export default FinishRidePopUp;
