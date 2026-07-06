import { Link } from "react-router-dom";
import { Activity } from "lucide-react";

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-black border-b border-white/10">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <Activity className="h-5 w-5 text-green-400" />
        <span className="text-white font-bold text-lg">Cura AI</span>
      </Link>

      {/* Nav Links */}
      <div className="hidden md:flex items-center gap-6">
        <Link
          to="/ai-doctor"
          className="text-sm text-white/60 hover:text-white transition"
        >
          AI Doctor
        </Link>
        <Link
          to="/ai-lab-report-explainer"
          className="text-sm text-white/60 hover:text-white transition"
        >
          Lab Report
        </Link>
        <Link
          to="/ai-medicine-search"
          className="text-sm text-white/60 hover:text-white transition"
        >
          Medicine Search
        </Link>
      </div>

      {/* CTA Button */}
      <Link
        to="/ai-doctor"
        className="px-4 py-2 bg-white text-black text-sm font-semibold rounded-full hover:bg-white/90 transition"
      >
        Talk to AI Doctor
      </Link>
    </nav>
  );
}

export default Navbar;
