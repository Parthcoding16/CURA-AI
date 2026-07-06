import { Link } from "react-router-dom";
import { Stethoscope, FlaskConical, Pill, ArrowRight } from "lucide-react";

function Home() {
  return (
    <main className="pt-24 px-6 pb-16">
      {/* Hero Section */}
      <section className="max-w-3xl mx-auto text-center py-20">
        <p className="text-green-400 text-sm font-medium mb-4">
          AI-Powered Healthcare Platform
        </p>

        <h1 className="text-5xl font-bold text-white leading-tight mb-6">
          Your personal{" "}
          <span className="text-green-400">AI health</span>{" "}
          assistant
        </h1>

        <p className="text-white/50 text-lg mb-10 max-w-xl mx-auto">
          Analyze symptoms, understand lab reports, and search medicine
          information — all powered by Google Gemini AI.
        </p>

        <Link
          to="/ai-doctor"
          className="inline-flex items-center gap-2 bg-white text-black font-semibold px-6 py-3 rounded-full hover:bg-white/90 transition"
        >
          Get Started
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      {/* Feature Cards */}
      <section className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        {/* AI Doctor Card */}
        <Link
          to="/ai-doctor"
          className="group p-6 rounded-2xl border border-white/10 bg-white/5 hover:border-green-400/40 hover:bg-white/10 transition"
        >
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs text-green-400 font-mono">DX-01</span>
            <Stethoscope className="h-5 w-5 text-green-400/60" />
          </div>
          <h3 className="text-white font-semibold mb-2">AI Doctor</h3>
          <p className="text-white/40 text-sm">
            Describe your symptoms and get a preliminary analysis with
            recommended next steps.
          </p>
          <div className="mt-4 flex items-center gap-1 text-green-400 text-sm opacity-0 group-hover:opacity-100 transition">
            Try it <ArrowRight className="h-3.5 w-3.5" />
          </div>
        </Link>

        {/* Lab Report Card */}
        <Link
          to="/ai-lab-report-explainer"
          className="group p-6 rounded-2xl border border-white/10 bg-white/5 hover:border-purple-400/40 hover:bg-white/10 transition"
        >
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs text-purple-400 font-mono">LAB-02</span>
            <FlaskConical className="h-5 w-5 text-purple-400/60" />
          </div>
          <h3 className="text-white font-semibold mb-2">Lab Report Explainer</h3>
          <p className="text-white/40 text-sm">
            Paste your lab report values and get a clear, plain-language
            explanation of your results.
          </p>
          <div className="mt-4 flex items-center gap-1 text-purple-400 text-sm opacity-0 group-hover:opacity-100 transition">
            Try it <ArrowRight className="h-3.5 w-3.5" />
          </div>
        </Link>

        {/* Medicine Search Card */}
        <Link
          to="/ai-medicine-search"
          className="group p-6 rounded-2xl border border-white/10 bg-white/5 hover:border-blue-400/40 hover:bg-white/10 transition"
        >
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs text-blue-400 font-mono">RX-03</span>
            <Pill className="h-5 w-5 text-blue-400/60" />
          </div>
          <h3 className="text-white font-semibold mb-2">Medicine Search</h3>
          <p className="text-white/40 text-sm">
            Search any medicine to get details about uses, dosage, side
            effects, and precautions.
          </p>
          <div className="mt-4 flex items-center gap-1 text-blue-400 text-sm opacity-0 group-hover:opacity-100 transition">
            Try it <ArrowRight className="h-3.5 w-3.5" />
          </div>
        </Link>
      </section>

      {/* Disclaimer */}
      <p className="text-center text-white/20 text-xs mt-16">
        Cura AI is for informational purposes only. Always consult a
        qualified healthcare professional.
      </p>
    </main>
  );
}

export default Home;
