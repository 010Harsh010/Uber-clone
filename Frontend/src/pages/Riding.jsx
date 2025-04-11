import React ,{useEffect,useContext }from 'react';
import { Link ,useLocation} from 'react-router-dom';
import { SocketContext } from '../context/SocketContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
function Riding() {
  if (localStorage.getItem("chats")){
    localStorage.removeItem("chats");
  }
  const images = {
    "car" : "/ubersmall.jpg",
    "moto" : "/uberbike.png",
    "auto" : "/uberauto.png"
  }
    const navigate = useNavigate();
    const user = useSelector((state)=>state.user.currentUser);
    const location = useLocation();
    const rideData = location.state?.ride;
    const {socket} = useContext(SocketContext);
    console.log(rideData);

    const madePayment = async () => {
      const amount = rideData?.fare;
      const rideId = rideData?._id;
      console.log("data",rideData);
      
      const {data:{key}}= await axios.get("http://localhost:4000/api/key",{
        withCredentials:true
      });
      console.log(key);
      const response = await axios.post(
        "http://localhost:4000/payment/createpayment",
        {
          amount: Number(amount),
          rideId: rideId,
        },
        {
          withCredentials: true,
          cors: true,
        }
      );
      const options = {
        key: key,
        amount: null,
        currency: "INR",
        name: "UBER Drive",
        description: "Test Transaction",
        image:
          "data:image/webp;base64,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",
        order_id: response.data.data.razorpay_order_id, 
        callback_url: "http://localhost:4000/payment/paymentverification",
        prefill: {
          name: user.firstname + " " +user.lastname,
          email: user.email,
          contact: "9000090000",
        },
        notes: {
          address: "IIIT Sricity Student Project",
        },
        theme: {
          color: "#3399cc",
        },
      };
      const razor = new window.Razorpay(options);
      razor.open();
    }

    useEffect(() => {
      socket.on("ride-ended",(ride)=>{
        madePayment();
      })
    }, [socket]);
  return (

<div className='w-screen'><div className='h-screen w-full'>
      <div className='w-screen'></div>
      <Link to={"/home"} className='fixed flex items-center justify-center rounded-full w-10 h-10 bg-white top-2 right-2'>
      <i className="text-lg font-medium ri-home-3-line"></i>
      </Link>
      <div className='h-1/2 w-full'>
        <img
          className="h-full w-full object-cover"
          src="/ubermap.gif"
          alt="map"
        />
      </div>
      <div className='h-1/2 p-4 w-full'>
      <div className='flex items-center justify-between'>
        <img className="h-12" src={images[rideData?.captain?.vehicle?.vehicleType]} alt="" />
        <div className='text-right'>
          <h2 className='text-lg font-medium'>
            {rideData?.captain?.fullname?.firstname + " " + rideData?.captain?.fullname?.lastname}
          </h2>
          <h4 className='-mt-1 -mb-1 text-xl font-semibold'>{rideData?.captain?.vehicle?.plate}</h4>
          <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p>
        </div>
      </div>
      <div className="flex gap-2 justify-between flex-col items-center">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 border-b-2 p-3">
            <i className="text-lg ri-map-pin-fill"></i>
            <div>
              <h3 className="text-lg font-medium">{rideData?.destination.split(",")[0]}</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {rideData?.destination}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
            <i className="text-lg ri-secure-payment-line"></i>
            <div>
              <h3 className="text-lg font-medium">₹ {rideData?.fare}</h3>
              <p className="text-sm -mt-1 text-gray-600">Online</p>
            </div>
          </div>
        </div>
      </div>
        <button onClick={() => madePayment()} className=" mt-5 w-full bg-green-600 text-white font-semibold p-2 rounded-lg">Make a payment</button>
      </div>
    </div></div>
  );
}

export default Riding;
