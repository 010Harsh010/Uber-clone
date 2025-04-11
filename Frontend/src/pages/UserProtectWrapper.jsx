import axios from "axios";
import React, { useEffect, useState ,useContext} from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../context/userSlice";
function UserProtectWrapper({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [isLoading,setIsLoading] = useState(true);
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }else{
      axios.get(`http://localhost:4000/user/profile`,{
        headers: {
          'Authorization': `Bearer ${token}`
        },
        withCredentials:true
      }).then(response => {
        const data =response.data
        dispatch(setUser({
                  _id: data._id,
                  email: data.email,
                  firstname: data.fullname.firstname,
                  lastname: data.fullname.lastname,
                }))
        setIsLoading(false)
      })
      .catch(
        (error) => {
          console.log(error);
          navigate("/login")
        }
      )
    }
  }, [token, navigate]); 

  if (isLoading){
    return (
      <div>Loading...</div>
    )
  }
  if (isLoading){
    return null;
  }
  return <>{children}</>;
}

export default UserProtectWrapper;
