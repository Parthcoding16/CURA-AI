import { useState, useRef } from "react";
import { FlaskConical, Loader2, Upload, FileText } from "lucide-react";
import { explainLabReport } from "../lib/gemini.js";
import TranslateButton from "../components/TranslateButton";

function AiLabReportExplainer() {
  const [activeTab, setActiveTab] = useState("paste"); // "paste" or "upload"
  const [reportText, setReportText] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fileInputRef = useRef(null);

  // Read the uploaded file as text
  function readFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsText(file);
    });
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
    }
  }

  function handleDrop(e) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setUploadedFile(file);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setError("");
    setResult("");

    try {
      let textToAnalyze = "";

      if (activeTab === "paste") {
        if (!reportText.trim()) {
          setError("Please paste your lab report text.");
          setLoading(false);
          return;
        }
        textToAnalyze = reportText;
      } else {
        if (!uploadedFile) {
          setError("Please upload a file.");
          setLoading(false);
          return;
        }
        textToAnalyze = await readFile(uploadedFile);
      }

      const response = await explainLabReport(textToAnalyze);
      setResult(response);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again or use the Paste Text option.");
    }

    setLoading(false);
  }

  return (
    <main className="pt-24 px-6 pb-16 max-w-6xl mx-auto">
      {/* Page Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2.5 rounded-xl bg-purple-400/10">
          <FlaskConical className="h-5 w-5 text-purple-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">AI Lab Report Explainer</h1>
          <p className="text-white/40 text-sm">
            Upload or paste your lab report to get a detailed explanation.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="p-6 rounded-2xl border border-white/10 bg-white/5">
          {/* Tabs */}
          <div className="flex gap-1 bg-white/5 p-1 rounded-xl mb-5">
            <button
              type="button"
              onClick={() => setActiveTab("paste")}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition ${
                activeTab === "paste"
                  ? "bg-white text-black"
                  : "text-white/50 hover:text-white"
              }`}
            >
              Paste Text
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("upload")}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition ${
                activeTab === "upload"
                  ? "bg-white text-black"
                  : "text-white/50 hover:text-white"
              }`}
            >
              Upload File
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Paste Text Tab */}
            {activeTab === "paste" && (
              <div>
                <label className="block text-sm text-white/60 mb-2">
                  Paste your lab report
                </label>
                <textarea
                  value={reportText}
                  onChange={(e) => setReportText(e.target.value)}
                  placeholder={
                    "e.g.\nHemoglobin: 11.2 g/dL\nWBC: 9800 /µL\nBlood Glucose (Fasting): 118 mg/dL\n..."
                  }
                  rows={8}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 font-mono focus:outline-none focus:border-purple-400/50 resize-none"
                />
              </div>
            )}

            {/* Upload File Tab */}
            {activeTab === "upload" && (
              <div>
                <div
                  onClick={() => fileInputRef.current.click()}
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  className="flex flex-col items-center justify-center gap-3 p-10 border-2 border-dashed border-white/10 rounded-xl cursor-pointer hover:border-purple-400/30 transition text-center"
                >
                  <Upload className="h-8 w-8 text-white/20" />
                  <div>
                    <p className="text-sm text-white/40">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-white/20 mt-1">
                      TXT, PDF, DOC files supported
                    </p>
                  </div>
                  {uploadedFile && (
                    <div className="flex items-center gap-2 text-purple-400 text-sm">
                      <FileText className="h-4 w-4" />
                      {uploadedFile.name}
                    </div>
                  )}
                </div>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".txt,.pdf,.doc,.docx"
                  className="hidden"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={
                loading ||
                (activeTab === "paste" ? !reportText.trim() : !uploadedFile)
              }
              className="w-full flex items-center justify-center gap-2 bg-purple-500 hover:bg-purple-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl text-sm transition"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                "Explain Report"
              )}
            </button>
          </form>
        </div>

        {/* Result Section */}
        <div className="p-6 rounded-2xl border border-white/10 bg-white/5 min-h-[350px]">
          {error && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          {loading && (
            <div className="flex flex-col items-center justify-center h-full gap-3 py-16">
              <Loader2 className="h-8 w-8 text-purple-400 animate-spin" />
              <p className="text-white/40 text-sm">Analyzing your report...</p>
            </div>
          )}

          {!loading && !result && !error && (
            <div className="flex flex-col items-center justify-center h-full gap-3 py-16 text-center">
              <FlaskConical className="h-12 w-12 text-white/10" />
              <p className="text-white/30 font-medium">No Report Analyzed Yet</p>
              <p className="text-white/20 text-sm max-w-xs">
                Paste your lab values or upload a file to get an explanation.
              </p>
            </div>
          )}

          {!loading && result && (
  <div>
    <div className="flex justify-end mb-3">
      <TranslateButton text={result} onTranslated={setResult} />
    </div>
    <div className="text-sm text-white/80 leading-7 whitespace-pre-wrap">
      {result}
    </div>
  </div>
)}
        </div>
      </div>
    </main>
  );
}

export default AiLabReportExplainer;
