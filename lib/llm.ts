/**
 * Server-only LLM client (OpenRouter, OpenAI-compatible chat completions).
 *
 * The API key is read from process.env.OPENROUTER_API_KEY and must NEVER reach
 * the client bundle. This module is only ever imported from the API route
 * (app/api/generate/route.ts), which runs on the server.
 */

/** Model id — configurable via env, with a sensible DeepSeek default. */
export const MODEL =
  process.env.OPENROUTER_MODEL || "deepseek/deepseek-v4-flash";

const ENDPOINT = "https://openrouter.ai/api/v1/chat/completions";

interface CompletionArgs {
  system: string;
  user: string;
  maxTokens: number;
}

/**
 * Make a single chat completion and return the assistant's text content.
 * Throws with a clear message on a missing key or a non-200 response so the
 * route can surface a clean { error } to the client.
 */
export async function createCompletion({
  system,
  user,
  maxTokens,
}: CompletionArgs): Promise<string> {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey || apiKey.trim() === "" || apiKey.includes("your-key")) {
    throw new Error(
      "OPENROUTER_API_KEY is missing. Add it to .env.local (see .env.example)."
    );
  }

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      // Optional OpenRouter attribution headers.
      "HTTP-Referer": process.env.OPENROUTER_SITE_URL || "http://localhost:3000",
      "X-Title": "Ibda",
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: maxTokens,
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`OpenRouter request failed (${res.status}): ${detail}`);
  }

  const data = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
  };

  const content = data.choices?.[0]?.message?.content;
  if (typeof content !== "string" || content.trim() === "") {
    throw new Error("OpenRouter returned an empty response.");
  }

  return content;
}
