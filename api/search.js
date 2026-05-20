/**
 * StreamRadar — /api/search.js
 * Vercel Serverless Function
 *
 * Keeps ALL AI API keys server-side in environment variables.
 * The browser never sees the keys. Tries Gemini → OpenRouter → Groq
 * and returns the first successful response.
 *
 * Set these in Vercel → Project → Settings → Environment Variables:
 *   GEMINI_API_KEY       (aistudio.google.com)
 *   OPENROUTER_API_KEY   (openrouter.ai)
 *   GROQ_API_KEY         (console.groq.com)
 *
 * POST /api/search
 * Body:    { prompt: string }
 * Returns: { text: string } | { error: string }
 */

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  const { prompt } = req.body || {};
  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'prompt is required' });
  }

  // Try each provider in order — first success wins
  const providers = [
    {
      name: 'Gemini',
      key:  process.env.GEMINI_API_KEY,
      call: async (key) => {
        const r = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`,
          {
            method:  'POST',
            headers: { 'Content-Type': 'application/json' },
            body:    JSON.stringify({
              contents:         [{ parts: [{ text: prompt }] }],
              generationConfig: { temperature: 0.1, maxOutputTokens: 1024 },
            }),
          }
        );
        if (!r.ok) throw new Error(`Gemini ${r.status}`);
        const d = await r.json();
        return d.candidates[0].content.parts[0].text;
      },
    },
    {
      name: 'OpenRouter',
      key:  process.env.OPENROUTER_API_KEY,
      call: async (key) => {
        const r = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method:  'POST',
          headers: {
            'Content-Type':  'application/json',
            'Authorization': `Bearer ${key}`,
            'HTTP-Referer':  'https://streamradar.app',
            'X-Title':       'StreamRadar',
          },
          body: JSON.stringify({
            model:      'meta-llama/llama-3.3-70b-instruct:free',
            messages:   [{ role: 'user', content: prompt }],
            max_tokens: 1024,
          }),
        });
        if (!r.ok) throw new Error(`OpenRouter ${r.status}`);
        const d = await r.json();
        return d.choices[0].message.content;
      },
    },
    {
      name: 'Groq',
      key:  process.env.GROQ_API_KEY,
      call: async (key) => {
        const r = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method:  'POST',
          headers: {
            'Content-Type':  'application/json',
            'Authorization': `Bearer ${key}`,
          },
          body: JSON.stringify({
            model:       'llama-3.3-70b-versatile',
            messages:    [{ role: 'user', content: prompt }],
            max_tokens:  1024,
            temperature: 0.1,
          }),
        });
        if (!r.ok) throw new Error(`Groq ${r.status}`);
        const d = await r.json();
        return d.choices[0].message.content;
      },
    },
  ];

  let lastError;
  for (const provider of providers) {
    if (!provider.key) {
      console.log(`[SR] ${provider.name}: no key set, skipping`);
      continue;
    }
    try {
      const text = await provider.call(provider.key);
      console.log(`[SR] Answered via ${provider.name}`);
      res.setHeader('Cache-Control', 'no-store');
      return res.status(200).json({ text });
    } catch (e) {
      console.warn(`[SR] ${provider.name} failed:`, e.message);
      lastError = e;
    }
  }

  console.error('[SR] All providers failed:', lastError?.message);
  return res.status(502).json({
    error: 'All AI providers failed. Check that at least one API key is set in Vercel environment variables.',
  });
}
