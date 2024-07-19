import React, { useState, useEffect } from "react";
import { UpOutlined, DownOutlined } from "@ant-design/icons"; // Import the icons

const parameterExplanations = {
  max_depth:
    "The maximum depth of the tree. Limits the number of nodes in the tree.",
  n_estimators:
    "The number of trees in the forest. More trees usually result in better performance but require more computation.",
};

const ModelBox = ({ model, onClick }) => {
  const [expanded, setExpanded] = useState(false);

  const handleToggleExpand = (e) => {
    e.stopPropagation();
    setExpanded(!expanded);
  };

  useEffect(() => {
    console.log("ModelBox rendered with model:", model);
  }, [model]);

  return (
    <div className="model-box-container" onClick={onClick}>
      <div className={`model-box ${expanded ? "expanded" : ""}`}>
        <div className="model-box-header">
          <span>{model.model_name}</span>
          {expanded ? (
            <UpOutlined onClick={handleToggleExpand} />
          ) : (
            <DownOutlined onClick={handleToggleExpand} />
          )}
        </div>
        {expanded && (
          <div className="model-info">
            <p>
              <strong>Best Parameters:</strong>
            </p>
            <table>
              <thead>
                <tr>
                  <th>Parameter</th>
                  <th>Value</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(model.best_parameters).map(
                  ([key, value], index) => (
                    <tr key={index}>
                      <td>
                        <strong>{key}</strong>
                      </td>
                      <td>{value}</td>
                      <td>
                        {parameterExplanations[key] ||
                          "No description available."}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>

            <p>
              <strong>Performance:</strong>
            </p>
            <table>
              <thead>
                <tr>
                  <th>Metric</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(model.performance).map(
                  ([key, value], index) => (
                    <tr key={index}>
                      <td>
                        <strong>{key}</strong>
                      </td>
                      <td>{value}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>

            <p>
              <strong>Performance Graph:</strong>
            </p>
            {model.performance_graph && (
              <img
                src={`data:image/png;base64,${model.performance_graph}`}
                alt="Performance Graph"
                style={{ width: "50%", height: "auto" }} 
              />
            )}

            <p>
              <strong>Cross Validation Results:</strong>
            </p>
            <table>
              <thead>
                <tr>
                  <th>Metric</th>
                  <th>Values</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(model.cv_results_dict).map(
                  ([key, value], index) => (
                    <tr key={index}>
                      <td>
                        <strong>{key}</strong>
                      </td>
                      <td>
                        {Array.isArray(value)
                          ? value.map((v, i) => (
                              <div key={i}>
                                {typeof v === "object" ? (
                                  <pre>{JSON.stringify(v, null, 2)}</pre>
                                ) : (
                                  v
                                )}
                              </div>
                            ))
                          : value}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModelBox;
