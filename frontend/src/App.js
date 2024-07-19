import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeroPage from "./components/HeroPage"; // Import your HeroPage component
import UploadPage from "./components/UploadPage"; // Import your UploadPage component
import Visualize from "./components/Visualize";
import Preprocess from "./components/Preprocess";
import ModelRecommand from "./components/ModelRecommand";
import { useLocation } from "react-router-dom";
import { DataProvider } from './components/DataContext';
import NavBar from "./components/NavBar";



const App = () => {
  return (
    <DataProvider>
    <Router>
      <Routes>
        <Route path="/" element={<HeroPage />} /> {/* Route for HeroPage */}
        <Route path="/UploadPage" element={<UploadPage />} /> {/* Route for UploadPage */}
        <Route path="/Visualize" element={<Visualize />} />

        <Route path="/Preprocess" element={<Preprocess />} />
        <Route path="/ModelRecommand" element={<ModelRecommand />} />
      </Routes>
    </Router>
    </DataProvider>
  );
};

export default App;
