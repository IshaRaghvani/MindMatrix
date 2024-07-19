import React, { useState } from "react";
import "../styles/hero.css";
import NavBar from "./NavBar";
import image from "../assets/image.png";
import data from "../assets/data.png";
import brain from "../assets/brain.png";
import { UploadOutlined } from "@ant-design/icons";

import { useNavigate } from "react-router-dom";
import LoadingPage from "./LoadingPage";

const UploadPage = () => {
  const [checkedStates, setCheckedStates] = useState([false, false, false]);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [proceedClicked, setProceedClicked] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [loadingVisualize, setLoadingVisualize] = useState(false);
  const [loadingPreprocess, setLoadingPreprocess] = useState(false);

  const handleUploadIconClick = () => {
    document.getElementById("file-input").click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log("Selected file:", file); // Log the selected file
    setUploadedFile(file);
  };

  const handleCheckboxChange = (index) => {
    const newCheckedStates = [...checkedStates];
    newCheckedStates[index] = !newCheckedStates[index];
    setCheckedStates(newCheckedStates);
  };
  const navigate = useNavigate(); // Initialize the navigate function using useNavigate

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

          // Send the FormData object to the backend API endpoint
          const response = await fetch("http://localhost:8000/api/analysis", {
            method: "POST",
            body: formData,
          });

          if (response.ok) {
            // Parse the response as JSON
            const data = await response.json();
            console.log("Response from server:", data);

            setResponseData(data);

            // Navigate to the Visualize page with response data
            navigate("/Visualize", { state: { responseData: data } });
          } else {
            console.log("Failed to upload file. Status:", response.status);
          }
        } catch (error) {
          // Handle errors
          console.error("Error uploading file:", error);
        }
        break;
      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      case 1:
        setLoadingVisualize(true);
        console.log("Displaying Data Processing screen");
        // Make API call to send the CSV file to the backend for preprocessing
        if (uploadedFile) {
          try {
            const formData = new FormData();
            formData.append("csvFile", uploadedFile);
            console.log("Calling preprocess API...");
            // Call the API endpoint for preprocessing
            apiCalls.push(
              fetch("http://localhost:8000/api/preprocess", {
                method: "POST",
                body: formData,
              })
            );

            // Wait for all API calls to complete
            const responses = await Promise.all(apiCalls);

            // Handle responses
            responses.forEach(async (response, index) => {
              if (response.ok) {
                const data = await response.json();
                console.log(`Response from API ${index + 1}:`, data);

                console.log("Formatted data:", JSON.stringify(data));
                const preprocessed_data = JSON.stringify(data);
                navigate("/Preprocess", { state: { preprocessedData: data } });
              } else {
                console.log(
                  `Failed to call API ${index + 1}. Status:`,
                  response.status
                );
              }
            });

            // After both API calls are completed, navigate to the Preprocess page
          } catch (error) {
            // Handle errors
            console.error("Error preprocessing file:", error);
          }
        }
        break;
      //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      case 2:
      case 2:
        setLoadingVisualize(true);
        console.log("Displaying Model Recommendation screen");
        // Make API calls for analysis and preprocessing
        if (uploadedFile) {
          try {
            const formData = new FormData();
            formData.append("csvFile", uploadedFile);
            console.log("Calling analysis API...");
            // Call the analysis API endpoint
            apiCalls.push(
              fetch("http://localhost:8000/api/analysis", {
                method: "POST",
                body: formData,
              })
            );
            console.log("Calling preprocess API...");
            // Call the preprocessing API endpoint
            apiCalls.push(
              fetch("http://localhost:8000/api/preprocess", {
                method: "POST",
                body: formData,
              })
            );

            // Wait for all API calls to complete
            const responses = await Promise.all(apiCalls);

            // Handle responses
            responses.forEach(async (response, index) => {
              if (response.ok) {
                const data = await response.json();
                console.log(`Response from API ${index + 1}:`, data);

                if (index === 1) {
                  console.log("Calling model API...");
                  // Also call the model API endpoint
                  const modelResponse = await fetch(
                    "http://localhost:8000/api/model",
                    {
                      method: "POST",
                      body: JSON.stringify({
                        csv_data: data, // Use the preprocessed data from the response
                      }),
                      headers: {
                        "Content-Type": "application/json",
                      },
                    }
                  );

                  if (modelResponse.ok) {
                    const modelData = await modelResponse.json();
                    console.log("Model recommendation data:", modelData);
                    // Navigate to the Model Recommendation page
                    navigate("/ModelRecommendation", {
                      state: { modelData: modelData },
                    });
                  } else {
                    console.log(
                      "Failed to call model API. Status:",
                      modelResponse.status
                    );
                  }
                } else {
                  console.log("Formatted data:", JSON.stringify(data));
                  // Navigate to the Preprocess page with preprocessed data
                  navigate("/Preprocess", {
                    state: { preprocessedData: data },
                  });
                }
              } else {
                console.log(
                  `Failed to call API ${index + 1}. Status:`,
                  response.status
                );
              }
            });
          } catch (error) {
            // Handle errors
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
            <UploadOutlined color="#686868" />
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
              backgroundColor: checkedStates[0] ? "#f0f0f0" : "transparent",
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
              backgroundColor: checkedStates[1] ? "#f0f0f0" : "transparent",
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
              backgroundColor: checkedStates[2] ? "#f0f0f0" : "transparent",
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
