import { useState } from "react";
import { Stethoscope, Loader2 } from "lucide-react";
import { analyzeSymptoms } from "../lib/gemini.js";
import TranslateButton from "../components/TranslateButton";

function AiDoctor() {
  const [symptoms, setSymptoms] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [duration, setDuration] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!symptoms.trim()) return;

    setLoading(true);
    setError("");
    setResult("");

    try {
      const response = await analyzeSymptoms(symptoms, age, gender, duration);
      setResult(response);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please check your API key and try again.");
    }

    setLoading(false);
  }

  return (
    <main className="pt-24 px-6 pb-16 max-w-6xl mx-auto">
      {/* Page Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2.5 rounded-xl bg-green-400/10">
          <Stethoscope className="h-5 w-5 text-green-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">AI Symptom Analyzer</h1>
          <p className="text-white/40 text-sm">
            Describe your symptoms to get possible conditions and recommendations.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <div className="p-6 rounded-2xl border border-white/10 bg-white/5">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Symptoms */}
            <div>
              <label className="block text-sm text-white/60 mb-2">
                Describe your symptoms *
              </label>
              <textarea
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="e.g. I have a headache, mild fever and sore throat since 2 days..."
                rows={5}
                required
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-green-400/50 resize-none"
              />
            </div>

            {/* Age and Gender */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-white/60 mb-2">Age</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="e.g. 22"
                  min={1}
                  max={120}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-green-400/50"
                />
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-2">Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-green-400/50"
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm text-white/60 mb-2">
                Duration of symptoms
              </label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g. 2 days, 1 week..."
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-green-400/50"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !symptoms.trim()}
              className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 disabled:opacity-50 disabled:cursor-not-allowed text-black font-semibold py-3 rounded-xl text-sm transition"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                "Analyze Symptoms"
              )}
            </button>
          </form>
        </div>

        {/* Result */}
        <div className="p-6 rounded-2xl border border-white/10 bg-white/5 min-h-[300px]">
          {/* Error state */}
          {error && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Loading state */}
          {loading && (
            <div className="flex flex-col items-center justify-center h-full gap-3 py-16">
              <Loader2 className="h-8 w-8 text-green-400 animate-spin" />
              <p className="text-white/40 text-sm">Analyzing your symptoms...</p>
            </div>
          )}

          {/* Empty state */}
          {!loading && !result && !error && (
            <div className="flex flex-col items-center justify-center h-full gap-3 py-16 text-center">
              <Stethoscope className="h-12 w-12 text-white/10" />
              <p className="text-white/30 font-medium">No Symptoms Analyzed Yet</p>
              <p className="text-white/20 text-sm max-w-xs">
                Fill in your symptoms on the left and click Analyze to get started.
              </p>
            </div>
          )}

          {/* Result */}
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

export default AiDoctor;
