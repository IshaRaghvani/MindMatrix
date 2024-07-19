import React, { useEffect, useRef, useState, useContext } from "react";
import "../styles/hero.css";
import { useNavigate, useLocation } from "react-router-dom";
import NavBar from "./NavBar";
import { DataContext } from "./DataContext";



const Visualize = () => {
  const navigate = useNavigate();
  const iframeRef = useRef(null);
  const location = useLocation();
  const [iframeLoaded, setIframeLoaded] = useState(false);
  // const [responseData, setResponseData] = useState(null);
  const { analyseData } = useContext(DataContext);


  const handleDownload = () => {
    const iframe = iframeRef.current;
    if (iframe) {
      const iframeDocument =
        iframe.contentDocument || iframe.contentWindow.document;
      const content = iframeDocument.documentElement.outerHTML;
      const blob = new Blob([content], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "EDA_Report.html";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  // useEffect(() => {
  //   if (location.state && location.state.responseData) {
  //     console.log("Response Data:", location.state.responseData);
  //     setResponseData(location.state.responseData);
  //   }
  // }, [location.state]);

  return (
    <>
      <NavBar />
      <div className="main" style={{ display: "flex", alignItems: "center", margin: "4rem" ,color:"white"}}>
        <div>
          <h4>Visualization and Exploratory Data Analysis</h4>
          <div className="small-text">
            <p>
              Here, you'll find a comprehensive overview of your dataset's key
              characteristics. Through summary statistics, visualizations like
              histograms and scatter plots, and analysis of missing values,
              you'll gain valuable insights into your data's distribution,
              patterns, and potential anomalies. EDA sets the foundation for
              informed decision-making and guides subsequent data preprocessing
              and analysis steps.
            </p>
          </div>
        </div>
        <button className="download" onClick={handleDownload}>
          Download
        </button>
      </div>
      {analyseData && (
        <div style={{ display: "flex", alignItems: "center", margin: "4rem" }}>
          <h5>Metadata:</h5>
          <p>{analyseData.metaData}</p>
        </div>
      )}
      <div style={{color:"white"}}>
        <iframe
          srcDoc={analyseData ? analyseData[Object.keys(analyseData)[0]] : "<p>Loading...</p>"}
          width="100%"
          height="600px"
          style={{
            border: "1px solid grey",
            marginLeft: "4rem",
            width: "90%",
            alignItems: "center",
            color:"white"
          }}
          title="Your HTML Page"
          onLoad={() => setIframeLoaded(true)}
          ref={iframeRef}
        ></iframe>
      </div>
    </>
  );
};

export default Visualize;