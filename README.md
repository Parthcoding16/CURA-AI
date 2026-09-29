# CURA AI

**Aiding healthcare with AI.**

CURA AI uses Google Gemini to explain everyday health information in plain language: symptoms, lab
reports (pasted or uploaded as a PDF) and medicines. Any answer can be switched to Hindi.

> ⚠️ CURA AI is for informational purposes only. It is **not** a substitute for professional medical
> advice, diagnosis, or treatment.

**Live demo:** https://cura-ai-omega.vercel.app

## Features

| Feature              | What it does                                                             |
| -------------------- | ------------------------------------------------------------------------ |
| Symptom Analyzer     | Possible causes, a severity estimate, which doctor to see, warning signs |
| Lab Report Explainer | Explains each value; accepts pasted text or a PDF                        |
| Medicine Search      | Uses, dosage, side effects, precautions                                  |
| Hindi translation    | One click, with the translation remembered for instant toggling          |
| Server-side AI calls | The Gemini API key never reaches the browser                             |
| Redis caching        | Repeat questions are answered instantly and cost nothing                 |
| Rate limiting        | 15 requests per minute per IP, to protect the paid API                   |
| Input validation     | Size limits and type checks on every endpoint                            |

## Architecture

```
Browser ──▶ /api/<route>
              │
              ├─ guard()        wrong method → 405, over the rate limit → 429
              ├─ validation     bad or oversized input → 400 / 413 / 415
              ├─ Redis cache    hit → return immediately (marked "From cache" in the UI)
              └─ Gemini         miss → call Gemini, save to cache, return
```

PDF uploads go through `/api/extract-text` first, which pulls out the text. That text is then sent to
`/api/explain-report` like pasted text.

## Tech stack

- **Frontend:** Vite, React, React Router, Tailwind CSS (+ typography), lucide-react, react-markdown
- **Backend:** Vercel serverless functions (`/api`)
- **AI:** Google Gemini (`@google/generative-ai`)
- **Caching and rate limiting:** Upstash Redis (`@upstash/redis`, `@upstash/ratelimit`)
- **PDF text extraction:** `unpdf`

## Getting started

```bash
npm install
cp .env.example .env     # then fill in your keys
npm i -g vercel
vercel dev               # runs the frontend AND the /api functions
```

`npm run dev` starts only the frontend, so the `/api` routes won't respond there. Use `vercel dev`.

### Environment variables

| Variable                   | Required | Where to get it                                                |
| -------------------------- | -------- | -------------------------------------------------------------- |
| `GEMINI_API_KEY`           | Yes      | https://aistudio.google.com/apikey                             |
| `UPSTASH_REDIS_REST_URL`   | No       | https://console.upstash.com (your database's REST API section) |
| `UPSTASH_REDIS_REST_TOKEN` | No       | Same place                                                     |

Without the Upstash variables the app still works; it just skips caching and rate limiting. Never prefix
these variables with `VITE_`, or Vite will put them in the public JavaScript bundle.

## Scripts

| Command          | What it does                     |
| ---------------- | -------------------------------- |
| `vercel dev`     | Run the full app locally         |
| `npm run build`  | Production build of the frontend |
| `npm run format` | Format all code with Prettier    |

## Project structure

```
api/                         Serverless functions (run on the server)
  _lib/
    gemini.js                Gemini client. The only place the API key is used
    redis.js                 Shared Upstash Redis connection
    cache.js                 Cache-aside helper with TTLs
    ratelimit.js             Sliding-window rate limiter
    http.js                  guard(), plus shared error responses
    hash.js                  SHA-256 cache keys
    limits.js                All input size limits
    prompts.js               Prompt templates, one per feature
  analyze-symptoms.js        POST: Symptom Analyzer
  explain-report.js          POST: Lab Report Explainer
  search-medicine.js         POST: Medicine Search
  translate.js               POST: Hindi translation
  extract-text.js            POST: PDF to text

src/                         React frontend
  lib/api.js                 The only file that makes network requests
  lib/tools.js               Name, path, icon and colour of each tool
  hooks/useAiRequest.js      Result, loading and error state for a request
  components/                Navbar, Footer, PageHeader, ResultPanel, Field,
                             ToolIcon, MarkdownView, TranslateButton,
                             CachedBadge, Disclaimer
  pages/                     Home, AiDoctor, AiLabReportExplainer, AiMedicineSearch
```

## Deploying

Import the repo into Vercel, then add the three environment variables under **Settings → Environment
Variables** and redeploy. `vercel.json` sends every non-API path to `index.html`, so deep links and page
refreshes work.

## Known limitations

- Scanned PDFs (images with no text layer) can't be read yet. Adding OCR would fix this.
- Rate limits are per IP address, so users behind a shared network share one limit.
- There are no automated tests yet.
