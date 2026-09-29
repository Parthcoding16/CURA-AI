/**
 * Home page  (route: /)
 * ---------------------
 * Landing page: a hero with a sample result preview, cards for the three
 * tools, and a short "how it works" walkthrough.
 */
import { Link } from "react-router-dom";
import { Sparkles, Stethoscope } from "lucide-react";
import { TOOL_LIST, TOOLS } from "../lib/tools.js";
import ToolIcon from "../components/ToolIcon.jsx";

// The three steps a visitor goes through. These really are a sequence,
// which is why they're numbered.
const STEPS = [
  { title: "Describe", text: "Tell Cura your symptoms, paste or upload a lab report, or search a medicine." },
  {
    title: "Analyze",
    text: "Cura asks Gemini and caches the answer, so repeat questions come back instantly.",
  },
  { title: "Understand", text: "Read a plain-language explanation and, if you prefer, switch it to Hindi." },
];

export default function Home() {
  return (
    <div>
      {/* ---- Hero ---------------------------------------------------------- */}
      <section className="mx-auto max-w-6xl px-6 pb-8 pt-16 lg:pt-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1 text-xs text-muted">
              <Sparkles className="h-3.5 w-3.5 text-brand" />
              Powered by Google Gemini
            </span>

            <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-5xl">
              Understand your health, one clear answer at a time.
            </h1>

            <p className="mt-5 max-w-md text-lg leading-7 text-muted">
              Cura AI makes sense of your symptoms, lab reports, and medicines in language you can actually
              use — and take to a real doctor.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link to={TOOLS.symptoms.path} className="btn-primary px-6">
                Check my symptoms
              </Link>
              <a
                href="#tools"
                className="rounded-xl border border-line bg-surface px-6 py-3 text-sm font-medium text-ink transition hover:border-brand/40"
              >
                Explore the tools
              </a>
            </div>

            <p className="mt-5 text-xs text-muted">
              Informational only. Not a diagnosis — always consult a professional.
            </p>
          </div>

          {/* Sample result card, so visitors can see what they'll get */}
          <div className="card p-5 lg:p-6" aria-label="Example symptom analysis">
            <div className="flex items-center gap-2 border-b border-line pb-3">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-soft text-brand">
                <Stethoscope className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-medium text-ink">Symptom analysis</p>
                <p className="text-xs text-muted">Headache, mild fever, 2 days</p>
              </div>
            </div>

            <div className="space-y-3 pt-4 text-sm">
              <div>
                <p className="font-medium text-ink">Possible causes</p>
                <p className="text-muted">Common cold, viral fever, or tension headache.</p>
              </div>
              <div>
                <p className="font-medium text-ink">Severity</p>
                <span className="mt-1 inline-block rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-800">
                  Mild — monitor at home
                </span>
              </div>
              <div>
                <p className="font-medium text-ink">See a doctor if</p>
                <p className="text-muted">Fever rises above 103°F or lasts more than 3 days.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Tools --------------------------------------------------------- */}
      <section id="tools" className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="font-display text-2xl font-semibold text-ink">Three ways Cura can help</h2>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {TOOL_LIST.map((tool) => (
            <Link
              key={tool.path}
              to={tool.path}
              className="card flex flex-col p-6 transition hover:-translate-y-0.5 hover:border-brand/30"
            >
              <ToolIcon tool={tool} />
              <h3 className="mt-4 font-medium text-ink">{tool.name}</h3>
              <p className="mt-2 flex-1 text-sm leading-6 text-muted">{tool.description}</p>
              <span className="mt-4 text-sm font-medium text-brand">{tool.cta}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ---- How it works -------------------------------------------------- */}
      <section className="border-t border-line bg-surface/60">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="font-display text-2xl font-semibold text-ink">How it works</h2>

          <ol className="mt-8 grid gap-8 sm:grid-cols-3">
            {STEPS.map((step, index) => (
              <li key={step.title}>
                <span className="grid h-9 w-9 place-items-center rounded-full border border-brand/30 font-display text-sm font-semibold text-brand">
                  {index + 1}
                </span>
                <h3 className="mt-4 font-medium text-ink">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}
