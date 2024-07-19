import React, { createContext, useState } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [analyseData, setAnalyseData] = useState(null);
  const [preprocessedData, setPreprocessedData] = useState(null);
  const [modelData, setModelData] = useState(null);

  return (
    <DataContext.Provider
      value={{
        analyseData,
        setAnalyseData,
        preprocessedData,
        setPreprocessedData,
        modelData,
        setModelData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
