import React from 'react';
import {Link} from "react-router-dom"
function Start() {
  return (
    <div className='bg-cover bg-center bg-[url("/homeback.png")] h-screen pt-8 flex justify-between flex-col w-full'>
        <img className='w-16 ml-8' src="/uberlogo.png" alt="Logo" />
        <div className='bg-white pb-7 py-4 px-4' >
            <h2 className='text-3xl font-bold'>Get Started With Uber</h2>
            <Link to="/login" className=' flex items-center justify-center w-full bg-black py-3 text-white rounded mt-4'>Continue</Link>
        </div>
    </div>
  );
}

export default Start;
