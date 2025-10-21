import { NextRequest, NextResponse } from "next/server";

const MODEL = "gpt-3.5-turbo";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const appId = searchParams.get("appId");
  const title = searchParams.get("title") ?? "this game";

  if (!appId) {
    return NextResponse.json({ error: "Missing appId" }, { status: 400 });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({
      summary: `Add an OPENAI_API_KEY env variable to enable AI insights for ${title}. In the meantime, skim the recent Steam reviews to verify sentiment manually.`,
    });
  }

  try {
    const prompt = `You are an assistant that summarizes Steam reviews. Summarize the most recent community sentiment for the Steam game ${title} (AppID: ${appId}). Provide:
- One sentence covering the overall sentiment.
- Two concise bullet points: one highlight players love, one common concern.
Keep it under 120 words.`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: "You condense gamer chatter into crisp insights." },
          { role: "user", content: prompt },
        ],
        temperature: 0.6,
        max_tokens: 220,
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("OpenAI error", text);
      return NextResponse.json({ summary: "AI insights are temporarily unavailable. Try again soon." }, { status: 200 });
    }

    const json = await response.json();
    const summary = json?.choices?.[0]?.message?.content?.trim();

    return NextResponse.json({
      summary: summary ?? "No insight generated this time, but the deal still looks hot!",
    });
  } catch (error) {
    console.error("Failed to fetch AI insight", error);
    return NextResponse.json({ summary: "AI insights ran into an issue. Try again later." }, { status: 200 });
  }
}
