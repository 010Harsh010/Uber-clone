import React,{useContext,useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { setCaptain } from '../context/captainSlice.js';
import axios from 'axios';

function CaptainProtectWrapper({
  children
}) {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [ isLoading, setIsLoading ] = useState(true);
  useEffect(() => {
    if (!token) {
      navigate("/captain/login")
    }
    axios.get(`http://localhost:4000/captions/profile`,{
      headers: {
        'Authorization': `Bearer ${token}`
      },
      withCredentials:true
    }).then(response => {
      const data = response.data;
      dispatch(setCaptain({
                          _id: data._id,
                          firstname: data.fullname.firstname,
                          lastname: data.fullname.lastname,
                          email: data.email,
                          color: data.vehicle.color,
                          plate: data.vehicle.plate,
                          capacity: data.vehicle.capacity,
                          vehicleType: data.vehicle.vehicleType,
                          status: data.status
                        }))
      setIsLoading(false);
      navigate("/Captainhome");
    })
    .catch(
      (error) => {
        console.log(error);
        navigate("/captain/login")
      }
    )
  }, [token,navigate]);
  if (isLoading){
    return (
      <div>
        Loading ... 
      </div>
    )
  }
  return (
    <>
      {
        children
      }
    </>
  );
}

export default CaptainProtectWrapper;
