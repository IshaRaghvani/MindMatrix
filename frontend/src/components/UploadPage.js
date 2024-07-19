import React, { useState, useContext } from "react";
import "../styles/hero.css";
import NavBar from "./NavBar";
import image from "../assets/image.png";
import data from "../assets/data.png";
import brain from "../assets/brain.png";
import { UploadOutlined } from "@ant-design/icons";
import Papa from "papaparse";
import { useNavigate } from "react-router-dom";
import LoadingPage from "./LoadingPage";
import { DataContext } from "./DataContext";

const UploadPage = () => {
  const [checkedStates, setCheckedStates] = useState([false, false, false]);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [proceedClicked, setProceedClicked] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [loadingVisualize, setLoadingVisualize] = useState(false);
  const [loadingPreprocess, setLoadingPreprocess] = useState(false);
  const [columnNames, setColumnNames] = useState([]); // State to store column names
  const [selectedColumn, setSelectedColumn] = useState(""); // State to store the selected column
  const { setAnalyseData, setPreprocessedData, setModelData } = useContext(DataContext);
  const handleUploadIconClick = () => {
    document.getElementById("file-input").click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log("Selected file:", file);
    setUploadedFile(file);

    // Parse the CSV file to extract column names
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        const columns = results.meta.fields;
        console.log("Column names:", columns);
        setColumnNames(columns);
      },
    });
  };

  const handleCheckboxChange = (index) => {
    const newCheckedStates = [...checkedStates];
    newCheckedStates[index] = !newCheckedStates[index];
    setCheckedStates(newCheckedStates);
  };

  const handleDropdownChange = (event) => {
    const selectedColumnName = event.target.value;
    const selectedColumnIndex = columnNames.indexOf(selectedColumnName);
    console.log("Selected column:", selectedColumnName);
    console.log("Column index:", selectedColumnIndex);
    setSelectedColumn(selectedColumnName);
  };

  const navigate = useNavigate();

  const handleProceedClick = async () => {
    setLoadingVisualize(false);
    setLoadingPreprocess(false);
    setProceedClicked(true);
  
    // Find the index of the checkbox that is selected
    const selectedIdx = checkedStates.findIndex((checked) => checked);
    const apiCalls = [];
    // Display the corresponding pages based on the selected checkbox
    switch (selectedIdx) {
      case 0:
        setLoadingVisualize(true);
        console.log("Displaying Visualization screen");
        try {
          console.log("Uploaded file:", uploadedFile);
  
          const formData = new FormData();
          formData.append("csvFile", uploadedFile);
  
          const response = await fetch("http://172.20.10.6:8000/api/analysis/", {
            method: "POST",
            body: formData,
          });
  
          if (response.ok) {
            const data = await response.json();
            console.log("Response from server:", data);
  
            // setResponseData(data);
            setAnalyseData(data);
  
            navigate("/Visualize");
          } else {
            console.log("Failed to upload file. Status:", response.status);
          }
        } catch (error) {
          console.error("Error uploading file:", error);
        }
        break;
      case 1:
        setLoadingPreprocess(true);
        console.log("Displaying Data Processing screen");
        if (uploadedFile && selectedColumn) {
          try {
            const formData = new FormData();
            formData.append("csvFile", uploadedFile);

            const response = await fetch("http://172.20.10.6:8000/api/analysis/", {
            method: "POST",
            body: formData,
          });
  
          if (response.ok) {
            const data = await response.json();
            console.log("Response from server:", data);  
            setAnalyseData(data);

          } else {
            console.log("Failed to upload file. Status:", response.status);
          }
            console.log(columnNames.indexOf(selectedColumn))
            formData.append("target", columnNames.indexOf(selectedColumn)); // Append the target column index
  
            console.log("Calling preprocess API...");
            apiCalls.push(
              fetch("http://172.20.10.6:8000/api/preprocess/", {
                method: "POST",
                body: formData,
              })
            );
  
            const responses = await Promise.all(apiCalls);
  
            responses.forEach(async (response, index) => {
              if (response.ok) {
                const data = await response.json();
                console.log(`Response from API ${index + 1}:`, data);
  
                console.log("Formatted data:", JSON.stringify(data));
                setPreprocessedData(data);
                navigate("/Preprocess");
              } else {
                console.log(
                  `Failed to call API ${index + 1}. Status:`,
                  response.status
                );
              }
            });
          } catch (error) {
            console.error("Error preprocessing file:", error);
          }
        }
        break;
      case 2:
        setLoadingVisualize(true);
        console.log("Displaying Model Recommendation screen");
        if (uploadedFile) {
          try {
            const formData = new FormData();
            formData.append("csvFile", uploadedFile);

            const response = await fetch("http://172.20.10.6:8000/api/analysis/", {
            method: "POST",
            body: formData,
          });
  
          if (response.ok) {
            const data = await response.json();
            console.log("Response from server:", data);
  
            // setResponseData(data);
            setAnalyseData(data);
  
          } else {
            console.log("Failed to upload file. Status:", response.status);
          }
            const i= columnNames.indexOf(selectedColumn)
            formData.append("target", i);
            console.log("Calling preprocess API...");
            const preprocessResponse = await fetch(
              "http://172.20.10.6:8000/api/preprocess/",
              {
                method: "POST",
                body: formData,
              }
            );
  
            if (preprocessResponse.ok) {
              const preprocessedData = await preprocessResponse.json();
              const pdata = JSON.stringify(preprocessedData);
              console.log("Preprocessed data:", pdata);
  
              console.log("Calling model API...");
              const modelResponse = await fetch(
                "http://172.20.10.6:8000/api/model/",
                {
                  method: "POST",
                  body: pdata,
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );
  
              if (modelResponse.ok) {
                const modelData = await modelResponse.json();
                console.log("Model recommendation data:", modelData);
                setPreprocessedData(preprocessedData);
                //navigate("/ModelRecommand", { state: { modelData } });
                setModelData(modelData);
                
                navigate("/ModelRecommand");
              } else {
                console.log(
                  "Failed to call model API. Status:",
                  modelResponse.status
                );
              }
            } else {
              console.log(
                "Failed to call preprocess API. Status:",
                preprocessResponse.status
              );
            }
          } catch (error) {
            console.error("Error preprocessing file:", error);
          }
        }
        break;
      default:
        console.log("No screen to display");
    }
  };
  
  return (
    <>
      <NavBar />
      <div className="main-div">
        {(loadingVisualize || loadingPreprocess) && (
          <LoadingPage
            text={
              loadingVisualize
                ? "Exploring your data to uncover insights. This may take a moment as we analyze the structure and characteristics of your dataset. Thank you for your patience."
                : "Preprocessing Data..."
            }
          />
        )}
        <p style={{ textAlign: "left" }}>Add a dataset to get started</p>
        <div className="upload-area">
          <div
            style={{ display: "inline-flex", alignItems: "center" }}
            onClick={handleUploadIconClick}
          >
            <UploadOutlined color="white" />
            <p style={{ padding: "3rem", fontSize: "14px", color: "#686868" }}>
              Upload your dataset
            </p>
          </div>
          <input
            id="file-input"
            type="file"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>

        {uploadedFile && (
          <div
            className="file-box"
            style={{
              background: "#E4E4E4",
              padding: "9px",
              fontSize: "13px",
              height: "30px",
              borderRadius: "7px",
              alignContent: "center",
            }}
          >
            <p style={{ color: "blue" }}>{uploadedFile.name}</p>
          </div>
        )}

        {columnNames.length > 0 && (
          <div style={{ marginTop: "1rem" ,fontSize:"16px"}}>
            <label htmlFor="target-column">Select target column:</label>
            <select
              id="target-column"
              value={selectedColumn}
              onChange={handleDropdownChange}
              style={{
                marginLeft: "0.7rem",
                padding: "0.7rem",
                borderRadius: "5px",
                borderColor: "grey",
                ontSize:"16px"

              }}
            >
              <option value="" disabled>
                -- Select Column --
              </option>
              {columnNames.map((col, index) => (
                <option key={index} value={col}>
                  {col}
                </option>
              ))}
            </select>
          </div>
        )}

        <button
          style={{
            backgroundColor: "#5479ff",
            margin: "1rem",
            width: "8rem",
            height: "2rem",
            color: "white",
            fontWeight: "600",
            borderRadius: "7px",
            borderColor: "white",
            borderWidth: "1px",
          }}
          onClick={handleProceedClick}
        >
          Proceed
        </button>
        <div className="info-boxes">
          <div
            className="info-box"
            style={{
              backgroundColor: checkedStates[0] ? "black" : "transparent",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={image}
                alt="Logo"
                style={{ height: "2rem", marginRight: "8rem" }}
              />
              <input
                type="checkbox"
                style={{ transform: "scale(1.5)" }}
                checked={checkedStates[0]}
                onChange={() => handleCheckboxChange(0)}
              ></input>
            </div>
            <h2>Exploratory Data Analysis</h2>
            <p>
              Visualize Data Your Way: Gain deeper insights by uploading your
              dataset and let MindMatrix transform it into visually engaging
              charts and graphs.
            </p>
          </div>
          <div
            className="info-box"
            style={{
              backgroundColor: checkedStates[1] ? "black" : "transparent",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={data}
                alt="Logo"
                style={{ height: "2rem", marginRight: "8rem" }}
              />
              <input
                type="checkbox"
                style={{ transform: "scale(1.5)" }}
                checked={checkedStates[1]}
                onChange={() => handleCheckboxChange(1)}
              ></input>
            </div>
            <h2>Data PreProcessing</h2>
            <p>
              Refine Your Data: Optimize your dataset effortlessly with
              MindMatrix's powerful preprocessing tools, ensuring it's primed
              for insightful analysis.
            </p>
          </div>
          <div
            className="info-box"
            style={{
              backgroundColor: checkedStates[2] ? "black" : "transparent",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={brain}
                alt="Logo"
                style={{ height: "2rem", marginRight: "8rem" }}
              />
              <input
                type="checkbox"
                style={{ transform: "scale(1.5)" }}
                checked={checkedStates[2]}
                onChange={() => handleCheckboxChange(2)}
              ></input>
            </div>
            <h2>Model Recommendation</h2>
            <p>
              Elevate Your Analysis: Access tailored machine learning models
              recommended by MindMatrix based on your dataset's unique
              characteristics, enhancing the accuracy and relevance of your
              insights.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadPage;
