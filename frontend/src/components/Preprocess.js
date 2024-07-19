import React, { useRef, useState, useContext, useEffect } from "react";
import { Tabs } from "antd";
import "../styles/hero.css";
import NavBar from "./NavBar";
import { DataContext } from "./DataContext";
const { TabPane } = Tabs;

const Preprocess = () => {
  const [csvContent, setCsvContent] = useState(null);
  const iframeRef = useRef(null);
  const { preprocessedData } = useContext(DataContext);

  const handleTabChange = (key) => {
    console.log("Selected tab key:", key);
    if (key === "2") {
      generateCSVContent();
    }
  };

  const generateCSVContent = () => {
    if (Array.isArray(preprocessedData) && preprocessedData.length > 0) {
      const csvContent = convertArrayToCSV(preprocessedData);
      setCsvContent(csvContent);
    } else {
      setCsvContent(null);
    }
  };

  const convertArrayToCSV = (data) => {
    const csvRows = data.map((row) => row.join(",")).join("\n");
    return csvRows;
  };

  const handleDownloadCSV = async () => {
    generateCSVContent();
    if (csvContent) {
      downloadCSV(csvContent);
    }
  };

  const downloadCSV = (csvContent) => {
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "preprocessed_data.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <NavBar />
      <div className="main" style={{ margin: "4rem", color: "white" }}>
        <Tabs defaultActiveKey="1" onChange={handleTabChange} className="custom-tabs">
          <TabPane tab="Feature Engineering" key="1">
            <div style={{ marginTop: "1rem", color: "white" }}>
              <h4>Data Preprocessing</h4>
              <div className="small-text">
                <p>
                  Large Language Models (LLMs) are employed to extract
                  contextual insights from your dataset, facilitating a
                  comprehensive understanding of its nuances. Enhance the
                  predictive capability of your dataset through automated
                  feature engineering techniques.
                </p>
              </div>
              <div className="download-buttons-container">
                <button className="download" onClick={handleDownloadCSV}>
                  Download CSV
                </button>
              </div>
            </div>
          </TabPane>
          <TabPane tab="Preprocessed data in csv" key="2">
            <div style={{ display: "inline", color: "white" }}>
              <h4 style={{ marginLeft: "3rem", color: "white" }}>
                Preprocessed Data CSV
              </h4>
              <div className="download-buttons-container">
                <button className="download" onClick={handleDownloadCSV}>
                  Download CSV
                </button>
              </div>
              {csvContent && (
                <iframe
                  width="100%"
                  height="600px"
                  style={{
                    border: "1px solid grey",
                    marginLeft: "2rem",
                    width: "90%",
                    alignItems: "center",
                  }}
                  title="Preprocessed Data CSV"
                  ref={iframeRef}
                  srcDoc={`<!DOCTYPE html>
                          <html lang="en">
                            <head>
                              <meta charset="UTF-8" />
                              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                              <title>Preprocessed Data CSV</title>
                              <style>
                                table {
                                  border-collapse: collapse;
                                  width: 100%;
                                  color: white;
                                }
                                th, td {
                                  border: 1px solid #dddddd;
                                  text-align: left;
                                  padding: 8px;
                                  color: white;
                                }
                                th {
                                  background-color: white;
                                }
                              </style>
                            </head>
                            <body>
                              <table>
                                ${csvContent
                                  .split("\n")
                                  .map(
                                    (row) =>
                                      `<tr>${row
                                        .split(",")
                                        .map(
                                          (cell) => `<td>${cell}</td>`
                                        )
                                        .join("")}</tr>`
                                  )
                                  .join("")}
                              </table>
                            </body>
                          </html>`}
                ></iframe>
              )}
            </div>
          </TabPane>
        </Tabs>
      </div>
    </>
  );
};

export default Preprocess;
