import { useState } from "react";
import { Pill, Loader2, Search } from "lucide-react";
import { searchMedicine } from "../lib/gemini.js";
import TranslateButton from "../components/TranslateButton";
function AiMedicineSearch() {
  const [medicineName, setMedicineName] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSearch(e) {
    e.preventDefault();

    if (!medicineName.trim()) return;

    setLoading(true);
    setError("");
    setResult("");

    try {
      const response = await searchMedicine(medicineName);
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
        <div className="p-2.5 rounded-xl bg-blue-400/10">
          <Pill className="h-5 w-5 text-blue-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">AI Medicine Search</h1>
          <p className="text-white/40 text-sm">
            Search any medicine to get detailed information about its uses and effects.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Search Form */}
        <div className="p-6 rounded-2xl border border-white/10 bg-white/5">
          <form onSubmit={handleSearch} className="space-y-5">
            <div>
              <label className="block text-sm text-white/60 mb-2">
                Medicine Name *
              </label>
              <input
                type="text"
                value={medicineName}
                onChange={(e) => setMedicineName(e.target.value)}
                placeholder="e.g. Paracetamol, Aspirin, Metformin..."
                required
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-400/50"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !medicineName.trim()}
              className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl text-sm transition"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4" />
                  Search Medicine
                </>
              )}
            </button>
          </form>
        </div>

        {/* Result */}
        <div className="p-6 rounded-2xl border border-white/10 bg-white/5 min-h-[250px]">
          {error && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          {loading && (
            <div className="flex flex-col items-center justify-center h-full gap-3 py-16">
              <Loader2 className="h-8 w-8 text-blue-400 animate-spin" />
              <p className="text-white/40 text-sm">Fetching medicine information...</p>
            </div>
          )}

          {!loading && !result && !error && (
            <div className="flex flex-col items-center justify-center h-full gap-3 py-16 text-center">
              <Pill className="h-12 w-12 text-white/10" />
              <p className="text-white/30 font-medium">No Medicine Searched Yet</p>
              <p className="text-white/20 text-sm">
                Enter a medicine name and click Search.
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

export default AiMedicineSearch;
