# Ibda (إبدأ) — From an idea to a first step

**Built for the Tatweer Hackathon · Challenge 1: Taking the first entrepreneurial step**
**Track: Solutions for rural communities · Al Qua'a, Al Ain, UAE**

> Live demo: _[add your Vercel URL here]_
> Demo video: _[add link to demo.mp4 / unlisted YouTube here]_

Ibda turns "I have an idea" into "here is my first move." A first-time founder in Al Qua'a describes their idea or skill in one screen, and Ibda returns a concrete, local, do-this-week starting plan: a direction, three first actions, the UAE licence they likely need and what it costs, a simple business model, and a script for approaching their first customer. In Arabic or English.

---

## 1. The challenge and the specific problem

We chose **Challenge 1 — Taking the first entrepreneurial step.**

In Al Qua'a, the barrier to starting a business is rarely ambition. Many residents already have a viable idea or a real skill — making soap, raising and selling camel products, dates, desert tourism, crafts. What stops them is not knowing **what the first move is**: what to do this week, what a licence costs, who to sell to first. The gap between "I have an idea" and "I have taken the first step" is where most ideas die.

Ibda exists to close exactly that gap. It is not a course, an incubator application, or a generic chatbot. It is a single, focused tool that converts a rough idea into a concrete first action plan grounded in the realities of starting a small business in the Al Ain region.

## 2. Who it is for

A **first-time founder in the Al Qua'a community** who has an idea or a skill but has never started a business, and has no business background, no advisor, and no idea where to begin. They are almost always on a phone, and many are more comfortable in Arabic. Ibda is built mobile-first and fully bilingual (Arabic with full right-to-left layout) for this exact user.

## 3. The solution and its impact (testable claims)

The user fills one short form — their idea, the skill or resource they already have, and a rough budget — and Ibda generates a structured plan with five parts:

1. **A direction** — a suggested business name and a one-line summary, so a vague idea becomes something concrete.
2. **Three first actions** — each with a title, a plain-language description, and a "this week" timeframe. Written to be doable immediately with what the founder already has.
3. **Licensing and cost** — the likely UAE licence type, the issuing authority (e.g. Abu Dhabi DED via the TAMM platform), and a realistic AED cost range, so the founder is not blindsided by paperwork.
4. **A simple business model** — value proposition, customer segment, revenue stream, and key resource, in four plain lines.
5. **A first-customer script** — who to approach, where, and a short pitch they can actually say out loud.

**Claims a judge can test in under two minutes, on the live site:**

- _Claim:_ A founder goes from a blank screen to a complete, structured, five-part starting plan in a single submission, with no account and no setup. → _Verify:_ open the live URL, tap a spark chip or type an idea, submit, read the plan.
- _Claim:_ Every action item is phrased as a concrete step with a near-term timeframe, not generic advice. → _Verify:_ read the three action steps in any generated plan.
- _Claim:_ The full experience works in Arabic with correct right-to-left layout. → _Verify:_ toggle EN/AR; the entire interface, including the generated plan, mirrors and renders in Arabic.
- _Claim:_ The plan is portable — a founder can copy or print it to act on offline. → _Verify:_ use "Copy whole plan" or "Print / Save as PDF."

The impact: a resident with an idea but no roadmap leaves with a written first step they can act on the same day. That is the precise benefit Challenge 1 asks for.

## 4. Feasibility and deployment

Ibda is deliberately lightweight, which makes it genuinely deployable in a rural, low-resource setting:

- **No database, no accounts, no backend state.** State lives only in the browser session. There is nothing to host, secure, or maintain beyond a static-style web app.
- **One model call per submission**, routed through OpenRouter to a DeepSeek model. DeepSeek is among the lowest-cost capable models available, so per-plan inference cost is a fraction of a cent — important when serving a community, not a funded startup.
- **Deploys to Vercel's free tier in minutes.** The only operational requirement is one API key.
- **Resilient by design.** The server tolerantly parses the model's output (strips stray formatting, repairs missing fields, validates the three action steps) so a malformed response degrades gracefully instead of showing the user an error.

**Run or deploy it yourself:**

```bash
cd ibda
npm install
cp .env.example .env.local   # then edit .env.local
npm run dev                   # http://localhost:3000
```

Environment variables (server-side only):

| Variable | Required | Purpose |
|---|---|---|
| `OPENROUTER_API_KEY` | Yes | Your OpenRouter key |
| `OPENROUTER_MODEL` | No | Model id; set this explicitly to a current DeepSeek chat model |
| `OPENROUTER_SITE_URL` | No | Defaults to `http://localhost:3000` |

To deploy: push to GitHub, import the repo into Vercel, add `OPENROUTER_API_KEY` (and `OPENROUTER_MODEL`) as environment variables, deploy.

## 5. Scalability beyond the hackathon

Ibda is built to replicate, not just to demo:

- **Any rural community, by swapping context.** The local grounding (Al Qua'a, Abu Dhabi DED, TAMM, AED) lives in the prompt layer. Pointing Ibda at another emirate, or another country's rural community, is a prompt and copy change, not a rebuild.
- **Already bilingual.** The EN/AR architecture means adding a third language is incremental, not structural.
- **No per-user infrastructure cost.** Because there is no database or accounts, serving 10 founders or 10,000 costs the same to operate — only the per-plan inference, which is already minimal.
- **Clear growth path:** seed the prompt with verified, up-to-date licence data per region; add a saved-plans option for returning founders; partner with a local entity (municipality, business centre) to keep the licensing data current.

## 6. Falsifiability and evidence

Every claim above is written to be checked, not taken on faith. The live URL and the demo video let a judge reproduce each claim directly. The plan structure is a fixed, typed contract (`lib/types.ts`), so what the UI shows is exactly what the model is required to return.

_Honest limitation we are not hiding:_ the licensing figures are model-generated guidance, not a live government data feed. They are framed in the product as ranges and starting points, not exact quotes. The clear next step to strengthen this is to ground the licensing section in verified Abu Dhabi DED / TAMM fee data per activity — a concrete, scoped improvement rather than a vague promise.

## 7. How to verify it, and the tools used

**Verify quickly:** open the live URL → tap a spark chip (or type a local idea like "selling camel milk soap") → submit → read the five-part plan → toggle to Arabic → copy or print the plan. That full loop is the whole product.

**Tech stack:**

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** with a custom desert/editorial design system
- **OpenRouter** (OpenAI-compatible chat completions) → **DeepSeek** model, one call per submission
- **framer-motion** (entrance animation, with reduced-motion fallback), **lucide-react** (icons)
- Fonts via `next/font`: Fraunces, Inter (Latin); Amiri, IBM Plex Sans Arabic (Arabic)
- No database, no auth, no server-side persistence — session-only state

**Project structure:**

```
app/
  page.tsx              Landing
  start/page.tsx        Input form (stores request, navigates to /plan)
  plan/page.tsx         Generates once, caches, renders the plan
  api/generate/route.ts Server route → OpenRouter → parsed, normalized plan
components/             Form, plan renderer, action steps, language toggle, skeleton, etc.
lib/
  prompt.ts             Advisor system prompt + schema-bound user prompt
  llm.ts                Server-only OpenRouter client
  types.ts              BusinessPlan contract
  i18n.ts               EN/AR strings
  format.ts             Plan → plain text (for copy/print)
```

---

## Notes for reviewers

- The repository is public and the app is self-contained; the only external requirement is an OpenRouter API key.
- No secret is committed; `.env.local` is git-ignored and `.env.example` documents the required variables.
- Built solo over the hackathon weekend for Al Qua'a, with a design intended to feel rooted in the place rather than generic.

_Tatweer Hackathon · Challenge 1 · Al Qua'a, Al Ain, UAE_
