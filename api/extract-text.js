/**
 * POST /api/extract-text
 * ----------------------
 * Feature: PDF upload for the Lab Report Explainer.
 *
 * Body:     { fileBase64: string }   (the PDF, base64-encoded)
 * Response: { text: string, pages: number, truncated: boolean }
 *
 * Pulls the text layer out of a PDF so it can be sent to /api/explain-report.
 * We use `unpdf` because it is built to run inside serverless functions.
 */
import { extractText, getDocumentProxy } from "unpdf";
import { guard, sendError } from "./_lib/http.js";
import { MAX_PDF_BYTES, MAX_REPORT_LENGTH } from "./_lib/limits.js";

// Every real PDF file begins with these bytes.
const PDF_SIGNATURE = "%PDF-";

export default async function handler(req, res) {
  if (!(await guard(req, res))) return;

  const { fileBase64 } = req.body || {};
  if (typeof fileBase64 !== "string" || !fileBase64) {
    return sendError(res, 400, "A PDF file is required.");
  }

  const pdfBytes = Buffer.from(fileBase64, "base64");

  if (pdfBytes.length > MAX_PDF_BYTES) {
    return sendError(res, 413, "PDF is too large (max 3 MB).");
  }

  // Check the file's actual contents, not just its name or MIME type,
  // so a renamed text file can't get through.
  if (pdfBytes.subarray(0, PDF_SIGNATURE.length).toString("latin1") !== PDF_SIGNATURE) {
    return sendError(res, 415, "That file isn't a valid PDF.");
  }

  try {
    const pdf = await getDocumentProxy(new Uint8Array(pdfBytes));
    const { totalPages, text } = await extractText(pdf, { mergePages: true });

    // Collapse runs of spaces and blank lines left over from PDF layout.
    const cleanText = text
      .replace(/[ \t]+/g, " ")
      .replace(/\n{3,}/g, "\n\n")
      .trim();

    // Scanned reports are just images with no text layer, so nothing comes out.
    if (!cleanText) {
      return sendError(
        res,
        422,
        "No text found in this PDF. It may be a scanned image. Try a digital copy or paste the values instead.",
      );
    }

    // Very long reports are trimmed to what the explainer accepts; the
    // frontend tells the user when this happens.
    const truncated = cleanText.length > MAX_REPORT_LENGTH;

    return res.status(200).json({
      text: truncated ? cleanText.slice(0, MAX_REPORT_LENGTH) : cleanText,
      pages: totalPages,
      truncated,
    });
  } catch (err) {
    // Password-protected or corrupted PDFs end up here.
    console.error("extract-text failed:", err);
    return sendError(res, 422, "Couldn't read this PDF. It may be password-protected or damaged.");
  }
}
