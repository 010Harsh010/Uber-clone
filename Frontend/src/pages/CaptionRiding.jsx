import React, { useRef, useState } from 'react';
import { Link,useLocation } from 'react-router-dom';
import "remixicon/fonts/remixicon.css";
import FinishRidePopUp from '../components/FinishRidePopUp';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";


function CaptionRiding() {
  if (localStorage.getItem("chats")){
    localStorage.removeItem("chats");
  }
    const [FinishRidePanel,setfinishRidePanel] = useState(false);
    const FinishRidePanelRef = useRef(null);
    const location = useLocation();
    const rideData = location.state?.ride;
    useGSAP(
        function () {
          if (FinishRidePanel) {
            gsap.to(FinishRidePanelRef.current, {
              transform: 'translateY(0)',
            })
          }else{
            gsap.to(FinishRidePanelRef.current, {
              transform: 'translateY(100%)',
            })
          }
        },[FinishRidePanel]
      )
  return (
    <div className='h-screen fixed'>
      <div className='p-6 flex fixed items-center justify-between top-0 w-full'>
        <img className="w-16" src="/uberlogo.png" alt="" />
        <Link to={"/Captainhome"} className='flex items-center justify-center rounded-full w-10 h-10 bg-white'>
      <i className="text-lg font-medium ri-logout-box-r-line"></i>
      </Link>
      </div>
      <div className='h-4/5'>
        <img
          className="h-full w-full object-cover"
          src="/ubermap.gif"
          alt="map"
        />
      </div>
      <div onClick={() => {
        setfinishRidePanel(true)
      }} className='h-1/5 p-6 bg-yellow-400 flex relative items-center justify-between'>
      <h5
        className="p-1 absolute text-center  top-0 w-[95%] "
      >
        <i className="text-3xl text-black ri-arrow-down-wide-line"></i>
      </h5>
            <h4 className='text-xl font-semibold'>{rideData?.distance}iles away</h4>
            <button className='bg-green-600 font-semibold text-white p-3 px-10 rounded-lg'>Complete Ride</button>
      </div>
      <div  ref={FinishRidePanelRef} className="w-full z-10 translate-y-full  fixed bottom-0  px-3 py-6 pt-12 bg-white">
            <FinishRidePopUp rideData={rideData} setfinishRidePanel={setfinishRidePanel}/>
      </div>
    </div>
  );
}

export default CaptionRiding;
