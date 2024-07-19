import React, { useState, useContext } from "react";
import "../styles/hero.css";
import NavBar from "./NavBar";
import ModelBox from "./ModelBox"; // Import the ModelBox component
import { DataContext } from "./DataContext";

const ModelRecommand = () => {
  const { modelData } = useContext(DataContext);
  const [selectedModel, setSelectedModel] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleModelClick = (model) => {
    setSelectedModel(model);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <NavBar />
      <div
        className="main"
        style={{ display: "flex", alignItems: "center", margin: "4rem", color: "white" }}
      >
        <div>
          <h3>Model Recommendation</h3>
          <div className="small-text">
            <p>
              Based on the analysis of your dataset, we have identified and
              evaluated multiple machine learning models to recommend the most
              suitable one for your task.
            </p>
          </div>
          {/* Display recommended models using ModelBox */}
          <div className="model-list">
            {Array.isArray(modelData?.result) && modelData.result.length > 0 ? (
              modelData.result.map((model, index) => (
                <ModelBox key={index} model={model} onClick={() => handleModelClick(model)} />
              ))
            ) : (
              <p>No models available to recommend.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ModelRecommand;
