import React from "react";
import Header from "./components/Header";
import CardGenerator from "./Screens/CardGenerator";
// import Profile from "./Screens/Profile";
import Login from "./Screens/Login"
import "./style.css";
import {Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { useState } from "react";
import Settings from './Screens/Profile'
import Wait from './Screens/Wait'
import Home from './Screens/Home'
import axios from "axios";

/**
 * Create 2 new components - Header and MemeGenerator
 * Header will only display things
 * MemeGenerator will be calling to an API and holding on to data
 * Each should be in their own file of the same name
 */

const App = () => {
    const [isLog, setLog] = useState(false);
    const navigate = useNavigate();
    const [uid, setUid] = useState(1);
    const [username, setUsername] = useState('ollayf');
    const [permissionsId, setPerms] = useState(1);
    const [telegramId, setTelegram] = useState(333647246);

    
    return (
            <div>
                <Routes>
                    <Route exact path='/' element={<Login setLog={setLog}
                    setUid={setUid} setUname={setUsername} setPerms={setPerms} setTelegram={setTelegram} navigate={navigate}/>}/>
                    {/* <Route path='/profile' render={() => <Profile />}/> */}
                    {isLog && (
                        <Route path='/main' element={
                        <div>
                            <Header navigate={navigate}/>
                            <CardGenerator navigate={navigate} telegramId={telegramId} uid={uid} />
                        </div>
                    }/>
                    )}
                    {isLog && (
                        <Route path='/home' element={
                        <div>
                            {/* <Header navigate={navigate}/>
                            <Home /> */}
                            <Navigate to="/main"/> 
                        </div>
                    }/>
                    )}
                    {isLog && (
                        <Route path='/settings' element={
                        <div>
                            <Header navigate={navigate}/>
                            <Settings />
                        </div>
                    }/>
                    )}
                    {isLog && (
                        <Route path='/wait' element={
                        <div>
                            <Header navigate={navigate}/>
                            <Wait />
                        </div>
                    }/>
                    )}
                    
                    <Route path='*' element={<Navigate to="/"/>}/>
                </Routes>
            </div>
        )
};

export default App;

// import logo from './logo.svg';
// import ThemeSwitcher from "./components/ThemeSwitcher";
// import Navbar from "./components/Navbar";
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <Navbar/>
//       <header className="App-header">
//         {/* <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a> */}
//         {/* <ThemeSwitcher /> */}
//       </header>
//     </div>
//   );
// }

// export default App;
