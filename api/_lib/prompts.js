/**
 * Prompt templates
 * ----------------
 * One function per AI feature. Each builds the exact instructions sent to
 * Gemini. Keeping them here (and on the server) means users can't see or
 * edit the prompts, and every endpoint stays short.
 */

const DIAGNOSIS_DISCLAIMER =
  '"This is not a medical diagnosis. Please consult a qualified healthcare professional for proper medical advice."';

const MEDICINE_DISCLAIMER =
  "\"This is not medical advice. Always follow your doctor's or pharmacist's instructions before taking any medicine.\"";

// Feature: Symptom Analyzer
export function symptomsPrompt({ symptoms, age, gender, duration }) {
  return `
You are a helpful medical AI assistant. A patient has provided the following details:

Symptoms: ${symptoms}
Age: ${age || "Not provided"}
Gender: ${gender || "Not provided"}
Duration: ${duration || "Not provided"}

Please provide:
1. Possible conditions based on the symptoms
2. Severity level (Mild / Moderate / Severe / Emergency)
3. Recommended type of doctor to consult
4. Basic precautions the patient should take
5. Warning signs that need emergency attention

Important: End your response with this disclaimer:
${DIAGNOSIS_DISCLAIMER}
`;
}

// Feature: Lab Report Explainer
export function labReportPrompt(reportText) {
  return `
You are a medical AI assistant helping patients understand their lab reports.

Here is the lab report:
${reportText}

Please explain:
1. What each test measures
2. Whether each value is normal, borderline, or abnormal
3. What abnormal values might indicate
4. What the patient should do next

Use simple, easy-to-understand language.

Important: End your response with this disclaimer:
${DIAGNOSIS_DISCLAIMER}
`;
}

// Feature: Medicine Search
export function medicinePrompt(medicineName) {
  return `
You are a medical AI assistant. Provide detailed information about the medicine: "${medicineName}"

Include the following:
1. Generic name and drug class
2. What it is used for
3. How it works
4. Typical dosage (general information only)
5. Common side effects
6. Important warnings and precautions
7. Storage instructions

Important: End your response with this disclaimer:
${MEDICINE_DISCLAIMER}
`;
}

// Feature: Hindi translation
export function translatePrompt(text) {
  return `Translate the following text to Hindi. Only return the translated text, nothing else, no explanations:

${text}`;
}
