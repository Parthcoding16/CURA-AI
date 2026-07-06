import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import AiDoctor from "./pages/AiDoctor.jsx";
import AiMedicineSearch from "./pages/AiMedicineSearch.jsx";
import AiLabReportExplainer from "./pages/AiLabReportExplainer.jsx";

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ai-doctor" element={<AiDoctor />} />
        <Route path="/ai-medicine-search" element={<AiMedicineSearch />} />
        <Route path="/ai-lab-report-explainer" element={<AiLabReportExplainer />} />
      </Routes>
    </div>
  );
}

export default App;
