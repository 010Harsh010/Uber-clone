import React from 'react';
import { Routes,Route } from 'react-router-dom';
import Start from './pages/Start.jsx';
import UserLogin from "./pages/UserLogin.jsx"
import CaptainLogin from './pages/CaptainLogin.jsx';
import CaptainRegister from './pages/CaptainRegister.jsx';
import UserRegister from "./pages/UserRegister.jsx"
import Home from "./pages/Home.jsx"
import UserProtectWraper from './pages/UserProtectWrapper.jsx';
import UserLogout from './pages/UserLogout.jsx';
import CaptainHome from "./pages/CaptainHome.jsx"
import CaptainProtectWrapper from './pages/CaptainProtectWrapper.jsx';
import Riding from "./pages/Riding.jsx"
import CaptionRiding from './pages/CaptionRiding.jsx';
import UserDashBoard from './pages/UserDashBoard.jsx';
const App = () => {
  return (
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/register" element={<UserRegister />} />
          <Route path="/captain/login" element={<CaptainLogin />} />
          <Route path="/captain/register" element={<CaptainRegister />} />
          <Route path='/home' element={
            <UserProtectWraper>
              <Home />
            </UserProtectWraper>
          }/>
          <Route path="/logout" element={
            <UserProtectWraper>
              <UserLogout />
            </UserProtectWraper>
          } />
          <Route path='/Captainhome' element={
            <CaptainProtectWrapper>
              <CaptainHome />
            </CaptainProtectWrapper>
          }/>
          <Route path='/dashboard' element={
            <UserProtectWraper>
              <UserDashBoard/>
            </UserProtectWraper>
          }/>
          <Route path='/riding' element={
            <Riding/>
          }/>
          <Route path='/captainriding' element={
            <CaptionRiding/>
          }/>
        </Routes>

  );
}

export default App;
