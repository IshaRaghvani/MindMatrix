import React from "react";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div
      style={{
        backgroundColor: "black",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "3rem",
        
        color: "black",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 1rem",
        boxShadow: "0px 0px 4px 2px rgba(0, 0, 0, 0.2)",
        zIndex: 1000,
      }}
    >
      {/* <div style={{ fontSize: "1rem",color:"white" }}>
        MINDMATRIX
      </div> */}
      <div>
        <button
          onClick={() => handleNavigation("/UploadPage")}
          style={{
            marginLeft: "1rem",
            color: "white",
            textDecoration: "none",
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
            fontSize: "inherit"
          }}
        >
          Upload Page
        </button>
        <button
          onClick={() => handleNavigation("/Visualize")}
          style={{
            marginLeft: "1rem",
            color: "white",
            textDecoration: "none",
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
            fontSize: "inherit"
          }}
        >
          Visualize
        </button>
        <button
          onClick={() => handleNavigation("/Preprocess")}
          style={{
            marginLeft: "1rem",
            color: "white",
            textDecoration: "none",
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
            fontSize: "inherit"
          }}
        >
          Preprocess
        </button>
        <button
          onClick={() => handleNavigation("/ModelRecommand")}
          style={{
            marginLeft: "1rem",
            color: "white",
            textDecoration: "none",
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
            fontSize: "inherit"
          }}
        >
          Model 
        </button>
      </div>
    </div>
  );
}

export default NavBar;
  