import React from "react";
// import Login from "./components/Landing/Login";
import './components/Layout/Styles.css';
import Header from "./components/Header/Header";
import './app.css';
import './components/Layout/Styles.css'
import LandingMain from "./components/Landing/LandingMain";

function App() {

  return (
    <div>
        <Header />
        <LandingMain />
        {/* <Login /> */}
        {/* https://www.figma.com/proto/JhjdGahFCmYoqDnomDcFfF/New-Web?node-id=1%3A36&scaling=min-zoom&page-id=0%3A1&starting-point-node-id=1%3A36&hide-ui=1 */}
    </div>
  );
}

export default App;
