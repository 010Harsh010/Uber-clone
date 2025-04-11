import React from "react";
import { useState, useRef,useContext,useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {useSelector} from "react-redux"
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConformedRide from "../components/ConformedRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import axios from "axios"
import { SocketContext } from "../context/SocketContext.jsx"
import { useNavigate } from "react-router-dom";
function Home() {
  const user = useSelector((state) => state.user.currentUser);
  const panelRef = useRef();
  const navigate = useNavigate();
  const {socket} = useContext(SocketContext);
  const [pickup, setpickup] = useState("");
  const [destination, setdestination] = useState("");
  const [panel, setpanel] = useState(false);
  const [vehiclePanel,setVehiclePanel] = useState(false);
  const panelDown = useRef(null);
  const vehiclePanelRef = useRef(null);
  const [ride, setRide] = useState(false);
  const rideRef = useRef(null);
  const [vehicleFound,setVehicleFound] = useState(false)
  const vehicleFoundRef = useRef(null);
  const WaitingForDriverRef = useRef(null);
  const [active, setactive] = useState(true);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [fare,setfare] = useState({});
  const [vehicleType,setvehicletype] = useState(null);
  const [driver, setdriver] = useState({});
  const [distance,setdistance] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  
  useEffect(() => {
    socket.emit("join",{userType: "user",userId:user._id })
  }, [user._id,socket]);

  useEffect(() => {
    socket.on("ride-confirmed", (rides) => {
      console.log("riding rides",rides);
      
      // const { pickup,user, destination, fare,_id, status,captain, otp } = rides; // Destructure only required data
      // setdriver({ pickup, destination,user, fare,status,_id, captain, otp }); // Set only the required data
      setdriver(rides);
      setWaitingForDriver(true);
      setVehicleFound(false);
      setVehiclePanel(false);
    });
  }, [socket]);
  
  useEffect(() => {
    socket.on("ride-started",data => {
      setWaitingForDriver(false);
      console.log("Ride Started",driver);
      navigate("/riding",{
        state: {
          ride: driver
        }
      });
    })
  }, [socket,driver]);
  useGSAP(
    function () {
      if (panel) {
        gsap.to(panelRef.current, {
          height: "70%",
          opacity: 1,
          padding: 24,
        });
        gsap.to(panelDown.current, {
          opacity: 1,
        });
      } else {
        gsap.to(panelRef.current, {
          height: "0%",
          opacity: 0,
          padding: 0,
        });
        gsap.to(panelDown.current, {
          opacity: 0,
        });
      }
    },
    [panel]
  );
  useGSAP(
    function () {
      if (waitingForDriver) {
        gsap.to(WaitingForDriverRef.current, {
          transform: 'translateY(0)',
          opacity:1,
        })
      }else{
        gsap.to(WaitingForDriverRef.current, {
          transform: 'translateY(100%)',
          opacity: 0,
        })
      }
    },[vehiclePanel]
  )
  useGSAP(
    function () {
      if (vehiclePanel) {
        gsap.to(vehiclePanelRef.current, {
          transform: 'translateY(0)',
          opacity:1,
        })
      }else{
        gsap.to(vehiclePanelRef.current, {
          transform: 'translateY(100%)',
          opacity: 0,
        })
      }
    },[vehiclePanel]
  )
  useGSAP(
    function () {
      if (ride) {
        gsap.to(rideRef.current, {
          transform: 'translateY(0)',
          opacity: 1,
        })
      }else{
        gsap.to(rideRef.current, {
          transform: 'translateY(100%)',
          opacity: 0
        })
      }
    },[ride]
  )
  useGSAP(
    function () {
      if (vehicleFound) {
        gsap.to(vehicleFoundRef.current, {
          transform: 'translateY(0)',
          opacity: 1
        })
      }else{
        gsap.to(vehicleFoundRef.current, {
          transform: 'translateY(100%)',
          opacity: 0,
        })
      }
    },[vehicleFound]
  )

  async function findTrip () {
    try {
      const body = {
        "pickup": pickup,
        "destination": destination
      }
      const response = await axios.post("http://localhost:4000/ride/getfare",body,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      if (response) {
        console.log(response.data);
        setfare(response.data.fare);
        setdistance(response.data.text);
      }else{
        throw new Error("Unable to Find Fare");
      }
      // setfare(
      //   { auto: 918, car: 1382, moto: 720 }
      // )
    } catch (error) {
      console.log(error.message);
      setVehiclePanel(false);
      setpanel(true);
    }
  }

  async function createRide(){
    const body = {
        "pickup": pickup,
        "destination": destination,
        "vehicleType" :vehicleType
      }
      const response = await axios.post("http://localhost:4000/ride/create",body,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      if (response){
        console.log(response.data);
      }else{
        throw new Error("Unable to Find Fare");
      }
    console.log("created");
  }
  return (
    <div className={`h-screen w-full relative overflow-hidden`}>
      <div className={`p-6 flex  fixed items-center justify-between top-0 w-full ${panel?"":"z-10"}`}>
        <img onClick={() => {
        navigate("/dashboard")
      }} className="w-16" src="/uberlogo.png" alt="" />
          <i onClick={()=>{
            navigate("/logout")
          }} className="text-lg font-medium ri-logout-box-r-line"></i>
      </div>
      <div  className="h-screen w-screen bg-cover">
        <img
          className="h-full w-full object-cover"
          src="/ubermap.gif"
          alt="map"
        />
      </div>
      <div className="h-screen flex flex-col absolute top-0 w-full justify-end">
        <div className="h-[30%] p-6 relative bg-white bottom-0 w-full">
          <h5
            ref={panelDown}
            className="right-5 top-3 absolute text-2xl opacity-0"
            onClick={() => {
              setpanel(!panel);
            }}
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className="text-3xl font-semibold">Find a Trip</h4>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="line absolute h-16 w-1 top-[45%] left-10 bg-gray-900 rounded-full"></div>
            <input
              onClick={() => {setpanel(true);
                setactive(true);
              }}
              value={pickup}
              onChange={(e) => setpickup(e.target.value)}
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5"
              type="text"
              placeholder="Enter your pick-up location"
            />
            <input
              value={destination}
              onClick={() => {setpanel(true)
                setactive(false);
              }}
              onChange={(e) => setdestination(e.target.value)}
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5"
              type="text"
              placeholder="Enter your Destination "
            />
          </form>
        </div>
        <div ref={panelRef} className="opacity-0 bg-white">
          <button onClick={() => {
            if (pickup==="" || destination===""){
              return ;
            }
            setVehiclePanel(true);
            setpanel(false);
            findTrip();
          }} className="bg-black text-white w-full py-2 px-4 mt-1 rounded-lg right-0">Find Trip</button>
          <LocationSearchPanel pickup={pickup} destination={destination} setpanel={setpanel} active={active} setpickup={setpickup} setdestination={setdestination} setVehiclePanel={setVehiclePanel}/>
        </div>
      </div>
      {
        vehiclePanel && (
          <div ref={vehiclePanelRef} className="w-full z-10 fixed bottom-0 translate-y-full px-3 py-10 pt-12 bg-white">
        <VehiclePanel distance={distance} setvehicletype={setvehicletype} fare={fare} setRide={setRide} setVehiclePanel={setVehiclePanel}/>
      </div>
        )
      }
      {
        ride && (
          <div  ref={rideRef} className="w-full z-10 fixed bottom-0 translate-y-full px-3 py-6 pt-12 bg-white">
        <ConformedRide pickup={pickup} destination={destination} fare={fare} createRide={createRide} vehicleType={vehicleType} setRide= {setRide} setVehicleFound={setVehicleFound}/>
      </div>
        )
      }
      {
        vehicleFound && (
          <div ref={vehicleFoundRef} className="w-full z-10 fixed bottom-0 translate-y-full px-3 py-6 pt-12 bg-white">
        <LookingForDriver pickup={pickup} destination={destination} fare={fare} vehicleType={vehicleType} setVehicleFound={setVehicleFound}/>
      </div>
        )
      }
      {
        waitingForDriver && (
          <div ref={WaitingForDriverRef} className="w-full z-10 translate-y-full fixed bottom-0  px-3 py-6 pt-12 bg-white">
        <WaitingForDriver driver={driver} setWaitingForDriver={setWaitingForDriver} />
      </div>
        )
      }
    </div>
  );
}

export default Home;
