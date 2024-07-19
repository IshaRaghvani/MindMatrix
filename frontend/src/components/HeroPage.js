import {React, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import "../styles/hero.css"; 
import Spline from '@splinetool/react-spline';
        
const HeroPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/UploadPage");
  };


  return (
    <>
      <NavBar />
      <div className="hero-background">
        {/* <spline-viewer url="https://prod.spline.design/fpC8a8b9Omje5FND/scene.splinecode"></spline-viewer> */}

        {/* <Spline scene="https://prod.spline.design/fpC8a8b9Omje5FND/scene.splinecode" />  */}
        {/* <Spline
        scene="https://prod.spline.design/6137cd46-d99f-4c48-959c-15b781baf662/scene.splinecode"
      />     */}
        <spline-viewer url="https://prod.spline.design/L2qBS76WvklLEB-j/scene.splinecode"></spline-viewer>  
      
      </div>
      <div className="main-div">
        <h1>MindMatrix</h1>
        <div className="small-text">
          <p>
            MindMatrix is an innovative solution that leverages LLM to create powerful data synergies. By
            integrating these three fundamental principles of human knowledge,
            MindMatrix offers a unique approach to data management and analysis.
          </p>
        </div>
        <button className="button-start" onClick={handleClick}>
          Get Started
        </button>
        <div className="info-boxes">
          <div className="info-box">
            <h2>Harness the Power of LLM</h2>
            <p>
              MindMatrix revolutionizes data management by integrating LLM principles to create powerful data
              synergies.
            </p>
          </div>
          <div className="info-box">
            <h2>Context-Aware Preprocessing</h2>
            <p>
              Our innovative approach integrates Large Language Models (LLMs) to
              extract crucial context from datasets, ensuring optimal selection
              of machine learning models for more efficient workflows.
            </p>
          </div>
          <div className="info-box">
            <h2>Redefining Benchmarks</h2>
            <p>
              Join us in ushering in a new era of automated data preprocessing
              and model selection. With MindMatrix, gain a competitive edge and
              unlock unparalleled insights from your data.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroPage;
