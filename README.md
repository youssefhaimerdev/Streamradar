# StreamRadar 📡
**Find what channel or streaming service any game or show is on tonight.**
Zero backend. Zero cost. Fully standalone HTML.

---

## 🔑 Step 1 — Get Your Free API Keys (10 min total)

You need at least ONE key. Get all three for maximum reliability.
The site automatically tries each one and falls back if rate-limited.

### 1. Google Gemini — PRIMARY (best free option)
- Go to: **https://aistudio.google.com**
- Sign in with Google → click **"Get API Key"** → **"Create API key"**
- Free limits: **1,500 searches/day · 15/minute** — plenty for a new site
- Copy the key (starts with `AIza...`)

### 2. OpenRouter — FALLBACK (free models, no credit card)
- Go to: **https://openrouter.ai**
- Sign up → **Keys** → **Create Key**
- Free limits: Unlimited on free models (llama-3.3-70b is free forever)
- Copy the key (starts with `sk-or-...`)

### 3. Groq — SECOND FALLBACK (blazing fast)
- Go to: **https://console.groq.com**
- Sign up → **API Keys** → **Create API Key**
- Free limits: 14,400 requests/day on free tier
- Copy the key (starts with `gsk_...`)

---

## 🔧 Step 2 — Add Keys to the Site

Open `index.html` and find this block near the bottom (search for `KEYS`):

```javascript
const KEYS = {
  gemini:     'YOUR_GEMINI_KEY_HERE',
  openrouter: 'YOUR_OPENROUTER_KEY_HERE',
  groq:       'YOUR_GROQ_KEY_HERE',
};
```

Replace each placeholder with your real key. Example:
```javascript
const KEYS = {
  gemini:     'AIzaSyAbc123...',
  openrouter: 'sk-or-v1-abc123...',
  groq:       'gsk_abc123...',
};
```

Save the file. Done. The site now works.

---

## 🚀 Step 3 — Deploy to Vercel

### Option A: Drag & Drop (fastest)
1. Go to **vercel.com** → sign up free
2. Click **"Add New Project"** → **"Upload"**
3. Drag the `streamradar` folder onto the page
4. Click **Deploy** — live in ~30 seconds

### Option B: GitHub (recommended for updates)
```bash
cd streamradar
git init && git add . && git commit -m "StreamRadar launch"
gh repo create streamradar --public --push
```
Then: Vercel → **Add New Project** → Import from GitHub → Deploy.
Every future `git push` auto-redeploys the site.

---

## 📅 Weekly Updates (Hot Tonight section)

Open `index.html`, find the `HOT` array (search for `HOT TONIGHT`):

```javascript
const HOT = [
  { name:'NBA Playoffs', sub:'Eastern Conference Finals', svc:'ESPN', time:'8:30 PM ET', color:'#FF4500', emoji:'🏀', badge:'LIVE' },
  ...
];
```

Edit the events to match what's actually on this week. Push to GitHub → auto-deploys.
Takes 2 minutes. Do it every Monday.

---

## 💰 Affiliate Links

Find the `AFFS` array in `index.html`. Replace each `href` with your real affiliate URL:

```javascript
{ name:'ESPN+', href:'https://espnplus.com/?ref=YOUR_ID', ... },
{ name:'Hulu + Live TV', href:'https://hulu.com/?ref=YOUR_ID', ... },
```

Sign up for affiliate programs:
- **ESPN+**: DigiMedia / Impact (search "ESPN+ affiliate program")
- **Hulu**: Commission Junction (CJ.com)
- **YouTube TV**: Google Affiliate Network
- **Peacock**: Impact or FlexOffers
- **Paramount+**: Commission Junction

---

## 📢 Replace Ad Placeholders with Real AdSense

Find elements with class `adslot` in `index.html`:
```html
<div class="adslot ad728">Advertisement · 728×90</div>
```

Replace with your AdSense `<ins>` tag:
```html
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
     data-ad-slot="XXXXXXXXXX"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
```

There are 3 ad slots: below hero, in-feed (after results), bottom of page.

---

## 📊 Enable Google Analytics

In `index.html` find `G-XXXXXXXXXX` (appears twice) and replace with your real Measurement ID.

## 🔍 Enable Google Search Console

Find `YOUR_GSC_CODE_HERE` in the `<head>` and replace with your verification code.

---

## 📁 File Structure (3 files total — that's it)

```
streamradar/
├── index.html     ← Entire site: HTML + CSS + JS + data
├── vercel.json    ← Routing config (set once, never touch)
└── README.md      ← This file
```

**No backend. No Node.js. No build step. No package.json.**
100% static. Works on any host that serves HTML.

---

## 🎯 Update Workflow

| What changed | What to edit | Time |
|---|---|---|
| Hot Tonight events | `HOT` array in index.html | 2 min |
| Streaming prices | `AFFS` array in index.html | 2 min |
| Trending pills | `tpill` buttons in HTML | 1 min |
| Design/copy | CSS/HTML in index.html | varies |
| API prompt tuning | `prompt` variable in `doSearch()` | varies |

Push to GitHub → Vercel redeploys in ~20 seconds.

---

## 🆓 Free Tier Limits (combined)

| Provider | Free Searches/Day | Per Minute |
|---|---|---|
| Gemini (Google) | 1,500 | 15 |
| OpenRouter | Unlimited* | ~20 |
| Groq | 14,400 | 30 |
| **Total** | **~16,000+/day** | — |

*OpenRouter free models have no daily cap but may queue under heavy load.

For a new site this is massively more than enough. Upgrade only if you're getting real traffic.

---

## 🛠 Local Testing

No server needed. Just open `index.html` directly in your browser:
```bash
open index.html   # Mac
start index.html  # Windows
```

Or use the Vercel CLI for a production-identical preview:
```bash
npm i -g vercel
vercel dev        # runs at localhost:3000
```
