# StreamRadar 📡
**Find what channel or streaming service any game or show is on tonight.**

---

## 🔑 Step 1 — Get 3 New Free API Keys

Your old keys were exposed and will be revoked. Get fresh ones here:

| Provider | URL | Free Limit |
|---|---|---|
| **Gemini** | aistudio.google.com → Get API Key | 1,500/day |
| **OpenRouter** | openrouter.ai → Keys → Create Key | Unlimited (free models) |
| **Groq** | console.groq.com → API Keys → Create | 14,400/day |

---

## 🔒 Step 2 — Add Keys to Vercel (NOT to any file)

Keys now live **only** in Vercel's environment variables — they never appear in your code.

1. Go to **vercel.com** → your StreamRadar project
2. **Settings → Environment Variables**
3. Add these three:

| Name | Value |
|---|---|
| `GEMINI_API_KEY` | your new Gemini key |
| `OPENROUTER_API_KEY` | your new OpenRouter key |
| `GROQ_API_KEY` | your new Groq key |

4. Click **Save** → then **Redeploy** (Deployments tab → the three dots → Redeploy)

Done. Keys are safe. GitHub will never flag them again.

---

## 🚀 Deploy / Redeploy

### First time:
1. Push this folder to a GitHub repo
2. Vercel → Add New Project → Import from GitHub → Deploy
3. Add env vars as above → Redeploy

### After any file update:
```bash
git add . && git commit -m "update" && git push
```
Vercel auto-redeploys in ~20 seconds.

---

## 📁 File Structure

```
streamradar/
├── index.html       ← Entire site — HTML, CSS, all JS logic
├── api/
│   └── search.js    ← Serverless function — holds AI keys securely
├── data.json        ← Curated events (optional, update weekly)
├── vercel.json      ← Routing + function config
├── package.json     ← ESM declaration
└── README.md        ← This file
```

---

## 🔄 How Search Works Now

```
User types query
      ↓
Browser fetches 3 free public APIs in parallel:
  • ESPN   → real sports schedules + broadcast info (no key needed)
  • TheSportsDB → future event search (no key needed)
  • TVMaze → TV show network + episode schedule (no key needed)
      ↓
Real data sent to /api/search (your Vercel function)
      ↓
Vercel function uses env var keys to call Gemini → OpenRouter → Groq
(first one that works wins, auto-fallback)
      ↓
Formatted result returned to browser
```

Public API calls (ESPN, TVMaze, TheSportsDB) happen in the browser — no keys needed.
AI calls happen server-side — keys never exposed.

---

## 📅 Update Hot Tonight Events (weekly)

Open `data.json`, edit the events array, push to GitHub. Takes 2 minutes.

## 💰 Update Affiliate Links

Open `index.html`, find the `AFFS` array, replace each `href` with your affiliate URL.

## 📢 Add Google AdSense

Find `<div class="adslot ad728">` (3 of them) and replace with your `<ins>` AdSense tags.

## 📊 Enable Analytics

In `index.html` find `G-XXXXXXXXXX` (twice) and replace with your real GA Measurement ID.

## 🔍 Enable Google Search Console

In `index.html` find `YOUR_GSC_CODE_HERE` and replace with your verification code.

---

## 🛠 Local Testing

```bash
npm i -g vercel
vercel dev
```

Then add a `.env.local` file (never commit this):
```
GEMINI_API_KEY=AIza...
OPENROUTER_API_KEY=sk-or-v1-...
GROQ_API_KEY=gsk_...
```
