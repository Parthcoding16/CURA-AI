/**
 * Tool definitions
 * ----------------
 * The single source of truth for Cura's three tools. The navbar, footer,
 * home page and each tool page all read from here, so renaming a tool or
 * changing its colour happens in one place.
 */
import { Stethoscope, FlaskConical, Pill } from "lucide-react";

export const TOOLS = {
  symptoms: {
    path: "/ai-doctor",
    name: "Symptom Analyzer",
    navLabel: "Symptom Analyzer",
    description: "Describe how you feel and get possible causes, a severity read, and which doctor to see.",
    subtitle: "Describe your symptoms to get possible causes and next steps.",
    cta: "Open analyzer",
    icon: Stethoscope,
    color: "#0E7C7B", // teal
  },
  labReport: {
    path: "/ai-lab-report-explainer",
    name: "Lab Report Explainer",
    navLabel: "Lab Reports",
    description: "Paste your blood-work values or upload a PDF and get each one explained in plain language.",
    subtitle: "Paste or upload your lab report to get a plain-language explanation.",
    cta: "Open explainer",
    icon: FlaskConical,
    color: "#4C5BB3", // indigo
  },
  medicine: {
    path: "/ai-medicine-search",
    name: "Medicine Search",
    navLabel: "Medicines",
    description: "Look up what a medicine does, its dosage, side effects, and precautions.",
    subtitle: "Look up a medicine's uses, dosage, side effects, and precautions.",
    cta: "Open search",
    icon: Pill,
    color: "#B15A2B", // clay
  },
};

// Same tools as an array, for rendering lists in a fixed order.
export const TOOL_LIST = [TOOLS.symptoms, TOOLS.labReport, TOOLS.medicine];
