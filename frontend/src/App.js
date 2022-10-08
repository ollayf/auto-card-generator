import React from "react";
import Header from "./Header";
import MemeGenerator from "./MemeGenerator";
import "./style.css";

/**
 * Create 2 new components - Header and MemeGenerator
 * Header will only display things
 * MemeGenerator will be calling to an API and holding on to data
 * Each should be in their own file of the same name
 */

const App = () => {
    return (
        <div>
            <Header />
            <h2>Fill these in to watch the magic✨happen</h2>
            <MemeGenerator />
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
