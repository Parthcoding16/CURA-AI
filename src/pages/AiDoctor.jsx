/**
 * Symptom Analyzer page  (route: /ai-doctor)
 * ------------------------------------------
 * Feature: Symptom Analyzer.
 *
 * The user describes their symptoms (plus optional age, gender and duration).
 * We send them to /api/analyze-symptoms and show the answer in ResultPanel.
 */
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { analyzeSymptoms } from "../lib/api.js";
import { TOOLS } from "../lib/tools.js";
import { useAiRequest } from "../hooks/useAiRequest.js";
import PageHeader from "../components/PageHeader.jsx";
import ResultPanel from "../components/ResultPanel.jsx";
import Field from "../components/Field.jsx";

const tool = TOOLS.symptoms;

export default function AiDoctor() {
  // Form fields
  const [symptoms, setSymptoms] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [duration, setDuration] = useState("");

  // Result, loading and error state
  const request = useAiRequest();

  function handleSubmit(event) {
    event.preventDefault();
    if (!symptoms.trim()) return;
    request.run(() => analyzeSymptoms(symptoms, age, gender, duration));
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <PageHeader tool={tool} />

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left: input form */}
        <section className="card p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <Field id="symptoms" label="Describe your symptoms *">
              <textarea
                id="symptoms"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="e.g. Headache, mild fever and a sore throat for the last 2 days..."
                rows={5}
                required
                className="field resize-none"
              />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field id="age" label="Age">
                <input
                  id="age"
                  type="number"
                  min={1}
                  max={120}
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="e.g. 22"
                  className="field"
                />
              </Field>

              <Field id="gender" label="Gender">
                <select
                  id="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="field"
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </Field>
            </div>

            <Field id="duration" label="Duration of symptoms">
              <input
                id="duration"
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g. 2 days, 1 week..."
                className="field"
              />
            </Field>

            <button
              type="submit"
              disabled={request.loading || !symptoms.trim()}
              className="btn-primary w-full"
            >
              {request.loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {request.loading ? "Analyzing…" : "Analyze symptoms"}
            </button>
          </form>
        </section>

        {/* Right: result */}
        <ResultPanel
          tool={tool}
          request={request}
          loadingText="Analyzing your symptoms…"
          emptyTitle="No analysis yet"
          emptyText="Fill in your symptoms and select analyze to get started."
        />
      </div>
    </div>
  );
}
