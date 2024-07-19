import React from "react";
import "../styles/hero.css";
import loading from "../assets/loading.gif";
import "../styles/hero.css";

const LoadingPage = ({ text }) => {
  return (
    <div className="loading-modal">
      
      <div className="loading-content">
      <h3>MINDMATRIX</h3>
        <h3>Loading</h3>
        <img src={loading} alt="Loading" />
        <p>{text}</p>
      </div>
    </div>
  );
};

export default LoadingPage;
