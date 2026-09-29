/**
 * Input limits
 * ------------
 * Feature: Input validation.
 *
 * Every size limit the API enforces lives here, so they are easy to find and
 * tune. Rejecting oversized input early stops a single request from running
 * up a large Gemini bill.
 */

export const MAX_SYMPTOMS_LENGTH = 4000; // characters
export const MAX_REPORT_LENGTH = 20000; // characters (pasted or from a PDF)
export const MAX_MEDICINE_NAME_LENGTH = 200; // characters
export const MAX_TRANSLATE_LENGTH = 20000; // characters

// Vercel limits request bodies to about 4.5 MB, and base64 makes a file about
// 33% bigger, so 3 MB is the largest PDF that safely fits.
export const MAX_PDF_BYTES = 3 * 1024 * 1024;
