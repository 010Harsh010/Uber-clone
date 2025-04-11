import React, { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CaptionDetails from "../components/CaptionDetails.jsx";
import RidePopUp from "../components/RidePopUp.jsx";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import axios from "axios";
import "remixicon/fonts/remixicon.css";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp.jsx";
import { SocketContext } from "../context/SocketContext.jsx";
import Sidebar from "../components/Sidebar.jsx";
import { useDispatch } from "react-redux";
import { setcurrentState, setRideData } from "../context/ridesSlice.js";
import { SidebarContext } from "../context/SidebarContext.jsx";
function CaptainHome() {
  const captain = useSelector((state) => state.captain.currentCaptain);
  const { socket } = useContext(SocketContext);
  const {sideOpen ,setsideOpen} = useContext(SidebarContext);
  const [ridemessage, setridemessage] = useState(false);
  const ridemessageRef = useRef(null);
  const [confirmridemessage, setconfirmridemessage] = useState(false);
  const confirmridemessageRef = useRef(null);
  const ridedata = useSelector((state) => state.ride.rideData);
  const [ride, setRide] = useState(null);
  const currentState = useSelector((state) => state.ride.currentState);


  useEffect(() => {
    // console.log("state",currentState);
    const current = localStorage.getItem("state");
    {
      const max = Math.max(currentState,current);
      localStorage.setItem('state',max);
    }
    if (Number(currentState)==1){
      setconfirmridemessage(false);
      setridemessage(false);
    }
    if (Number(currentState)==2){
      setridemessage(true);
      setconfirmridemessage(false);
    }
    if (Number(currentState)==3){
      setconfirmridemessage(true);
      setridemessage(false);
    }

  }, [currentState]);
  useEffect(() => {
    if (ridedata) {
      setRide(ridedata);
    }
  }, [ridedata]); 

  const [captionstats, setcaptionstats] = useState({});
  const dispatch = useDispatch();

  useGSAP(
    function () {
      if (ridemessage) {
        gsap.to(ridemessageRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(ridemessageRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [ridemessage]
  );
  useGSAP(
    function () {
      if (confirmridemessage) {
        gsap.to(confirmridemessageRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmridemessageRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmridemessage]
  );

  useEffect(() => {
    socket.emit("join", {
      userId: captain._id,
      userType: "captain",
    });
    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          socket.emit("update-location-captain", {
            userId: captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
        });
      }
    };

    const locationInterval = setInterval(updateLocation, 10000);
    updateLocation();

    return () => clearInterval(locationInterval);
  }, []);
  const finddata = async () => {
    const response = await axios.get("http://localhost:4000/captions/earned", {
      withCredentials: true,
    });
    setcaptionstats(response.data[0]);
  };
  useEffect(() => {
    finddata();
  }, []);

  useEffect(() => {
    socket.on("new-ride", (data) => {
      console.log(data);
      dispatch(setcurrentState(2));
      setRide(data);
      setridemessage(true);
    });
  }, [socket]);

  async function confirmride() {
    dispatch(setcurrentState(3));
    console.log("sending request", ride._id);
    const rideId = ride._id;
    const response = await axios.post(
      "http://localhost:4000/ride/confirmride",
      {
        rideId: rideId,
      },
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    dispatch(setRideData(ride));
    localStorage.removeItem("chats");
    console.log("ride Confirmed", response);
  }
  return (
    <div className="h-screen">
      {
        sideOpen && (
          <Sidebar />
        )
      }
      <div className="p-6 flex fixed items-center justify-between top-0 w-full">
        <img onClick={() => {
          setsideOpen((state) => !state);
        }} className="w-16" src="/uberlogo.png" alt="" />
        <Link
          to={"/logout"}
          className="flex items-center justify-center rounded-full w-10 h-10 bg-white"
        >
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className="h-3/5">
        <img
          className="h-full w-full object-cover"
          src="/ubermap.gif"
          alt="map"
        />
      </div>
      <div className="h-2/5 p-6">
        <CaptionDetails captionstats={captionstats} />
      </div>
      {RidePopUp && (
        <div
          ref={ridemessageRef}
          className="w-full z-10 translate-y-full  fixed bottom-0  px-3 py-6 pt-12 bg-white"
        >
          <RidePopUp
            ride={ride}
            dispatch={dispatch}
            setridemessage={setridemessage}
            setconfirmridemessage={setconfirmridemessage}
            confirmride={confirmride}
            setcurrentState={setcurrentState}
          />
        </div>
      )}
      {confirmride && (
        <div
          ref={confirmridemessageRef}
          className="h-screen w-full z-10 translate-y-full  fixed bottom-0  px-3 py-6 pt-12 bg-white"
        >
          <ConfirmRidePopUp
            ride={ride}
            setridemessage={setridemessage}
            setconfirmridemessage={setconfirmridemessage}
          />
        </div>
      )}
    </div>
  );
}

export default CaptainHome;
