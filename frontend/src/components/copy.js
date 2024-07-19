import React, { useState, useEffect } from "react";
import { UpOutlined, DownOutlined } from "@ant-design/icons"; // Import the icons

const ModelBox = ({ model, onClick }) => {
  const [expanded, setExpanded] = useState(false);
console.log(model);
  const handleToggleExpand = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    console.log("ModelBox rendered with model:", model);
  }, [model]); // Log whenever the model object changes

  return (
    <div className={`model-box ${expanded ? 'expanded' : ''}`} onClick={onClick}>
      <span>{model.model_name}</span>
      {/* Use icons instead of button */}
      {expanded ? <UpOutlined onClick={(e) => { e.stopPropagation(); handleToggleExpand(); }} /> : <DownOutlined onClick={(e) => { e.stopPropagation(); handleToggleExpand(); }} />}
      {/* Display model info if expanded */}
      {expanded && (
        <div className="model-info">
          <p><strong>Best Parameters:</strong></p>
          <ul>
            {Object.entries(model.best_parameters).map(([key, value], index) => (
              <li key={index}><strong>{key}:</strong> {value}</li>
            ))}
          </ul>
          <p><strong>Performance:</strong></p>
          <ul>
            {Object.entries(model.performance).map(([key, value], index) => (
              <li key={index}><strong>{key}:</strong> {value}</li>
            ))}
          </ul>
          <p><strong>Performance Graph:</strong></p>
          {model.performance_graph && (
            <img src={`data:image/png;base64, ${model.performance_graph}`} alt="Performance Graph" />
          )}
          <p><strong>Cross Validation Results:</strong></p>
          <ul>
            {Object.entries(model.cv_results_dict).map(([key, value], index) => (
              
              <li key={index}><strong>{key}:</strong> {value.join(", ")}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ModelBox;
