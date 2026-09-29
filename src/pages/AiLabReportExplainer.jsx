/**
 * Lab Report Explainer page  (route: /ai-lab-report-explainer)
 * ------------------------------------------------------------
 * Features: Lab Report Explainer, PDF upload.
 *
 * Two ways to provide a report:
 *   • Paste text  → sent straight to /api/explain-report
 *   • Upload PDF  → /api/extract-text pulls out the text first, then that
 *                   text goes to /api/explain-report
 */
import { useRef, useState } from "react";
import { FileText, Loader2, Upload } from "lucide-react";
import { explainLabReport, extractPdfText } from "../lib/api.js";
import { TOOLS } from "../lib/tools.js";
import { useAiRequest } from "../hooks/useAiRequest.js";
import PageHeader from "../components/PageHeader.jsx";
import ResultPanel from "../components/ResultPanel.jsx";
import Field from "../components/Field.jsx";

const tool = TOOLS.labReport;

// Must match MAX_PDF_BYTES in api/_lib/limits.js. Checked here too so users
// get instant feedback instead of waiting for an upload to be rejected.
const MAX_PDF_BYTES = 3 * 1024 * 1024;

const TABS = [
  { id: "paste", label: "Paste text" },
  { id: "upload", label: "Upload PDF" },
];

export default function AiLabReportExplainer() {
  const [activeTab, setActiveTab] = useState("paste");
  const [reportText, setReportText] = useState("");
  const [pdfFile, setPdfFile] = useState(null);

  // Which step the upload is on: "reading" (extracting the PDF) or "analyzing"
  const [stage, setStage] = useState("");

  // Shown above the result when a long PDF had to be trimmed
  const [notice, setNotice] = useState("");

  const fileInputRef = useRef(null);
  const request = useAiRequest();

  // ---- PDF selection ------------------------------------------------------

  // Checks a chosen file before accepting it. The server checks again.
  function selectFile(file) {
    if (!file) return;

    const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
    if (!isPdf) {
      request.setError("Only PDF files are supported. To use another format, paste the text instead.");
      return;
    }
    if (file.size > MAX_PDF_BYTES) {
      request.setError("PDF is too large (max 3 MB).");
      return;
    }

    request.setError("");
    setPdfFile(file);
  }

  function handleDrop(event) {
    event.preventDefault();
    selectFile(event.dataTransfer.files[0]);
  }

  // ---- Submit -------------------------------------------------------------

  async function handleSubmit(event) {
    event.preventDefault();
    setNotice("");

    await request.run(async () => {
      if (activeTab === "paste") {
        setStage("analyzing");
        return explainLabReport(reportText);
      }

      // Upload: extract the PDF's text first, then explain it.
      setStage("reading");
      const pdf = await extractPdfText(pdfFile);
      if (pdf.truncated) {
        setNotice("This report is long, so only the first part was analyzed.");
      }

      setStage("analyzing");
      return explainLabReport(pdf.text);
    });

    setStage("");
  }

  const hasInput = activeTab === "paste" ? reportText.trim() : pdfFile;
  const busyLabel = stage === "reading" ? "Reading PDF…" : "Analyzing…";

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <PageHeader tool={tool} />

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left: input */}
        <section className="card p-6">
          {/* Paste / Upload tabs */}
          <div className="mb-5 flex gap-1 rounded-xl bg-canvas p-1" role="tablist">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 rounded-lg py-2 text-sm font-medium transition ${
                  activeTab === tab.id ? "bg-brand text-white" : "text-muted hover:text-ink"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Paste text */}
            {activeTab === "paste" && (
              <Field id="report" label="Paste your lab report">
                <textarea
                  id="report"
                  value={reportText}
                  onChange={(e) => setReportText(e.target.value)}
                  placeholder={
                    "e.g.\nHemoglobin: 11.2 g/dL\nWBC: 9800 /µL\nBlood Glucose (Fasting): 118 mg/dL\n..."
                  }
                  rows={8}
                  className="field resize-none font-mono"
                />
              </Field>
            )}

            {/* Upload PDF — a real <button>, so it works with the keyboard */}
            {activeTab === "upload" && (
              <div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  className="flex w-full flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-line p-10 text-center transition hover:border-brand/40 focus:border-brand focus:outline-none"
                >
                  <Upload className="h-8 w-8 text-muted/50" />
                  <div>
                    <p className="text-sm text-ink">Click to upload or drag and drop</p>
                    <p className="mt-1 text-xs text-muted">PDF files only, up to 3 MB</p>
                  </div>
                  {pdfFile && (
                    <span className="flex items-center gap-2 text-sm font-medium text-brand">
                      <FileText className="h-4 w-4" />
                      {pdfFile.name}
                    </span>
                  )}
                </button>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,application/pdf"
                  onChange={(e) => selectFile(e.target.files[0])}
                  className="hidden"
                />
              </div>
            )}

            <button type="submit" disabled={request.loading || !hasInput} className="btn-primary w-full">
              {request.loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {request.loading ? busyLabel : "Explain report"}
            </button>
          </form>
        </section>

        {/* Right: result */}
        <ResultPanel
          tool={tool}
          request={request}
          notice={notice}
          loadingText={stage === "reading" ? "Reading your PDF…" : "Analyzing your report…"}
          emptyTitle="No report analyzed yet"
          emptyText="Paste your lab values or upload a PDF to get an explanation."
        />
      </div>
    </div>
  );
}
