/**
 * Medicine Search page  (route: /ai-medicine-search)
 * --------------------------------------------------
 * Feature: Medicine Search.
 *
 * The user types a medicine name. We send it to /api/search-medicine and
 * show uses, dosage, side effects and precautions in ResultPanel.
 */
import { useState } from "react";
import { Loader2, Search } from "lucide-react";
import { searchMedicine } from "../lib/api.js";
import { TOOLS } from "../lib/tools.js";
import { useAiRequest } from "../hooks/useAiRequest.js";
import PageHeader from "../components/PageHeader.jsx";
import ResultPanel from "../components/ResultPanel.jsx";
import Field from "../components/Field.jsx";

const tool = TOOLS.medicine;

export default function AiMedicineSearch() {
  const [medicineName, setMedicineName] = useState("");
  const request = useAiRequest();

  function handleSubmit(event) {
    event.preventDefault();
    if (!medicineName.trim()) return;
    request.run(() => searchMedicine(medicineName));
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <PageHeader tool={tool} />

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left: search form */}
        <section className="card p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <Field id="medicine" label="Medicine name *">
              <input
                id="medicine"
                type="text"
                value={medicineName}
                onChange={(e) => setMedicineName(e.target.value)}
                placeholder="e.g. Paracetamol, Aspirin, Metformin…"
                required
                className="field"
              />
            </Field>

            <button
              type="submit"
              disabled={request.loading || !medicineName.trim()}
              className="btn-primary w-full"
            >
              {request.loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Search className="h-4 w-4" />
              )}
              {request.loading ? "Searching…" : "Search medicine"}
            </button>
          </form>
        </section>

        {/* Right: result */}
        <ResultPanel
          tool={tool}
          request={request}
          loadingText="Fetching medicine information…"
          emptyTitle="No medicine searched yet"
          emptyText="Enter a medicine name and select search."
        />
      </div>
    </div>
  );
}
