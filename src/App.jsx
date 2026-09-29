/**
 * App
 * ---
 * The page layout (navbar, current page, footer) and the route table.
 * Page paths come from lib/tools.js so links and routes can't drift apart.
 */
import { Route, Routes } from "react-router-dom";
import { TOOLS } from "./lib/tools.js";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import AiDoctor from "./pages/AiDoctor.jsx";
import AiLabReportExplainer from "./pages/AiLabReportExplainer.jsx";
import AiMedicineSearch from "./pages/AiMedicineSearch.jsx";

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-canvas text-ink">
      <Navbar />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path={TOOLS.symptoms.path} element={<AiDoctor />} />
          <Route path={TOOLS.labReport.path} element={<AiLabReportExplainer />} />
          <Route path={TOOLS.medicine.path} element={<AiMedicineSearch />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
