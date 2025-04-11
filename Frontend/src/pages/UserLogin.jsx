import React,{useState} from "react";
import {Link,useNavigate} from  "react-router-dom"
import axios from "axios"
import {useDispatch} from "react-redux"
import {setUser} from "../context/userSlice.js"
function UserLogin() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit=async(e) => {
    e.preventDefault();
    const users = {email,password};
    // setuserData(users);
    try {
      const response = await axios.post(`http://localhost:4000/user/login`,
        users,
      {
        headers:{
          "Content-Type": "application/json"
        },
        withCredentials: true,
      })
      console.log(response);
      if (response.status === 200) {
        const data = response.data.user
        dispatch(setUser({
          _id: data._id,
          email: data.email,
          firstname: data.fullname.firstname,
          lastname: data.fullname.lastname,
        }))
        localStorage.setItem('token', response.data.token)
        navigate('/home')
      }
    } catch (error) {
      console.log(error);
    }
    finally{
      setemail("");
      setpassword("");
    }
  }
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
      <img className='w-16 mb-10' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s" alt="" />
      <form onSubmit={(e) => handleSubmit(e)}>
        <h3 className='text-lg font-medium mb-2'>What's your email</h3>
        <input
        value={email}
        onChange={(e) => setemail(e.target.value)}
          className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
          type="email"
          required
          placeholder="email@example.com"
        />
        <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
        <input   
        value={password}
        onChange={(e) => setpassword(e.target.value)}
        className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base' required type="password" placeholder="password" />
        <button className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'>Login</button>
        <p className='text-center'>New here? <Link to='/register' className='text-blue-600'>Create new Account</Link></p>
      </form>
      </div>
      <div>
        <Link
          to='/captain/login'
          className='bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
        >Sign in as Captain</Link>
      </div>
    </div>
  );
}

export default UserLogin;
