import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const body = await req.json().catch(() => null);
    
    if (!body || !body.offer || !body.clientBio) {
      return NextResponse.json(
        { error: "Missing fields: offer or clientBio" },
        { status: 400 }
      );
    }

    const { offer, clientBio } = body;

    // 👇 Apni naye account waali AIzaSy... key yahan is khali quotes ke beech mein paste kar do
    const apiKey = "YAHAN_APNI_NEW_AIzaSy_WAALI_KEY_PASTE_KARO";

    if (!apiKey || apiKey.startsWith("YAHAN_")) {
      return NextResponse.json({ error: "API Key missing in route.js" }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Write a short conversational cold DM under 3-4 sentences.
    My Offer: ${offer}
    Client Bio: ${clientBio}
    Output only the message.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const generatedText = response.text();

    return NextResponse.json({ text: generatedText }, { status: 200 });

  } catch (error) {
    return NextResponse.json(
      { text: `System Error: ${error.message || "Unknown Error"}` },
      { status: 200 }
    );
  }
}